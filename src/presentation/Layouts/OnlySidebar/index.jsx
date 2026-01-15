// OnlySidebarLayout.jsx
import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";

function OnlySidebarLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className='sticky top-0 h-screen z-50'>
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      </div>
      <div className="w-full">
        {children}
      </div>

    </div>
  );
}

export default OnlySidebarLayout;
