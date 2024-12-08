import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const { page = 1, limit = 10 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const results = await db
      .collection('mls')
      .find(
        { 'status.last': 'published' },
        {
          projection: {
            _id: 1,
            'listing.title': 1,
            'listing.price.price': 1,
            'listing.price.currency': 1,
            'listing.video': 1,
            'address.city.name': 1,
            'address.state.name': 1,
            'address.neighborhood.name': 1,
            'status.last': 1,
            'agent.firstName': 1,
            'agent.lastName': 1,
            'agent.email': 1,
            'agent.phone': 1,
            'agent.profilePicture': 1,
          },
        }
      )
      .sort({ 'listing.createdAt': -1 })
      .skip(skip)
      .limit(Number(limit))
      .toArray();

    const formattedResults = results.map((item) => ({
      id: item._id,
      title: item.listing?.title || 'Unknown',
      price: item.listing?.price?.price || 0,
      currency: item.listing?.price?.currency || 'Unknown',
      video: item.listing?.video || null,
      location: {
        city: item.address?.city?.name || 'Unknown',
        state: item.address?.state?.name || 'Unknown',
        neighborhood: item.address?.neighborhood?.name || 'Unknown',
      },
      status: item.status?.last || 'Unknown',
      agent: {
        name: `${item.agent?.firstName || ''} ${item.agent?.lastName || ''}`.trim() || 'Unknown',
        email: item.agent?.email || 'Unknown',
        phone: item.agent?.phone || 'Unknown',
        profilePicture: item.agent?.profilePicture || 'Unknown',
      },
    }));

    res.status(200).json({
      data: formattedResults,
      page: Number(page),
      hasMore: formattedResults.length === Number(limit),
    });
  } catch (error) {
    console.error('Error fetching recent properties:', error);
    res.status(500).json({ error: 'Failed to fetch recent properties' });
  }
}