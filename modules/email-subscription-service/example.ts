import { subscribeUser, _clearDb } from './usecase'

async function run() {
  _clearDb()

  const r1 = await subscribeUser('alice@example.com')
  if (r1.ok) console.log('Subscribed:', r1.value)
  else console.error('Error:', r1.error.message)

  const r2 = await subscribeUser('alice@example.com')
  if (!r2.ok) console.log('Expected duplicate error:', r2.error.message)

  const r3 = await subscribeUser('not-an-email')
  if (!r3.ok) console.log('Expected validation error:', r3.error.message)
}

run().catch((e) => console.error(e))
