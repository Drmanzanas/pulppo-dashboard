import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const results = await db
      .collection('mls')
      .find({ 'status.last': 'published' })
      .sort({ 'listing.createdAt': -1 })
      .limit(10)
      .toArray();

    res.status(200).json(results);
  } catch (error) {
    console.error('Error fetching recent properties:', error);
    res.status(500).json({ error: 'Failed to fetch recent properties' });
  }
}