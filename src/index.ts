/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `npm run dev` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `npm run deploy` to publish your worker
 *
 * Bind resources to your worker in `wrangler.jsonc`. After adding bindings, a type definition for the
 * `Env` object can be regenerated with `npm run cf-typegen`.
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

import { handleCreate } from "./modules/Create";
import { handleDelete } from "./modules/Delete";
import { handleRead } from "./modules/Read";
import { handleUpdate } from "./modules/Update";

import type {Env} from "./type"

export default {
	async fetch(request, env: Env, ctx): Promise<Response> {
		const newUrl = new URL(request.url)
		const path = newUrl.pathname
		const receviedMethod = request.method.toUpperCase()

		const key = newUrl.searchParams.get("key")

        console.log(`Received the request on worker outside of CRUD`)

		 switch (receviedMethod) {
      		case "POST":
            console.log(`Received the request on POST (creating a key:value) request`)
        		return await handleCreate(request, env, key)
      		case "GET":
            console.log(`Received the request on GET (geting a key:value) request`)
        		return await handleRead(env, key)
          case "PUT":
            console.log(`Received the request on PUT (Updating a key:value) request`)
        		return await handleUpdate(request, env, key)
      		case "DELETE":
            console.log(`Received the request on DELETE (DELETE a key:value) request`)
        		return await handleDelete(env, key)
      		default:
            console.log(`NOT Matcg on any CRUD method`)
        		return new Response("Method not allowed", { status: 405 })
    	}	

		
	},
} satisfies ExportedHandler<Env>;


