import { describe, it, expect } from 'vitest';
import { normalizeRole } from './DashboardTabs';

describe('normalizeRole', () => {
    it('matches a straightforward frontend role', () => {
        expect(normalizeRole('Frontend Developer')).toBe('Frontend Developer');
    });

    it('classifies "React Developer" as Frontend, not Backend', () => {
        // This case exercises the special condition where "react" counts as
        // frontend only when the string does NOT also contain "backend"/"back-end".
        expect(normalizeRole('React Developer')).toBe('Frontend Developer');
    });

    it('matches a backend role independently from the frontend branch', () => {
        expect(normalizeRole('Backend Engineer')).toBe('Backend Developer');
    });

    it('falls back to "Other" when no keywords match', () => {
        expect(normalizeRole('Product Manager')).toBe('Other');
    });
});