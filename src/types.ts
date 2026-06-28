export type Job = {
  id: number;
  position: string;
  company: string;
  location: string;
  skills: string[];
  tools: string[];
  mode: string;
  description: string;
  benefits: string;
  status: string;
  source: string;
  url: string;
  salary: string;
  externalJobId: string;
  scrapedFrom: string;
  postedDate: string;
  notes: string;
};

export type PaginatedJobsResponse = {
  content: Job[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
};

export type JobEntry = {
  job: Job;
  id: number;
};

