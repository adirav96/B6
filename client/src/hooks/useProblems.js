'use client';

import { useEffect, useMemo, useState } from 'react';
import { apiGetProblems } from '@/services/api';

export function useProblems({ includeTests = false } = {}) {
    const [problems, setProblems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;

        (async () => {
            setLoading(true);
            try {
                const { problems: data } = await apiGetProblems({ includeTests });
                if (cancelled) return;
                setProblems(data || []);
                setError(null);
            } catch (err) {
                if (cancelled) return;
                setProblems([]);
                setError(err);
            } finally {
                if (!cancelled) setLoading(false);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [includeTests]);

    const problemsById = useMemo(() => Object.fromEntries(problems.map((problem) => [problem.id, problem])), [problems]);

    return { problems, problemsById, loading, error };
}