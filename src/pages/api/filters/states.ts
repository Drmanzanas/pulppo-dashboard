import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { countryId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    
    const states = await db
      .collection('mls')
      .aggregate([
        {
          $match: {
            'address.country.id': countryId, 
          },
        },
        {
          $group: {
            _id: '$address.state.id', 
            name: { $first: '$address.state.name' }, 
          },
        },
        { $sort: { name: 1 } }, 
      ])
      .toArray();

    res.status(200).json(states.map((s) => ({ id: s._id, name: s.name })));
  } catch (error) {
    console.error('Error fetching states:', error);
    res.status(500).json({ error: 'Failed to fetch states' });
  }
}