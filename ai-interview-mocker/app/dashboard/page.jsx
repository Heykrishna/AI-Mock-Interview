import React from 'react';
import AddNewInterview from './_components/AddNewInterview';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-50 via-white to-indigo-100 p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-500 bg-clip-text text-transparent tracking-tight mb-4">
            AI Mock Interview
          </h1>
          <p className="text-xl text-gray-600 font-light">
            Prepare smart. Interview smarter.
          </p>
        </div>

        {/* Cards Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Add Interview Card */}
          <div className="relative group bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-indigo-400 hover:shadow-indigo-200 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 animate-fadeIn delay-300">
            <div className="flex flex-col items-center justify-center h-full">
              <AddNewInterview />
            </div>
          </div>

          {/* Example Placeholder Cards for Future Features */}
          <div className="relative group bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-pink-400 hover:shadow-pink-200 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 animate-fadeIn delay-500">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Interview Analytics 📊</h2>
              <p className="text-gray-500 text-sm">Track your performance and growth over time.</p>
            </div>
          </div>

          <div className="relative group bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 hover:border-cyan-400 hover:shadow-cyan-200 transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:scale-105 animate-fadeIn delay-700">
            <div className="flex flex-col items-center justify-center h-full text-center">
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">Upcoming Features 🚀</h2>
              <p className="text-gray-500 text-sm">Stay tuned for new AI coaching tools!</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;
