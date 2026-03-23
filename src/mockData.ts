import { Project } from './types';

export const MOCK_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Addis-Adama Expressway Expansion',
    description: 'Expanding the existing expressway to accommodate higher traffic volume.',
    type: 'ROADS',
    status: 'COLLISION_CHECK',
    submittedBy: 'Abebe Bikila',
    organization: 'Ethiopian Roads Authority',
    createdAt: '2024-03-15T10:00:00Z',
    coordinates: [[9.02497, 38.74689], [8.5410, 39.2689]],
    hasCollision: true,
    collisionDetails: 'Potential overlap with Ethio Telecom fiber optic backbone at km 45.'
  },
  {
    id: '2',
    title: 'Gibe III Transmission Line Upgrade',
    description: 'Upgrading the high-voltage transmission lines for better efficiency.',
    type: 'TRANSMISSION_LINE',
    status: 'APPROVED',
    submittedBy: 'Sara Tadesse',
    organization: 'Ethiopian Electric Power',
    createdAt: '2024-03-18T14:30:00Z',
    coordinates: [[9.0000, 38.7800], [8.9900, 38.7900]],
    hasCollision: false
  },
  {
    id: '3',
    title: '5G Infrastructure Rollout - Phase 1',
    description: 'Installation of 5G towers and underground cabling in central Addis.',
    type: 'TELECOM',
    status: 'UNDER_REVIEW',
    submittedBy: 'Dawit Lema',
    organization: 'Ethio Telecom',
    createdAt: '2024-03-20T09:15:00Z',
    coordinates: [[9.0300, 38.7500], [9.0400, 38.7600]],
    hasCollision: true,
    collisionDetails: 'Proximity to planned power substation in Arada sub-city.'
  },
  {
    id: '4',
    title: 'Bole International Airport Terminal 3',
    description: 'Expansion of the main international terminal.',
    type: 'AIRPORT',
    status: 'SUBMITTED',
    submittedBy: 'Kassa Tekle',
    organization: 'Ethiopian Airlines Group',
    createdAt: '2024-03-22T11:00:00Z',
    coordinates: [[8.9778, 38.7993], [8.9800, 38.8100]],
    hasCollision: false
  }
];
