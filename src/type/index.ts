export interface Env {
  MY_KV1: KVNamespace;
}

export type User = {
  id: string
  name: string
  email: string
}

export type AllUsers = User[]