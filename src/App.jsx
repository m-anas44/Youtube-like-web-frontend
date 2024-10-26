import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/switcher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarToogleProvider } from "./context/sideBarToggle";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./Parentlayout/Layout";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import Library from "./pages/Library";
import Settings from "./pages/Settings";
import UserChannelDetails from "./pages/UserChannelDetails";
import PublishVideo from "./pages/video/PublishVideo";
import VideoSettings from "./pages/video/VideoSettings";
import WatchVideo from "./pages/video/WatchVideo";
import WatchLayout from "./Parentlayout/WatchLayout";

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
        { path: "settings/user", element: <Settings /> },
        { path: "settings/video/:videoID", element: <VideoSettings /> },
        { path: "channel/:username", element: <UserChannelDetails /> },
        { path: "/feed/library", element: <Library /> },
        { path: "/video/publishVideo", element: <PublishVideo /> },
      ],
    },
    {
      path: "/",
      element: <WatchLayout />,
      children: [{ path: "watch/:videoID", element: <WatchVideo /> }],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
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
