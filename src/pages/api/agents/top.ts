import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '@/lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const client = await clientPromise;
    const db = client.db('pulppo');

    const agents = await db
      .collection('agents')
      .find({})
      .sort({ performanceScore: -1 })
      .limit(5)
      .toArray();

    const formattedAgents = agents.map((agent) => ({
      id: agent._id,
      name: `${agent.firstName || 'Unknown'} ${agent.lastName || ''}`.trim(),
      email: agent.email || 'N/A',
      phone: agent.phone || 'N/A',
      profilePicture: agent.profilePicture || '',
    }));

    res.status(200).json(formattedAgents);
  } catch (error) {
    console.error('Error fetching top agents:', error);
    res.status(500).json({ error: 'Failed to fetch top agents' });
  }
}