import { useEffect, useState } from 'react';

export function useStatistics(pointsCount: number): Statistics[] {
    const [value, setValue] = useState<Statistics[]>([]);

    useEffect(() => {
        return window.electron.subscribeStatistics((stats) => {
            return setValue((prev) => {
                const data = [...prev, stats];
                if (data.length > pointsCount) data.shift();
                return data;
            });
        });
    }, []);

    return value;
}
