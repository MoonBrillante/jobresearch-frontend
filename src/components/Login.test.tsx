import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Login from './Login';

// Login.tsx uses useAuth() internally, which requires an AuthProvider.
// AuthProvider itself calls useNavigate(), which requires a Router.
// Both are mocked here so the test can focus purely on the form validation logic,
// without needing a real router or a real login() implementation.
vi.mock('react-router-dom', async (importOriginal) => {
    const actual = await importOriginal<typeof import('react-router-dom')>();
    return {
        ...actual,
        useNavigate: () => vi.fn(),
    };
});

vi.mock('../contexts/AuthContext', () => ({
    useAuth: () => ({ login: vi.fn() }),
}));

describe('Login', () => {
    it('shows an error when both username and password are empty', () => {
        render(<Login />);

        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(
            screen.getByText('Username and password are required'),
        ).toBeInTheDocument();
    });

    it('shows an error when only the username is filled in', () => {
        render(<Login />);

        fireEvent.change(screen.getByLabelText(/username/i), {
            target: { value: 'testuser' },
        });
        fireEvent.click(screen.getByRole('button', { name: /login/i }));

        expect(
            screen.getByText('Username and password are required'),
        ).toBeInTheDocument();
    });
});