import type { NextApiRequest, NextApiResponse } from 'next';
import { generateSyntheticData } from '~/lib/data/synthetic_valparaiso_data';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const startDate = new Date('2023-01-01');
    const endDate = new Date('2023-12-31');
    const data = generateSyntheticData(100, startDate, endDate);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error generating sampling data:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 