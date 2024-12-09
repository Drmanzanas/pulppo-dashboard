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

    const agents = await db.collection('mls').aggregate([
      { $match: { 'agent._id': { $exists: true } } },
      {
        $group: {
          _id: {
            name: { $concat: ['$agent.firstName', ' ', '$agent.lastName'] },
            profilePicture: '$agent.profilePicture',
          },
          id: { $first: '$agent._id' },
          firstName: { $first: '$agent.firstName' },
          lastName: { $first: '$agent.lastName' },
          email: { $first: '$agent.email' },
          phone: { $first: '$agent.phone' },
          profilePicture: { $first: '$agent.profilePicture' },
        },
      },
      {
        $addFields: {
          name: {
            $trim: {
              input: { $concat: ['$firstName', ' ', '$lastName'] },
            },
          },
        },
      },
      {
        $match: {
          ...(search
            ? {
                $or: [
                  { name: { $regex: search, $options: 'i' } },
                  { email: { $regex: search, $options: 'i' } },
                  { phone: { $regex: search, $options: 'i' } },
                ],
              }
            : {}),
          name: { $ne: '' },
        },
      },
      { $sort: { name: 1 } },
      { $skip: skip },
      { $limit: limit },
    ]).toArray();


    const uniqueAgents = agents.map((agent: any) => {
      return ({
      id: agent.id.toString() || agent._id?.toString(),
      name: agent.name.trim() || 'Unknown',
      email: agent.email || 'N/A',
      phone: agent.phone || 'N/A',
      profilePicture: agent.profilePicture || '',
    })});

    res.status(200).json(uniqueAgents);
  } catch (error) {
    console.error('Error fetching agents:', error);
    res.status(500).json({ error: 'Failed to fetch agents' });
  }
}