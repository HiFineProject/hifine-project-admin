import { Outlet } from "react-router-dom";

import Header from "../components/Header";

import Sidebar from "/src/components/Sidebar.jsx";

function AppLayout() {
  return (
    <div className="grid grid-cols-[300px_auto] h-svh">
      <Header />
      <Sidebar />
      <main className="bg-slate-200 p-4 row-span-11">
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
