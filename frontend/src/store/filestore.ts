import { create } from "zustand";

export type FileState = {
  id: string;
  originalName: string;
  size: number;
  mimeType: "file" | "video";
  thumbnailUrl?: string;

  status?: "uploading" | "completed" | "failed";
  progress?: number;
  xhr?: XMLHttpRequest;
};

type FileStore = {
  files: FileState[];

  addFile: (file: FileState) => void;
  deleteFile: (id: string) => void;
  updateProgress: (id: string, progress: number) => void;
  setFiles: (files: FileState[]) => void;
};

export const useFileStore = create<FileStore>((set) => ({
  files: [],

  addFile: (file) =>
    set((state) => ({
      files: [file, ...state.files],
    })),

  deleteFile: (id) =>
    set((state) => ({
      files: state.files.filter((f) => f.id !== id),
    })),

  updateProgress: (id: string, progress: number) =>
    set((state) => ({
      files: state.files.map((f) =>
        f.id === id ? { ...f, progress: progress } : f
      ),
    })),

  setFiles: (files) => set({ files }),
}));

export default useFileStore;
