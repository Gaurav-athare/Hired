import { Outlet } from "react-router-dom";
import Header from "@/components/Header";

const AppLayout = () => {
  return (
    <div className="flex flex-col min-h-screen items-center justify-center">
      <div className="grid-background w-full"></div>
      <main className="w-full max-w-7xl px-4 flex flex-col items-center justify-center flex-1">
        <Header />
        <Outlet />
      </main>
      <footer className= "w-full py-6 bg-gray-800 text-white text-center mt-20">
        <p className="text-sm">Made with 💗 by Gaurav</p>
      </footer>
    </div>
  );
};

export default AppLayout;
