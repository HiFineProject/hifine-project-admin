import AppNav from "./AppNav";
import Logo from "./Logo";

function Sidebar() {
  return (
    <aside className="bg-slate-50 p-4 border-r-4 grid row-span-12 row-start-1 auto-rows-min">
      <Logo />
      <AppNav />

      <footer>
        <p>&copy; Copyright{new Date().getFullYear()} </p>
      </footer>
    </aside>
  );
}

export default Sidebar;
