import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/switcher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarToogleProvider } from "./context/sideBarToggle";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./Layout";
import Register from "./pages/auth/Register";

function App() {
  const [themeMode, setThemeMode] = useState("light");
  const lightMode = () => {
    setThemeMode("light");
  };

  const darkMode = () => {
    setThemeMode("dark");
  };

  useEffect(() => {
    document.querySelector("html").classList.remove("light", "dark");
    document.querySelector("html").classList.add(themeMode);
  }, [themeMode]);

  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        { path: "about", element: <About /> },
      ],
    },
    { path: "/register", element: <Register /> }
  ]);

  return (
    <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
      <SidebarToogleProvider>
        <RouterProvider router={route} />
      </SidebarToogleProvider>
    </ThemeProvider>
  );
}

export default App;
