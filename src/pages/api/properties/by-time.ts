import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { startDate, endDate } = req.body || req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ error: 'Start date and end date are required' });
    }

    const client = await clientPromise;
    const db = client.db('pulppo');

    const aggregationPipeline = [
      { $match: { 'status.last': 'published' } },
      { $unwind: '$status.history' },
      {
        $group: {
          _id: '$_id',
          lastStatus: { $last: '$status.history' },
        },
      },
      {
        $match: {
          'lastStatus.timestamp': {
            $gte: new Date(startDate),
            $lte: new Date(endDate), 
          },
        },
      },
      {
        $group: {
          _id: {
            day: { $dayOfMonth: { $toDate: '$lastStatus.timestamp' } },
            month: { $month: { $toDate: '$lastStatus.timestamp' } },
            year: { $year: { $toDate: '$lastStatus.timestamp' } },
          },
          count: { $sum: 1 },
        },
      },
      { $sort: { '_id.year': 1, '_id.month': 1, '_id.day': 1 } },
    ];
    const result = await db.collection('mls').aggregate(aggregationPipeline).toArray();
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching data by time:', error);
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}