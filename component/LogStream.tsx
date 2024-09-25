'use client';
import { useState, useEffect, useRef } from 'react';

type LogStreamProps = {
    jobName: string;
    buildNumber: number;
}

const LogStream: React.FC<LogStreamProps> = ({ jobName, buildNumber }) => {
    const [log, setLog] = useState('');
    const eventSourceRef = useRef<EventSource | null>(null);
    const logContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        eventSourceRef.current = new EventSource(`http://localhost:8080/jenkins/stream-build-log/${jobName}/${buildNumber}`);

        eventSourceRef.current.onmessage = (event) => {
            setLog(prevLog => prevLog + event.data);
            // Auto-scroll to the bottom of the log
            if (logContainerRef.current) {
                logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
            }
        };

        eventSourceRef.current.onerror = (error) => {
            console.error('EventSource failed:', error);
            eventSourceRef.current?.close();
        };

        return () => {
            eventSourceRef.current?.close();
        };
    }, [jobName, buildNumber]);

    return (
        <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4 text-gray-800">
                Build Log for {jobName} - Build #{buildNumber}
            </h2>
            <div
                ref={logContainerRef}
                className="bg-black text-white font-mono text-sm p-4 rounded h-[400px] overflow-auto"
            >
                <pre className="whitespace-pre-wrap break-words">
                    {log}
                </pre>
            </div>
        </div>
    );
};

export default LogStream;