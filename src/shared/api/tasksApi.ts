import type {
  CreateTaskInput,
  TaskListItem,
  TasksParams,
  TasksResponse,
  UpdateTaskInput,
} from '@/entities/task'
import { baseApi } from './baseApi'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TasksResponse, TasksParams>({
      query: (params) => ({
        url: '/tasks',
        params: cleanParams(params),
      }),
      providesTags: (result) =>
        result
          ? [
              { type: 'Task' as const, id: 'LIST' },
              ...result.items.map((task) => ({
                type: 'Task' as const,
                id: task.id,
              })),
            ]
          : [{ type: 'Task' as const, id: 'LIST' }],
    }),

    createTask: build.mutation<TaskListItem, CreateTaskInput>({
      query: (body) => ({
        url: '/tasks',
        method: 'POST',
        body,
      }),
      invalidatesTags: [
        { type: 'Task', id: 'LIST' },
        'Dashboard',
      ],
    }),

    updateTask: build.mutation<
      TaskListItem,
      { id: string; data: UpdateTaskInput }
    >({
      query: ({ id, data }) => ({
        url: `/tasks/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: 'Task', id },
        { type: 'Task', id: 'LIST' },
        'Dashboard',
      ],
    }),
  }),
})

function cleanParams(params: TasksParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => {
      return value !== undefined && value !== ''
    }),
  )
}

export const {
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
} = tasksApi
