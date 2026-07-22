import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { getFilteredJobs, deleteJob } from './jobapi';

// Mock the entire axios module so no real network requests are made.
vi.mock('axios');

describe('jobapi', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('getFilteredJobs', () => {
        it('sends a GET request to the filter endpoint with the given params', async () => {
            const mockResponse = { data: { content: [], totalElements: 0, totalPages: 0 } };
            vi.mocked(axios.get).mockResolvedValue(mockResponse);

            const params = { page: 0, size: 10, sortBy: 'postedDate', sortDir: 'desc' };
            await getFilteredJobs(params);

            expect(axios.get).toHaveBeenCalledWith(
                expect.stringContaining('/api/jobs/filter'),
                expect.objectContaining({ params }),
            );
        });
    });

    describe('deleteJob', () => {
        it('sends a DELETE request to the correct job URL', async () => {
            vi.mocked(axios.delete).mockResolvedValue({});

            await deleteJob(42);

            expect(axios.delete).toHaveBeenCalledWith(
                expect.stringContaining('/api/jobs/42'),
                expect.anything(),
            );
        });

        it('re-throws the error when the request fails', async () => {
            const networkError = new Error('Network Error');
            vi.mocked(axios.delete).mockRejectedValue(networkError);

            await expect(deleteJob(42)).rejects.toThrow('Network Error');
        });
    });
});