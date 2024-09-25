import LogStream from "@/component/LogStream";


const LogsPage = () => {
    const jobName = 'example-name-test'; // Replace with actual job name
    const buildNumber = 19; // Replace with actual build number

    return (
        <div>
            <h1>Jenkins Build Logs</h1>
            <LogStream jobName={jobName} buildNumber={buildNumber} />
        </div>
    );
};

export default LogsPage;