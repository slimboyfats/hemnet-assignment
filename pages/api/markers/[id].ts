import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query

  try {
    const data = await fetch(`https://cartes.io/api/maps/${id}/markers`)
    const status: number = data.status

    if (status === 404) {
      res.status(404).json({ error: 'markers not found' })
    } else {
      const json = await data.json()
      res.status(data.status).json(json)
    }
  } catch (err) {
    res.status(500).json({ error: 'failed to load data' })
  }
}
