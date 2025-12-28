import { Upload } from "lucide-react";
import { ModeToggle } from "./mode-toggle";
import { Drawer, DrawerTrigger } from "./ui/drawer";
import UploadBox from "./home/UploadBox";

export const Topbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="px-6 py-4 flex items-center justify-between max-w-7xl mx-auto">
        {/* Left - Project Name */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">F</span>
          </div>
          <h1 className="text-xl font-semibold text-foreground">ForgeUpload</h1>
        </div>

        {/* Right - Upload Button & Theme Toggle */}
        <div className="flex items-center gap-3">
          <ModeToggle />

          <Drawer>
            <DrawerTrigger>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 text-primary-foreground rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md">
                <Upload size={18} />
                <span>Upload</span>
              </button>
            </DrawerTrigger>
            <UploadBox />
          </Drawer>
        </div>
      </div>
    </header>
  );
};
