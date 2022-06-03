export interface Map {
  slug: string
  title: string
  description: string
  privacy: string
  users_can_create_markers: string
  options: {
    links: string | null
    default_expiration_time: string | null
    limit_to_geographical_body_type: string | null
  }
  uuid: string
  created_at: string
  updated_at: string
  categories: Category[]
}

export interface Category {
  id: number
  name: string
  icon: string
  markers_count: number
}
