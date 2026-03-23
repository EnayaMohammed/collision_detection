import { supabase } from './supabase';
import { Project, ProjectSector, ProjectStatus } from '../types';

export const projectService = {
  async getProjects(): Promise<Project[]> {
    if (!supabase) {
      console.warn('Supabase client not initialized. Check your environment variables.');
      return [];
    }
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching projects:', error);
      return [];
    }

    return (data || []).map(item => ({
      id: item.id,
      title: item.title,
      description: item.description,
      type: item.type as ProjectSector,
      status: item.status as ProjectStatus,
      organization: item.organization,
      coordinates: [item.lat, item.lng],
      hasCollision: item.has_collision,
      collisionDetails: item.collision_details,
      createdAt: item.created_at,
      submittedBy: item.submitted_by || 'Unknown',
    }));
  },

  async createProject(project: Omit<Project, 'id' | 'createdAt'>): Promise<Project | null> {
    if (!supabase) {
      console.warn('Supabase client not initialized. Check your environment variables.');
      return null;
    }
    const { data, error } = await supabase
      .from('projects')
      .insert([
        {
          title: project.title,
          description: project.description,
          type: project.type,
          status: project.status,
          organization: project.organization,
          lat: project.coordinates[0],
          lng: project.coordinates[1],
          has_collision: project.hasCollision,
          collision_details: project.collisionDetails,
        },
      ])
      .select()
      .single();

    if (error) {
      console.error('Error creating project:', error);
      return null;
    }

    return {
      id: data.id,
      title: data.title,
      description: data.description,
      type: data.type as ProjectSector,
      status: data.status as ProjectStatus,
      organization: data.organization,
      coordinates: [data.lat, data.lng],
      hasCollision: data.has_collision,
      collisionDetails: data.collision_details,
      createdAt: data.created_at,
      submittedBy: data.submitted_by || 'Unknown',
    };
  },

  async updateProjectStatus(id: string, status: ProjectStatus): Promise<boolean> {
    if (!supabase) {
      console.warn('Supabase client not initialized. Check your environment variables.');
      return false;
    }
    const { error } = await supabase
      .from('projects')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Error updating project status:', error);
      return false;
    }

    return true;
  }
};
