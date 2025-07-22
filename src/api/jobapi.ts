import {Job, JobEntry } from '../types';
import axios, { AxiosRequestConfig } from 'axios';

const getAxiosConfig = (): AxiosRequestConfig => {
    const token = sessionStorage.getItem("jwt");
    if (!token) {
        console.error("No token found in sessionStorage.");
    } else {
        console.log("Using JWT Token from sessionStorage:", token);
    }

    return {
        withCredentials: true, 
        headers: {
            'Authorization': token ? `Bearer ${token}` : "",
        // If there is not token, Authorization will be empty
            'Content-Type': 'application/json',
        },
    };
};

// Fetch all jobs
export const getJobs = async (): Promise<Job[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs`, getAxiosConfig());
    return response.data;

}

// Delete a job by ID (used in /api/jobs/:id)
export const deleteJob = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, getAxiosConfig());
    } catch (error) {
        console.error("Error deleting job: ", error);
        throw error;  // Throw an error for upper layer processing
    }
}

// Add a new job
export const addJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/jobs`, job, getAxiosConfig());
    return response.data;
}

// Update an existing job by ID
export const updateJob = async (jobEntry: JobEntry): Promise<Job> => {
    const response = await axios.put(`${import.meta.env.VITE_API_URL}/api/jobs/${jobEntry.id}`, jobEntry.job, getAxiosConfig());
    return response.data;
}

// Fetch a job by ID
export const getJobById = async (id: number): Promise<Job> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/jobs/${id}`, getAxiosConfig());
    return response.data;
}

