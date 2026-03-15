import { useEffect } from "react";
import { ThemeProvider } from "./components/theme-provider";
import { Outlet } from "react-router";
import { useNavigate } from "react-router";
import "./App.css";
import ThemeButton from "./components/theme-button";

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname === "/") navigate("/signup");
  }, []);

  return (
    <>
      <ThemeProvider>
        <div className="fixed top-0 right-0 z-50">
          <ThemeButton />
        </div>
        <Outlet />
      </ThemeProvider>
    </>
  );
}

export default App;
