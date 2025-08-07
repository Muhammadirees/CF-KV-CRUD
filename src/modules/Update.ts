import type { Env, User,AllUsers } from "../type"

export async function handleUpdate(request: Request, env: Env, key: string | null) {
  if (!key) {
    console.log(`PUT request missing ?key=... in query`)
    return new Response("Missing 'key' (user id) in query params", { status: 400 })
  }

  let body: User
    body = await request.json()
     if (!body) {
      console.log(`Invalid JSON body in PUT request`)
      return new Response("Invalid JSON body", { status: 400 })
     }

  const allUsers: AllUsers = await env.MY_KV1.get("users", {type:"json"}) || []

  const userIndex = allUsers.findIndex(u => u.id == key)

  if (userIndex === -1) {
    console.log(`User with id ${key} not found`)
    return new Response(`User with id ${key} not found`, { status: 404 })
  }

  allUsers[userIndex] = {
    ...allUsers[userIndex],
    ...body
  }

  await env.MY_KV1.put("users", JSON.stringify(allUsers))

  console.log(`User with id ${key} updated`)
  return new Response(`User with id ${key} updated successfully`, { status: 200 })
}

