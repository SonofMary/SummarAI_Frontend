// Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  Person2Outlined,
  HistoryOutlined,
  SettingsOutlined,
  UploadFile,
  MenuOpen,
  Logout,
} from "@mui/icons-material";
import { UseAuth } from "../AuthContext";

function Sidebar({ isOpen, setIsOpen }) {

  const {user, logout} = UseAuth()
return (
    <>
      {/* Overlay (for mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 md:hidden z-30"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-40 min-h-max w-64 
          bg-slate-900 text-gray-100 shadow-lg 
          flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h1 className="text-lg font-semibold text-white">SummarAI</h1>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 hover:bg-slate-800 rounded"
          >
            <MenuOpen />
          </button>
        </div>

        {/* User info */}
        {user && (
          <div className="px-4 py-3 border-b border-slate-700 text-sm text-gray-300">
            Welcome, <span className="font-medium text-white">{user.email}</span>
          </div>
        )}

        {/* Navigation Links */}
        <nav className="flex-1 flex flex-col mt-4 overflow-y-auto">
          <SidebarLink
            to="/dashboard/"
            icon={<UploadFile />}
            label="Upload"
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            to="/dashboard/account"
            icon={<Person2Outlined />}
            label="Account"
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            to="/dashboard/history"
            icon={<HistoryOutlined />}
            label="History"
            setIsOpen={setIsOpen}
          />
          <SidebarLink
            to="/dashboard/settings"
            icon={<SettingsOutlined />}
            label="Settings"
            setIsOpen={setIsOpen}
          />
          <div onClick={()=>logout()}>
             <SidebarLink
            to="/dashboard/settings"
            icon={<Logout />}
            
            label="Log Out"
            setIsOpen={setIsOpen}
          />
          </div>
         
          
        </nav>
      </aside>
    </>
  );
}

// Small reusable link component
function SidebarLink({ to, icon, label, setIsOpen }) {
  return (
    <Link
      to={to}
      onClick={() => setIsOpen(false)}
      className="flex items-center gap-3 px-4 py-2 hover:bg-slate-800 transition-colors"
    >
      {icon}
      <span className="text-sm">{label}</span>
    </Link>
  );
}

export default Sidebar;
