import { Topbar } from "./components/Topbar";
import Uploads from "./components/home/Uploads";
import { ThemeProvider } from "./components/theme-provider";

const App = () => {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className=" min-h-screen bg-background text-foreground">
        <Topbar />

        <main className=" mx-auto px-6 py-3">
          <Uploads />
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
