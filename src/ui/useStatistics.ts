import { useEffect, useState } from 'react';

export function useStatistics(pointsCount: number): Statistics[] {
    const [value, setValue] = useState<Statistics[]>([]);

    useEffect(() => {
        const unsub = window.electron.subscribeStatistics((stats) => {
            return setValue((prev) => {
                const data = [...prev, stats];
                if (data.length > pointsCount) data.shift();
                return data;
            });
        });
        return unsub;
    }, []);

    return value;
}
