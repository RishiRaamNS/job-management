import { Controller, Post, Body, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get()
  async getJobs() {
    return this.jobService.getJobs();
  }
  @Post('create')
  createJob(@Body() jobData: any) {
    console.log('Received Job Data:', jobData);
    return this.jobService.createJob(jobData);
  }
}
