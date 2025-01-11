import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { JobsService } from './jobs/jobs.service';
import { JobsModule } from './jobs/jobs.module';
import { JobsController } from './jobs/jobs.controller';
import { SupabaseService } from './supabase.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [JobsModule, ConfigModule.forRoot()],
  controllers: [AppController, JobsController],
  providers: [AppService, JobsService, SupabaseService],
})
export class AppModule {}
