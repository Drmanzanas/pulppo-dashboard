import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const result = await db.collection('mls').aggregate([
      {
        $group: {
          _id: '$status.last',
          count: { $sum: 1 },
        },
      },
    ]).toArray();

    const formattedResult = result.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});

    console.log(formattedResult)

    res.status(200).json({
      published: formattedResult['published'] || 0,
      cancelled: formattedResult['cancelled'] || 0,
    });
  } catch (error) {
    console.error('Error fetching published/cancelled count:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}