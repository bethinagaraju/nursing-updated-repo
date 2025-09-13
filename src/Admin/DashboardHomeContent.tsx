import React from 'react';
import { ArrowRight } from 'lucide-react';

const Card = ({ title, value, percentage, isPositive, children }) => (
  <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex-1 min-w-[200px] transition-transform duration-200 hover:scale-[1.02]">
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-sm font-semibold text-gray-500 uppercase">{title}</h3>
      <div className="w-16 h-8">{children}</div>
    </div>
    <div className="flex items-end mb-2">
      <span className="text-3xl font-bold text-gray-900">{value}</span>
      <span className={`ml-2 text-sm font-medium ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        <ArrowRight className={`inline w-4 h-4 mr-1 transform ${isPositive ? '-rotate-90' : 'rotate-90'}`} />
        {percentage}
      </span>
    </div>
  </div>
);

const DashboardHomeContent = () => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card title="Sales" value="120" percentage="+12%" isPositive>
          <div className="w-full h-full">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0,40 C25,10 50,30 75,20 100,5" stroke="#34D399" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </Card>
        <Card title="Revenue" value="$450" percentage="+20%" isPositive>
          <div className="w-full h-full">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0,20 C25,40 50,10 75,30 100,25" stroke="#60A5FA" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </Card>
        <Card title="Visitors" value="360" percentage="-24%" isPositive={false}>
          <div className="w-full h-full">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0,10 C25,40 50,20 75,40 100,45" stroke="#F87171" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </Card>
        <Card title="Stock" value="164" percentage="+30%" isPositive>
          <div className="w-full h-full">
            <svg viewBox="0 0 100 50" preserveAspectRatio="none">
              <path d="M0,30 C25,5 50,25 75,10 100,20" stroke="#60A5FA" fill="none" strokeWidth="2" />
            </svg>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-white rounded-2xl shadow-md border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-gray-900">Revenue Overview</h3>
            <select className="px-4 py-2 border rounded-full text-sm">
              <option>Last Week</option>
              <option>Last Month</option>
              <option>Last Quarter</option>
            </select>
          </div>
          <div className="flex items-end justify-around h-[300px] mb-4">
            {/* Simulated Bar Chart */}
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '60%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '55%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '80%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '75%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '58%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '55%' }}></div>
            </div>
            <div className="relative w-10 flex-shrink-0">
              <div className="bg-blue-400 w-full rounded-t-lg transition-all duration-300" style={{ height: '85%' }}></div>
            </div>
          </div>
          <div className="flex justify-center items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-blue-400 mr-2"></div>Revenue</div>
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-gray-400 mr-2"></div>Profit</div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-2xl shadow-md border border-gray-100 flex flex-col items-center justify-center">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Sales by Category</h3>
          {/* Simulated Pie Chart */}
          <div className="w-48 h-48 rounded-full relative">
            <div
              className="w-full h-full rounded-full"
              style={{
                background: `conic-gradient(
                  #4B5563 0deg 45deg,
                  #60A5FA 45deg 180deg,
                  #1D4ED8 180deg 360deg
                )`
              }}
            ></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 rounded-full bg-white shadow-inner">
              <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center text-xs text-gray-400">Chart</div>
            </div>
          </div>
          <div className="flex flex-col items-start mt-6 text-sm">
            <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-[#1D4ED8] mr-2"></div>Electronics</div>
            <div className="flex items-center mb-1"><div className="w-2 h-2 rounded-full bg-[#60A5FA] mr-2"></div>Fashion</div>
            <div className="flex items-center"><div className="w-2 h-2 rounded-full bg-[#4B5563] mr-2"></div>Household</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardHomeContent;
