import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { FilesIcon, VideoIcon, Upload } from "lucide-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";
import useFileStore from "@/store/filestore";

const UploadBox = () => {
  const [uploadType, setUploadType] = useState<"file" | "video">("file");

  const [files, setFiles] = useState<File[] | undefined>();

  const { addFile } = useFileStore();

  useEffect(() => {
    console.log("Files selected:", files);
  }, [files]);

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
  };

  const onProgress = (progress: number) => {
    console.log(`Upload progress: ${progress}%`);
  };

  const handleUpload = (onProgress: (n: number) => void) => {
    if (!files || files.length === 0) {
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("basicFiles", file);
    });

    const xhr = new XMLHttpRequest();

    xhr.open("POST", "/api/upload/files");

    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        onProgress((e.loaded / e.total) * 100);
      }
    };

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        console.log("Files uploaded successfully");

        const res = JSON.parse(xhr.responseText);

        addFile({
          id: res.file.id,
          originalName: res.file.originalName,
          size: res.file.size,
          mimeType: res.file.mimeType,
        });
      } else {
        console.error("Upload failed:", xhr.responseText);
      }
    };

    // network error
    xhr.onerror = () => {
      console.error("Network error during upload");
    };

    xhr.send(formData);
  };

  return (
    <DrawerContent className="h-3/4 lg:h-1/2 p-6">
      <DrawerHeader className="px-0 pb-4">
        <DrawerTitle className="text-2xl font-semibold">
          Upload {uploadType === "file" ? "Files" : "Video"}
        </DrawerTitle>
        <DrawerDescription className="text-sm text-muted-foreground">
          Select the type and upload to cloud
        </DrawerDescription>
      </DrawerHeader>
      <div className="flex flex-col lg:flex-row justify-center items-center h-full gap-6 max-w-xl mx-auto w-full">
        <div className="flex lg:flex-col gap-3">
          <Button
            variant={uploadType === "file" ? "default" : "outline"}
            className="h-10 px-4 rounded-lg font-medium transition-all"
            onClick={() => setUploadType("file")}
          >
            <FilesIcon /> Files
          </Button>
          <Button
            variant={uploadType === "video" ? "default" : "outline"}
            className="h-10 px-4 rounded-lg font-medium transition-all"
            onClick={() => setUploadType("video")}
          >
            <VideoIcon /> Video
          </Button>
        </div>
        <Separator orientation="vertical" className="h-24 hidden lg:block" />
        <Separator orientation="horizontal" className="w-24 block lg:hidden" />
        <div className="flex-1 flex flex-col items-center justify-center gap-3 border border-dashed border-border/50 rounded-lg p-8 bg-muted/30">
          <Dropzone
            maxSize={1024 * 1024 * 10}
            minSize={1024}
            onDrop={handleDrop}
            onError={console.error}
            src={files}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>
      </div>
      <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-border/30">
        <DrawerClose>
          <Button variant="outline" className="rounded-lg font-medium">
            Cancel
          </Button>
        </DrawerClose>
        <Button
          disabled={!files || files.length === 0}
          className="rounded-lg font-medium gap-2"
          onClick={() => handleUpload(onProgress)}
        >
          <Upload size={16} />
          Upload
        </Button>
      </div>
    </DrawerContent>
  );
};

export default UploadBox;
