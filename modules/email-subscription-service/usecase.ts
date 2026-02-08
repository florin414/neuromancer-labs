import { SubscriberSchema, Subscriber } from './schema'
import { Result, ok, err } from './result'

const inMemoryDb = new Map<string, Subscriber>()

export async function subscribeUser(email: string): Promise<Result<Subscriber, Error>> {
  const emailValidation = SubscriberSchema.pick({ email: true }).shape.email.safeParse(email)
  if (!emailValidation.success) return err(new Error('Invalid email'))

  const key = email.toLowerCase()
  if (inMemoryDb.has(key)) return err(new Error('Duplicate'))

  const candidate: Subscriber = {
    email: key,
    status: 'active',
    createdAt: new Date().toISOString(),
  }

  const parsed = SubscriberSchema.safeParse(candidate)
  if (!parsed.success) return err(new Error('Validation failed: ' + parsed.error.message))

  await new Promise((r) => setTimeout(r, 10))
  inMemoryDb.set(key, candidate)
  return ok(candidate)
}

export function _clearDb() {
  inMemoryDb.clear()
}
