import { Controller, Post, Body, Get } from '@nestjs/common';
import { JobsService } from './jobs.service';

@Controller('jobs') // Base route: /jobs
export class JobsController {
  constructor(private readonly jobService: JobsService) {}
  @Get() // GET request to /jobs
  async getJobs() {
    return this.jobService.getJobs(); // Calls the service to get all jobs
  }
  @Post('create') // POST request to /jobs/create
  createJob(@Body() jobData: any) {
    console.log('Received Job Data:', jobData); // Logs the data sent from frontend
    return this.jobService.createJob(jobData); // Passes the data to the service
  }
}
