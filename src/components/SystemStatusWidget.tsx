export default function SystemStatusWidget() {
  const cores = navigator.hardwareConcurrency || 'N/A';
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 'Unavailable';
  const platform = navigator.platform;
  const userAgent = navigator.userAgent;

  return (
    <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-md transition-all">
      <h2 className="text-xl font-semibold mb-2">System Info</h2>
      <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-1">
        <li>
          <strong>Platform: </strong>
          {platform}
        </li>
        <li>
          <strong>CPU Cores: </strong>
          {cores}
        </li>
        <li>
          <strong>Memory: </strong>
          {memory !== 'Unavailable' ? (
            `${memory} GB`
          ) : (
            <span className="text-gray-500 italic">(not supported)</span>
          )}
        </li>
        <li>
          <strong>User Agent: </strong> {userAgent}
        </li>
      </ul>
    </div>
  );
}
