import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { ZoomIn, ZoomOut, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImgViewerProps {
  imgUrl: string;
  altText?: string;
  thumbnailSize?: "sm" | "md" | "lg";
}

const ImgViewer = ({
  imgUrl,
  altText = "Uploaded Image Viewer",
  thumbnailSize = "md",
}: ImgViewerProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 20, 300));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 20, 50));
  const handleRotate = () => setRotation((prev) => (prev + 90) % 360);
  const handleReset = () => {
    setZoom(100);
    setRotation(0);
  };

  const thumbnailClasses = {
    sm: "w-24 h-24",
    md: "w-32 h-32",
    lg: "w-48 h-48",
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer hover:opacity-80 transition-opacity">
          <img
            src={imgUrl}
            alt={altText}
            className={`${thumbnailClasses[thumbnailSize]} object-cover rounded-lg border border-gray-200`}
          />
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full" showCloseButton={true}>
        <div className="flex flex-col gap-4">
          {/* Image Container */}
          <div className="flex items-center justify-center bg-muted rounded-lg overflow-auto max-h-[60vh]">
            <img
              src={imgUrl}
              alt={altText}
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transition: "transform 0.2s ease-in-out",
              }}
              className="max-w-full max-h-full"
            />
          </div>

          {/* Controls */}
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="text-sm text-muted-foreground">Zoom: {zoom}%</div>

            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomOut}
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleZoomIn}
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleRotate}
                title="Rotate 90°"
              >
                <RotateCw className="w-4 h-4" />
              </Button>

              <Button
                size="sm"
                variant="outline"
                onClick={handleReset}
                title="Reset"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImgViewer;
