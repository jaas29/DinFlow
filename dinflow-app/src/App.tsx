import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './contexts/AppContext';
import BottomNav from './components/BottomNav';
import AddExpenseModal from './components/AddExpenseModal';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Setup from './pages/Setup';
import Dashboard from './pages/Dashboard';
import Reports from './pages/Reports';
import Goals from './pages/Goals';
import Profile from './pages/Profile';

const AppRoutes: React.FC = () => {
  const { isOnboarded } = useApp();
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  return (
    <>
      <Routes>
        <Route path="/" element={isOnboarded ? <Navigate to="/dashboard" /> : <Welcome />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/setup" element={<Setup />} />
        <Route
          path="/dashboard"
          element={isOnboarded ? <Dashboard /> : <Navigate to="/" />}
        />
        <Route
          path="/reports"
          element={isOnboarded ? <Reports /> : <Navigate to="/" />}
        />
        <Route
          path="/goals"
          element={isOnboarded ? <Goals /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={isOnboarded ? <Profile /> : <Navigate to="/" />}
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {isOnboarded && (
        <>
          <BottomNav onAddExpense={() => setShowExpenseModal(true)} />
          <AddExpenseModal
            isOpen={showExpenseModal}
            onClose={() => setShowExpenseModal(false)}
          />
        </>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <div className="min-h-screen bg-background">
          <AppRoutes />
        </div>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
