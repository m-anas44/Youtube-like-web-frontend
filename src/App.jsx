import { useEffect, useState } from "react";
import Header from "./components/layout/Header";
import { Sidebar } from "./components/layout/Sidebar";
import { ThemeProvider } from "./context/switcher";

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
  return (
    <ThemeProvider value={{ themeMode, lightMode, darkMode }}>
      <div>
        <Header />
        <div className="flex">
          <Sidebar />
          <div className="flex-1 lg:ml-64 mt-14">
            <div className="h-[40rem] text-[10rem]">
              <p className="drop-shadow-xl font-bold 
              bg-gradient-to-r from-red-600 to-pink-600
               via-black text-slate-50 h-screen place-content-center text-center">
                ❀ Anas ❀
              </p>
              <p></p>
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
