import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const pipeline = [
      { $match: { 'status.last': 'published' } },
      { $group: { _id: '$agent.firstName', count: { $sum: 1 } } }, 
      { $sort: { count: -1 } }, 
    ];

    const results = await db.collection('mls').aggregate(pipeline).toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching properties by agent:', error);
    res.status(500).json({ error: 'Failed to fetch properties by agent' });
  }
}