import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { currency } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const priceRanges = [
      { range: '<100k', min: 0, max: 100000 },
      { range: '100k-200k', min: 100000, max: 200000 },
      { range: '200k-300k', min: 200000, max: 300000 },
      { range: '300k+', min: 300000, max: Infinity },
    ];

    const currencies = currency ? [currency] : ['USD', 'MXN'];

    const results = await Promise.all(
      currencies.map(async (cur) => {
        const ranges = await Promise.all(
          priceRanges.map(async ({ range, min, max }) => {
            const count = await db.collection('mls').countDocuments({
              'status.last': 'published',
              'listing.price.price': { $gte: min, $lt: max },
              'listing.price.currency': cur,
            });
            return { range, count, currency: cur };
          })
        );
        return ranges;
      })
    );

    res.status(200).json(results.flat());
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price ranges' });
  }
}