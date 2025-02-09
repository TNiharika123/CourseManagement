import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AdminDashboard.css';  

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear any stored authentication tokens or data (if any)
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');  // Redirect to login page
  };

  return (
    <div className="dashboardContainer">
      <h2 className="dashboardTitle">Admin Dashboard</h2>
      
      <div className="dashboardOptions">
        <button className="dashboardButton" onClick={() => navigate('/admin/courses')}>
          View Courses
        </button>
        <br></br>
        <button className="dashboardButton" onClick={() => navigate('/admin/instructors')}>
          View Instructors
        </button>
        <br></br>
        <button className="dashboardButton" onClick={() => navigate('/admin/learners')}>
          View Learners
        </button>
        <br></br>
        <button className="dashboardButton" onClick={() => navigate('/admin/payments')}>
          View Payments
        </button>
        <br></br>
        <button className="dashboardButton" onClick={() => navigate('/admin/supporttickets')}>
          View Support Requests
        </button>
        <br></br>
        <button className="dashboardButton" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;
