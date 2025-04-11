import type { User } from './User'

const baseUrl = '/api/user'

export async function getUserList(): Promise<User[]> {
  return await fetch(`${baseUrl}/list`).then(r => r.json())
}

export async function createUser(data: User): Promise<void> {
  await fetch(`${baseUrl}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export async function updateUser(data: User): Promise<void> {
  await fetch(`${baseUrl}/${data.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  })
}

export async function deleteUser(id: number): Promise<void> {
  await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE'
  })
}
