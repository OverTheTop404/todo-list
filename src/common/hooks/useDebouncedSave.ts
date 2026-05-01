import { useCallback, useRef } from 'react'

export function useDebouncedSave<T>(saveFunction: (data: T) => Promise<void>, delay: number = 1000) {
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const pendingDataRef = useRef<T | null>(null)

  const debouncedSave = useCallback(
    (data: T) => {
      // Сохраняем последние данные
      pendingDataRef.current = data

      // Очищаем предыдущий таймер
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }

      // Устанавливаем новый таймер
      timerRef.current = setTimeout(async () => {
        if (pendingDataRef.current) {
          try {
            await saveFunction(pendingDataRef.current)
            pendingDataRef.current = null
          } catch (error) {
            console.error('Ошибка сохранения:', error)
          }
        }
      }, delay)
    },
    [saveFunction, delay],
  )

  // Функция для принудительного сохранения (при уходе со страницы)
  const forceSave = useCallback(async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    if (pendingDataRef.current) {
      await saveFunction(pendingDataRef.current)
      pendingDataRef.current = null
    }
  }, [saveFunction])

  return { debouncedSave, forceSave }
}
