import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const countries = await db
      .collection('mls')
      .aggregate([
        {
          $match: {
            'address.country.id': { $ne: null },
            'address.country.name': { $ne: null },
          },
        },
        {
          $group: {
            _id: '$address.country.id',
            name: { $first: '$address.country.name' },
          },
        },
        { $sort: { name: 1 } },
      ])
      .toArray();

    res.status(200).json(countries.map((c) => ({ id: c._id, name: c.name })));
  } catch (error) {
    console.error('Error fetching countries:', error);
    res.status(500).json({ error: 'Failed to fetch countries' });
  }
}