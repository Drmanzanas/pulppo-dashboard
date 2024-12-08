import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { stateId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    
    const cities = await db
      .collection('mls')
      .aggregate([
        {
          $match: {
            'address.state.id': stateId, 
          },
        },
        {
          $group: {
            _id: '$address.city.id', 
            name: { $first: '$address.city.name' }, 
          },
        },
        { $sort: { name: 1 } }, 
      ])
      .toArray();

    res.status(200).json(cities.map((c) => ({ id: c._id, name: c.name })));
  } catch (error) {
    console.error('Error fetching cities:', error);
    res.status(500).json({ error: 'Failed to fetch cities' });
  }
}