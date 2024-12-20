import { useEffect, useState } from "react";
import { ThemeProvider } from "./context/switcher";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SidebarToogleProvider } from "./context/sideBarToggle";
import Home from "./pages/Home";
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
import Dashboard from "./pages/dashboard/Dashboard";
import SearchResults from "./pages/video/SearchResults";
import UserHistory from "./pages/UserHistory";
import AllSubsriptions from "./pages/AllSubsriptions";
import UserPlaylists from "./pages/UserPlaylists";
import GetPlaylist from "./pages/GetPlaylist";
import Stats from "./pages/dashboard/Stats";
import LikedVideos from "./pages/LikedVideos";
import UserSubscribers from "./pages/UserSubscribers";
import UserTweets from "./pages/UserTweets";

function App() {
  // Get the initial theme from localStorage or default to "light"
  const storedTheme = localStorage.getItem("themeMode") || "light";
  const [themeMode, setThemeMode] = useState(storedTheme);

  // Update the theme mode in localStorage and apply the theme to the HTML element
  const lightMode = () => {
    setThemeMode("light");
    localStorage.setItem("themeMode", "light"); // Store theme in localStorage
  };

  const darkMode = () => {
    setThemeMode("dark");
    localStorage.setItem("themeMode", "dark"); // Store theme in localStorage
  };

  // Apply the theme mode to the HTML element on theme change
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
        { path: "settings/user", element: <Settings /> },
        { path: "settings/video/:videoID", element: <VideoSettings /> },
        { path: "channel/:username", element: <UserChannelDetails /> },
        { path: "feed/library", element: <Library /> },
        { path: "feed/history", element: <UserHistory /> },
        { path: "feed/channels", element: <AllSubsriptions /> },
        { path: "feed/subscribers", element: <UserSubscribers /> },
        { path: "feed/playlists", element: <UserPlaylists /> },
        { path: "feed/likedVideos", element: <LikedVideos /> },
        { path: "feed/playlists/:playlistId", element: <GetPlaylist /> },
        { path: "feed/tweets", element: <UserTweets /> },
        { path: "video/publishVideo", element: <PublishVideo /> },
        { path: "dashboard", element: <Dashboard /> },
        { path: "dashboard/stats", element: <Stats /> },
        { path: "search", element: <SearchResults /> },
      ],
    },
    {
      path: "/",
      element: <WatchLayout />,
      children: [{ path: "/watch/:videoID", element: <WatchVideo /> }],
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
