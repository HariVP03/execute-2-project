import { useEffect, useState } from "react";

export function useTimer(initTime: number): number {
    const [time, setTime] = useState<number>(initTime);
    useEffect(() => {
        setTime(initTime);
    }, [initTime]);
    useEffect(() => {
        const timeout = setInterval(
            () => setTime((time) => (time > 0 ? time - 1 : 0)),
            1000,
        );
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    return time;
}
