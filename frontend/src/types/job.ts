export interface Job {
  jobTitle: string;
  companyName: string;
  location: string;
  jobType: string;
  salaryMin: number;
  salaryMax: number;
  applicationDeadline: Date | null;
  jobDescription: string;
  workType: string;
  experienceMin: number;
  experienceMax: number;
}
