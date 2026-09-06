export type Id = string

export type Nullable<T> = T | null

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
