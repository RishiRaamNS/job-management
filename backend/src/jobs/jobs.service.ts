import { Injectable } from '@nestjs/common';
import { SupabaseService } from 'src/supabase.service';

@Injectable()
export class JobsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async createJob(jobData: any) {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('jobs').insert([jobData]);
    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message);
    }
    return data;
  }
  async getJobs() {
    const supabase = this.supabaseService.getClient();
    const { data, error } = await supabase.from('jobs').select();
    if (error) {
      console.error('Supabase error:', error); 
      throw new Error(error.message);
    }
    return data;
  }
}
