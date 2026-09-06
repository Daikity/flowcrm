export type ActivityType =
  | 'customer_created'
  | 'deal_created'
  | 'deal_won'
  | 'task_completed'
  | 'note_updated'

export interface Activity {
  id: string
  type: ActivityType
  message: string
  userId: string
  entityId?: string
  createdAt: string
}
