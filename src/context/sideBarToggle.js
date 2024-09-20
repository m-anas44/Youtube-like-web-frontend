const SidebarContext = createContext({ state: true });
export const SidebarProvider = SidebarContext.Provider;
export function useSidebar() {
  return useContext(SidebarContext);
}
