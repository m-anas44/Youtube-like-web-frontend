import { createContext, useContext, useState } from "react";

// Create the context with default values
const SidebarToogleContext = createContext({
  isOpen: true, // Default state
  toggleSidebar: () => {}, // Function to toggle the sidebar
});

// Create a provider component to manage the state and provide the values
export const SidebarToogleProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true); // Sidebar state management

  const toggleSidebar = () => {
    setIsOpen(!isOpen); // Toggle the sidebar state
  };

  return (
    <SidebarToogleContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </SidebarToogleContext.Provider>
  );
};

// Create a custom hook to access the context
export default function useSidebarToggle() {
  return useContext(SidebarToogleContext);
}
