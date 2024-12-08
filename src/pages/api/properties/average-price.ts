import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { countryId, stateId, cityId } = req.query;

  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const matchCondition: Record<string, unknown> = {
      'status.last': 'published',
      'listing.price.price': { $exists: true, $type: 'number' },
    };

    if (countryId) matchCondition['address.country.id'] = countryId;
    if (stateId) matchCondition['address.state.id'] = stateId;
    if (cityId) matchCondition['address.city.id'] = cityId;

    let groupId: Record<string, string> = {};

    if (cityId) {
      groupId = {
        country: '$address.country.name',
        state: '$address.state.name',
        city: '$address.city.name',
        currency: '$listing.price.currency',
      };
    } else if (stateId) {
      groupId = {
        country: '$address.country.name',
        state: '$address.state.name',
        currency: '$listing.price.currency',
      };
    } else if (countryId) {
      groupId = {
        country: '$address.country.name',
        currency: '$listing.price.currency',
      };
    }

    const pipeline = [
      { $match: matchCondition },
      {
        $group: {
          _id: groupId,
          averagePrice: { $avg: '$listing.price.price' },
          totalCount: { $sum: 1 },
        },
      },
      { $sort: { '_id.currency': 1, averagePrice: -1 } },
    ];

    const results = await db.collection('mls').aggregate(pipeline).toArray();

    const currencies = ['USD', 'MXN'];
    const formattedResults = currencies.map((currency) => {
      const matchingResults = results.filter((r) => r._id.currency === currency);
      if (matchingResults.length > 0) {
        return matchingResults.map((result) => ({
          country: result._id.country || 'Unknown',
          state: result._id.state || 'Unknown',
          city: result._id.city || 'Unknown',
          currency,
          averagePrice: parseFloat(result.averagePrice.toFixed(2)),
          totalCount: result.totalCount,
        }));
      } else {
        return {
          country: matchCondition['address.country.name'] || 'Unknown',
          state: matchCondition['address.state.name'] || 'Unknown',
          city: matchCondition['address.city.name'] || 'Unknown',
          currency,
          averagePrice: 0,
          totalCount: 0,
        };
      }
    }).flat();

    res.status(200).json({
      filters: { countryId, stateId, cityId },
      totalResults: formattedResults.length,
      data: formattedResults,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch average price by location' });
  }
}