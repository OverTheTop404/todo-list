export interface CreateBoard {
  user_id: string
  title: string
  description?: string
  image_url?: string
}

export interface Board {
  id: string
  title: string
  description?: string
  user_id: string
  created_at: string
  updated_at: string
  position: number
  image_url: string
}

export interface CreateBoardDto {
  title: string
  description?: string
  user_id: string
  position: number
}

export interface UpdateBoardDto {
  title?: string
  description?: string
  position?: number
}
