import { create } from "zustand";

export type FileState = {
  id: string;
  originalName: string;
  size: number;
  mimeType: "file" | "video";
  thumbnailUrl?: string;
};

type FileStore = {
  files: FileState[];

  addFile: (file: FileState) => void;
  deleteFile: (id: string) => void;
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

  setFiles: (files) => set({ files }),
}));

export default useFileStore;
