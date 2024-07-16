import { Outlet } from "react-router-dom";
import ThemeController from "../components/ThemeController/ThemeController";

export default function Main() {
  return (
    <div className="font-poppins">
      <div className="dark:bg-slate-800 min-h-[calc(100vh-110px)] overflow-x-hidden">
        <Outlet />
        <ThemeController />
      </div>
    </div>
  );
}
