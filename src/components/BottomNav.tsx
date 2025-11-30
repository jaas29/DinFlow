// Reusable component for bottom navigation
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, BarChart3, Target, User, Plus } from 'lucide-react';

interface BottomNavProps {
  onAddExpense: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ onAddExpense }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 max-w-md mx-auto">
      <div className="flex items-center justify-around">
        <button
          onClick={() => navigate('/dashboard')}
          className={`flex flex-col items-center gap-1 py-2 px-4 ${
            isActive('/dashboard') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Home size={24} />
          <span className="text-xs font-medium">Home</span>
        </button>

        <button
          onClick={() => navigate('/reports')}
          className={`flex flex-col items-center gap-1 py-2 px-4 ${
            isActive('/reports') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <BarChart3 size={24} />
          <span className="text-xs font-medium">Reports</span>
        </button>

        <div className="flex flex-col items-center -mt-8">
          <button
            onClick={onAddExpense}
            className="flex items-center justify-center w-14 h-14 bg-blue-600 rounded-full shadow-lg"
          >
            <Plus size={28} className="text-white" />
          </button>
          <span className="text-xs font-medium text-gray-600 mt-2">Add</span>
        </div>

        <button
          onClick={() => navigate('/goals')}
          className={`flex flex-col items-center gap-1 py-2 px-4 ${
            isActive('/goals') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <Target size={24} />
          <span className="text-xs font-medium">Goals</span>
        </button>

        <button
          onClick={() => navigate('/profile')}
          className={`flex flex-col items-center gap-1 py-2 px-4 ${
            isActive('/profile') ? 'text-blue-600' : 'text-gray-400'
          }`}
        >
          <User size={24} />
          <span className="text-xs font-medium">Profile</span>
        </button>
      </div>
    </div>
  );
};

export default BottomNav;
