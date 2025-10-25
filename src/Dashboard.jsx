import React, { useState } from "react";
import { Routes, Route, Router } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Upload from "./components/Upload";
import Account from "./components/Account";
import Settings from "./components/Settings";
import History from "./components/History";
import { MenuOutlined } from "@mui/icons-material";
import PrivateUpload from "./components/PrivateUpload";
import NewDocument from "./NewDocument";

function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Main Content */}
      <div className="flex-1 relative">
        {/* Toggle button (mobile only) */}
        <button
          className="md:hidden p-3 absolute top-2 left-2 bg-indigo-600 text-white rounded"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <MenuOutlined />
        </button>

        <div className="p-6 mt-12 md:mt-0">
          <Routes>
            <Route path="/" element={<NewDocument />} />
            <Route path="/account" element={<Account />} />
            <Route path="/history" element={<History />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </div>

  );
}

export default Dashboard;
