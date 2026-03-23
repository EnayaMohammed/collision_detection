export type UserRole = 'ADMIN' | 'MANAGER' | 'ORGANIZATION';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  organization?: string;
}

export type ProjectStatus = 'SUBMITTED' | 'UNDER_REVIEW' | 'COLLISION_CHECK' | 'APPROVED' | 'REJECTED';

export type ProjectSector = 
  | 'AIRPORT' 
  | 'ELECTRIC_POWER' 
  | 'ROADS' 
  | 'TELECOM' 
  | 'TRANSFORMER' 
  | 'TRANSMISSION_LINE' 
  | 'RAIL_WAY_LINE' 
  | 'POWER_PLANTS' 
  | 'SUB_STATION';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectSector;
  status: ProjectStatus;
  submittedBy: string;
  organization: string;
  createdAt: string;
  coordinates: [number, number][]; // GeoJSON-like
  hasCollision: boolean;
  collisionDetails?: string;
}

export interface CollisionAlert {
  id: string;
  projectId: string;
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  location: [number, number];
}
