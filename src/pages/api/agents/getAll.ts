import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const search = req.query.search?.toString().trim().toLowerCase() || '';

    const skip = (page - 1) * limit;

    const matchQuery: any = { 'agent._id': { $exists: true } };

    if (search) {
      matchQuery.$or = [
        { 'agent.firstName': { $regex: search, $options: 'i' } },
        { 'agent.lastName': { $regex: search, $options: 'i' } },
        { 'agent.email': { $regex: search, $options: 'i' } },
        { 'agent.phone': { $regex: search, $options: 'i' } },
      ];
    }

    const agents = await db.collection('mls').aggregate([
      { $match: matchQuery },
      {
        $group: {
          _id: '$agent._id',
          name: { $first: '$agent.firstName' },
          lastName: { $first: '$agent.lastName' },
          email: { $first: '$agent.email' },
          phone: { $first: '$agent.phone' },
          profilePicture: { $first: '$agent.profilePicture' },
        },
      },
      {
        $match: {
          $or: [
            { name: { $ne: '' } },
            { lastName: { $ne: '' } },
          ],
        },
      },
      { $sort: { name: 1 } },
      { $skip: skip },
      { $limit: limit },
    ]).toArray();

    const uniqueAgents = Array.from(
      new Map(
        agents.map((agent: any) => [
          agent._id.toString(),
          {
            id: agent._id,
            name: `${agent.name || ''} ${agent.lastName || ''}`.trim() || 'Unknown',
            email: agent.email || 'N/A',
            phone: agent.phone || 'N/A',
            profilePicture: agent.profilePicture || '',
          },
        ])
      ).values()
    );

    res.status(200).json(uniqueAgents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
}