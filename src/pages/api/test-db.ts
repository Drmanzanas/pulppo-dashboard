import clientPromise from '@/lib/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');
    const mlsData = await db.collection('mls').find({}).limit(20).toArray();

    res.status(200).json({ message: 'Connected successfully!', data: mlsData });
  } catch (error) {
    console.error('Database connection error:', error);
    res.status(500).json({ message: 'Database connection error', error });
  }
}