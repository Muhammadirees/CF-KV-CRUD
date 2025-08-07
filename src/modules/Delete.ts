// // Delete

import type { Env, AllUsers } from "../type"

export async function handleDelete(env: Env, key: string | null) {
  if (!key) {
    console.log(`Received the request on DELETE (not deleting a user) — missing id in query`)
    return new Response("Missing 'key' (user ID) in query params", { status: 400 })
  }

  const usersFromKV : AllUsers  = await env.MY_KV1.get("users", { type: "json" })  || []

  const userIndex = usersFromKV.findIndex(user => user.id === key)
  if (userIndex === -1) {
    console.log(`User with ID ${key} not found`)
    return new Response(`No user found with ID: ${key}`, { status: 404 })
  }

  usersFromKV.splice(userIndex, 1)

  await env.MY_KV1.put("users", JSON.stringify(usersFromKV))

  console.log(`User with ID ${key} deleted successfully`)
  return new Response(`User with ID ${key} deleted`, { status: 200 })
}

