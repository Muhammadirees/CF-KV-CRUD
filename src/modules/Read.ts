// // Read

import type { Env,  AllUsers } from "../type"

export async function handleRead(env: Env, key: string | null) {
  const allUsers : AllUsers = await env.MY_KV1.get("users", { type: "json" })  || []

  if (!key) {
    console.log(`Received the request on GET (getting all users)`)
    return new Response(JSON.stringify({
      result: "All Users",
      users: allUsers
    }), { status: 200, headers: { "Content-Type": "application/json" } })
  }

  const user = allUsers.find(u => u.id === key)
 
  if (!user) {
    console.log(`Received the request on GET (user not found) key=${key}`)
    return new Response(`No user found with id: ${key}`, { status: 404 })
  }

  console.log(`Received the request on GET (found user with key=${key})`)
  return new Response(JSON.stringify(user), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  })
}
