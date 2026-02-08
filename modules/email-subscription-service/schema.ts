import { z } from 'zod'

export const Status = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
} as const

export const StatusSchema = z.union([z.literal(Status.ACTIVE), z.literal(Status.INACTIVE)])

export const SubscriberSchema = z.object({
  email: z.string().email(),
  status: StatusSchema,
  createdAt: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'createdAt must be an ISO datetime string',
  }),
})

export type Subscriber = z.infer<typeof SubscriberSchema>
