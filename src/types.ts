// Represents a single Job used in forms and UI
export type Job = {
  id: number;                // Unique job ID (primary key)
  position: string;          // Job title
  company: string;           // Hiring company
  location: string;          // Job location (city or remote)
  skills: string[];          // Required skills (e.g., JavaScript, SQL)
  tools: string[];           // Tools used (e.g., Git, Docker)
  mode: string;              // Work mode: Remote | Onsite | Hybrid
  description: string;       // Job description/details
  benefits: string;          // Benefits offered (e.g., Health, Vacation)
  status: string;            // Application status (e.g., APPLIED, INTERVIEWED)
  source: string;            // Source of the job (e.g., LinkedIn, Indeed)
  postedDate: string;        // Date when posted (YYYY-MM-DD)
  notes: string;             // Personal notes or comments
};

// Combines a Job object with its ID for update operations
export type JobEntry = {
  job: Job;                  // The job data to be updated
  id: number;                // ID used in the PUT request endpoint (/api/jobs/:id)
};

// A reusable empty job template used for initializing forms
export const emptyJob: Job = {
  id: 0,
  position: '',
  company: '',
  location: '',
  skills: [],
  tools: [],
  mode: '',
  description: '',
  benefits: '',
  status: '',
  source: '',
  postedDate: '',
  notes: '',
};
