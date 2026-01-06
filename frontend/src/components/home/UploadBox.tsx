import {
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

import { Button } from "@/components/ui/button";
import { Separator } from "../ui/separator";
import { FilesIcon, VideoIcon } from "lucide-react";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/shadcn-io/dropzone";
import useFileStore from "@/store/filestore";
import { useState } from "react";
import { v4 as uuid } from "uuid";

const UploadBox = () => {
  const [uploadType, setUploadType] = useState<"file" | "video">("file");

  const { addFile, updateProgress, deleteFile } = useFileStore();

  /**
   * One call = one upload job
   * This enables parallel uploads
   */
  const startUpload = (file: File) => {
    const id = uuid();

    // 1️⃣ Add uploading file to store
    addFile({
      id,
      originalName: file.name,
      size: file.size,
      mimeType: uploadType,
      status: "uploading",
      progress: 0,
    });

    // 2️⃣ Create independent XHR
    const xhr = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("basicFiles", file);
    xhr.open("POST", "http://192.168.1.103:3000/api/upload/files");

    // 3️⃣ Progress updates
    xhr.upload.onprogress = (e) => {
      if (e.lengthComputable) {
        updateProgress(id, Math.round((e.loaded / e.total) * 100));
      }
    };

    // 4️⃣ Success / failure
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        // We cannot update status directly (store limitation)
        deleteFile(id);

        const res = JSON.parse(xhr.response);

        addFile({
          id: res.file.id,
          originalName: file.name,
          size: file.size,
          mimeType: uploadType,
          status: "completed",
          progress: 100,
        });
      } else {
        deleteFile(id);
        addFile({
          id,
          originalName: file.name,
          size: file.size,
          mimeType: uploadType,
          status: "failed",
          progress: 0,
        });
      }
    };

    xhr.onerror = () => {
      deleteFile(id);
      addFile({
        id,
        originalName: file.name,
        size: file.size,
        mimeType: uploadType,
        status: "failed",
        progress: 0,
      });
    };

    xhr.send(formData);
  };

  const handleDrop = (files: File[]) => {
    if (!files || files.length === 0) return;
    startUpload(files[0]);
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
            onClick={() => setUploadType("file")}
          >
            <FilesIcon /> Files
          </Button>

          <Button
            variant={uploadType === "video" ? "default" : "outline"}
            onClick={() => setUploadType("video")}
          >
            <VideoIcon /> Video
          </Button>
        </div>

        <Separator orientation="vertical" className="h-24 hidden lg:block" />
        <Separator orientation="horizontal" className="w-24 block lg:hidden" />

        <div className="flex-1 border border-dashed rounded-lg p-8 bg-muted/30">
          <Dropzone
            maxSize={1024 * 1024 * 100}
            minSize={1024}
            onDrop={handleDrop}
            onError={console.error}
          >
            <DropzoneEmptyState />
            <DropzoneContent />
          </Dropzone>
        </div>
      </div>

      <div className="flex justify-end gap-3 mt-6 pt-4 border-t">
        <DrawerClose>
          <Button variant="outline">Cancel</Button>
        </DrawerClose>
      </div>
    </DrawerContent>
  );
};

export default UploadBox;
