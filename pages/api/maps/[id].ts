import type { NextApiRequest, NextApiResponse } from 'next'

export async function getMap(id: string): Promise<Response> {
  const data = await fetch(`https://cartes.io/api/maps/${id}`)
  return data
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  try {
    const data = await getMap(id as string)
    const status: number = data.status
    if (status === 404) {
      res.status(404).json({ error: 'map not found' })
    } else {
      const json = await data.json()
      res.status(data.status).json(json)
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
