import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Register from './component/Register';
import Login from './component/Login';
import Dashboard from './component/Dashboard';
import AddTask from './component/Addtask';
import { AuthProvider } from './context/AuthContext';
import { PrivateRoute } from './component/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protect dashboard route */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Protect addtask route */}
          <Route
            path="/addtask"
            element={
              <PrivateRoute>
                <AddTask />
              </PrivateRoute>
            }
          />


          <Route path="*" element={<div>404 Page Not Found</div>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
