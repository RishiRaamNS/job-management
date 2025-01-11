import { Module } from '@nestjs/common';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { SupabaseService } from 'src/supabase.service';

@Module({
  controllers: [JobsController],
  providers: [JobsService, SupabaseService],
})
export class JobsModule {}
