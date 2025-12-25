import { Topbar } from "./components/Topbar";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" min-h-screen bg-background text-foreground">
        <Topbar />

        <main className="max-w-7xl mx-auto px-6 py-12">
          {/* Content goes here */}
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
