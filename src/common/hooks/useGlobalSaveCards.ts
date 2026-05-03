import { useCallback, useRef } from 'react'
import { supabase } from '@/app/supaBaseClient'
import type { TaskSbType } from '@/features/todolists/api/tasksApi.types'

export const useGlobalSaveCards = (delay: number = 2000) => {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingUpdatesRef = useRef<{ [listId: string]: TaskSbType[] }>({})

  const saveCardPositionsToServer = useCallback(async (cardsData: any[]) => {
    const updates = cardsData.map((card) => ({
      id: card.id,
      position: card.position,
      list_id: card.list_id,
    }))

    try {
      const { error } = await supabase.rpc('update_cards_batch', {
        p_updates: updates,
      })

      if (error) {
        console.error('ОШИБКА RPC:', error)
      }
    } catch (e) {
      console.error('ОШИБКА сохранения:', e)
    }
  }, [])

  const scheduleSaveCards = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    timerRef.current = setTimeout(async () => {
      const allTasks = Object.values(pendingUpdatesRef.current).flat()
      if (allTasks.length > 0) {
        await saveCardPositionsToServer(allTasks)
        pendingUpdatesRef.current = {}
      }
      timerRef.current = null
    }, delay)
  }, [saveCardPositionsToServer, delay])

  const forceSaveCards = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }
    const allTasks = Object.values(pendingUpdatesRef.current).flat()
    if (allTasks.length > 0) {
      await saveCardPositionsToServer(allTasks)
      pendingUpdatesRef.current = {}
    }
  }, [saveCardPositionsToServer])

  return {
    pendingUpdatesRef,
    scheduleSaveCards,
    forceSaveCards,
  }
}
