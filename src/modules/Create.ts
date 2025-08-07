// Create
import type {Env, User,AllUsers} from "../type"

export async function handleCreate(request : Request, env: Env, key:string | null) {

    const body:User = await request.json()
    console.log(body)
    if (!body || !body.id) {
        console.log(`Received the request on POST (not creating a key:value) key missing body value `)
        return new Response("Missing required fields: key", { status: 400 })
    }

    const existing: AllUsers = await env.MY_KV1.get("users", { type: "json" }) || []
    const exitUser = existing.some(user=> user.id === key)

    if(exitUser){
      console.log(`The user already exit cannot create kv with ${key}`)
      return new Response(`The user already exited with this ${key}`,{ status: 400})
    }

    existing.push({
        id: body.id,
        name: body?.name,
        email: body?.email
    })

    await env.MY_KV1.put("users", JSON.stringify(existing))

    console.log(`Received the request on POST (created a key:value) `)
    return new Response("User added successfully", { status: 200 })
}



