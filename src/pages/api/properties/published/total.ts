import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const totalPublished = await db.collection('mls').countDocuments({
      'status.history.status': 'published',
    });

    console.log(totalPublished)
    res.status(200).json({ totalPublished });
  } catch (error) {
    console.error('Error fetching total published count:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}