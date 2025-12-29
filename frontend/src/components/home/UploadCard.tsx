import useFileStore from "@/store/filestore";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { FileIcon, VideoIcon, TrashIcon } from "lucide-react";

interface UploadCardProps {
  id: string;
  name: string;
  size: number;
  type: "file" | "video";
  thumbnailUrl?: string;
  status?: "uploading" | "completed" | "failed";
  progress: number;
}

const formatSize = (bytes: number) => {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
};

const UploadCard = ({
  id,
  name,
  size,
  type,
  thumbnailUrl,
  status,
  progress,
}: UploadCardProps) => {
  const { deleteFile } = useFileStore();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      {/* Thumbnail */}
      <div className="relative w-full h-40 bg-muted/50 border-b border-border/30">
        {thumbnailUrl ? (
          <img
            src={thumbnailUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              {type === "video" ? (
                <VideoIcon
                  size={32}
                  className="text-muted-foreground mx-auto mb-2"
                />
              ) : (
                <FileIcon
                  size={32}
                  className="text-muted-foreground mx-auto mb-2"
                />
              )}
              <p className="text-xs text-muted-foreground uppercase tracking-wide">
                {type}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-3">
        <div className="flex-1 min-w-0">
          <p
            className="text-sm font-medium text-foreground truncate"
            title={name}
          >
            {name}
          </p>
          <p className="text-xs text-muted-foreground">{formatSize(size)}</p>

          {status == "uploading" ? (
            <ProgressBar progress={progress} />
          ) : (
            <ViewAndDeleteButton id={id} />
          )}
        </div>
      </div>
    </Card>
  );
};

const ViewAndDeleteButton = ({ id }: { id: string }) => {
  const { deleteFile } = useFileStore();

  const handleDelete = async (id: string) => {
    const deleteURI = `/api/upload/files/${id}`;

    const res = await fetch(deleteURI, {
      method: "DELETE",
    });

    if (res.ok) {
      console.log("File deleted successfully");

      deleteFile(id);
    } else {
      console.error("Failed to delete file");
    }
  };

  return (
    <div className="flex gap-2 pt-2 border-t border-border/20">
      <Button className="flex-1 ">View</Button>
      <Button
        className=""
        variant={"destructive"}
        onClick={() => handleDelete(id)}
      >
        <TrashIcon />
      </Button>
    </div>
  );
};

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <div className=" flex items-center justify-center mt-3 w-full gap-3">
      <div className=" bg-muted flex-1 h-4 relative rounded-full ">
        <div
          className=" bg-muted-foreground h-full rounded-full transition-all"
          style={{
            width: `${progress}%`,
          }}
        ></div>
      </div>
      <p className="">{progress}%</p>
    </div>
  );
};

export default UploadCard;
