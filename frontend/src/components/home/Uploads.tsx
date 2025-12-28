import { useState, useEffect } from "react";
import UploadCard from "./UploadCard";

const Uploads = () => {
  const [uploads, setUploads] = useState<any[]>([]);

  const fetchUploads = async () => {
    // Fetch uploads logic here
    const res = await fetch("/api/upload/files");

    const data = await res.json();
    console.log(data);

    const uploadData = data.data;

    setUploads(uploadData);
  };

  useEffect(() => {
    fetchUploads();
  }, []);

  return (
    <div>
      <Header />
      {uploads.length === 0 ? (
        <p className="p-4 text-center text-muted-foreground">
          No uploads found.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
          {uploads.map((upload) => (
            <UploadCard
              key={upload.id}
              id={upload.id}
              name={upload.originalName}
              size={upload.size}
              type={upload.mimeType}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Header = () => {
  return (
    <div className=" border-b border-border px-4 sm:px-6 lg:px-8 my-5">
      <h1 className="text-lg font-bold px-3 bg-muted rounded-full inline relative top-3.5 text-muted-foreground">
        {" "}
        Your Uploads
      </h1>
    </div>
  );
};

export default Uploads;
