import { Job, JobEntry, PaginatedJobsResponse } from '../types';
import axios, { AxiosRequestConfig } from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");

    return {
        withCredentials: true,
        headers: {
            'Authorization': token ? `Bearer ${token}` : "",
            'Content-Type': 'application/json',
        },
    };
};

// Fetch all jobs
export const getJobs = async (): Promise<Job[]> => {
    const response = await axios.get(`${BASE_URL}/api/jobs`, getAxiosConfig());
    return response.data;
};

// Delete a job by ID (used in /api/jobs/:id)
export const deleteJob = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/api/jobs/${id}`, getAxiosConfig());
    } catch (error) {
        console.error("Error deleting job: ", error);
        throw error;  // Throw an error for upper layer processing
    }
}

// Add a new job
export const addJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const response = await axios.post(`${BASE_URL}/api/jobs`, job, getAxiosConfig());
    return response.data;
}

// Update an existing job by ID
export const updateJob = async (jobEntry: JobEntry): Promise<Job> => {
    const response = await axios.put(`${BASE_URL}/api/jobs/${jobEntry.id}`, jobEntry.job, getAxiosConfig());
    return response.data;
}

// Fetch a job by ID
export const getJobById = async (id: number): Promise<Job> => {
    const response = await axios.get(`${BASE_URL}/api/jobs/${id}`, getAxiosConfig());
    return response.data;
}

export const getPaginatedJobs = async (params: {
    page: number;
    size: number;
    sortBy?: string;
    sortDir?: string;
}): Promise<PaginatedJobsResponse> => {
    const response = await axios.get(
        `${BASE_URL}/api/jobs/page`,
        {
            ...getAxiosConfig(),
            params,
        }
    );

    return response.data;
}