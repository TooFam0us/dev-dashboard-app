import {useState, useEffect} from 'react';
import { motion } from 'framer-motion';
import GitHubWidget from "./components/GitHubWidget";
import NewsWidget from "./components/NewsWidget";
import SystemStatusWidget from './components/SystemStatusWidget';

export default function App() {
  
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('octocat');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
    }
  };
  
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      <header className="w-full py-4 px-6 bg-gray-100 dark:bg-gray-800 shadow-sm flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Developer's Dashboard</h1>
      </header>
      <input 
        type="text" 
        id='search'
        placeholder='Search GitHub User'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleSearch();
          }}}
        className="flex-1 px-4 py-2 text-base bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition"
        />
      <button 
        id="searchButton"
        onClick={handleSearch}
        className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition"
        >Search</button>
      <div className="max-w-6xl mx-auto p-6 grid gap-6 sm:grid-cols-1 md:grid-cols-2">
        <motion.div
          key={submittedQuery}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          >
          <GitHubWidget username={submittedQuery} />
        </motion.div>
        <SystemStatusWidget />
        <NewsWidget />
      </div>
    </div>
  );
}