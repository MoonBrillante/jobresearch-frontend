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


export const getJobs = async (): Promise<Job[]> => {
    const response = await axios.get(`${BASE_URL}/api/jobs`, getAxiosConfig());
    return response.data;
};


export const deleteJob = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${BASE_URL}/api/jobs/${id}`, getAxiosConfig());
    } catch (error) {
        console.error("Error deleting job: ", error);
        throw error;
    }
}


export const addJob = async (job: Omit<Job, 'id'>): Promise<Job> => {
    const response = await axios.post(`${BASE_URL}/api/jobs`, job, getAxiosConfig());
    return response.data;
}


export const updateJob = async (jobEntry: JobEntry): Promise<Job> => {
    const response = await axios.put(`${BASE_URL}/api/jobs/${jobEntry.id}`, jobEntry.job, getAxiosConfig());
    return response.data;
}


export const getJobById = async (id: number): Promise<Job> => {
    const response = await axios.get(`${BASE_URL}/api/jobs/${id}`, getAxiosConfig());
    return response.data;
}


export const getFilteredJobs = async (params: {
    page: number;
    size: number;
    sortBy?: string;
    sortDir?: string;
    position?: string;
    company?: string;
    location?: string;
    mode?: string;
    status?: string;
}): Promise<PaginatedJobsResponse> => {
    const response = await axios.get(
        `${BASE_URL}/api/jobs/filter`,
        {
            ...getAxiosConfig(),
            params,
        }
    );

    return response.data;
}