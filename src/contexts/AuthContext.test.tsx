import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { AuthProvider, useAuth } from './AuthContext';

// AuthProvider calls useNavigate() internally, which only works inside a
// Router. Real navigation isn't needed for these tests, so only that
// function is mocked, while the rest of react-router-dom remains intact.
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

describe('AuthContext', () => {
    beforeEach(() => {
        sessionStorage.clear();
    });

    it('login stores the token and marks the user as authenticated', () => {
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        act(() => {
            result.current.login('fake-jwt-token');
        });

        expect(sessionStorage.getItem('jwt')).toBe('fake-jwt-token');
        expect(result.current.isAuthenticated).toBe(true);
        expect(result.current.token).toBe('fake-jwt-token');
    });

    it('logOut removes the token and marks the user as unauthenticated', () => {
        const { result } = renderHook(() => useAuth(), { wrapper: AuthProvider });

        act(() => {
            result.current.login('fake-jwt-token');
        });

        act(() => {
            result.current.logOut();
        });

        expect(sessionStorage.getItem('jwt')).toBeNull();
        expect(result.current.isAuthenticated).toBe(false);
        expect(result.current.token).toBeNull();
    });
});