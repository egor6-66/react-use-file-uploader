export type Video = {
    id: number;
    fileUrl: string;
    name: string;
    size: string;
    file: File;
    previewUrl: string;
};

export type VideoProxy = {
    remove: () => void;
} & Video;

export type Extension = '.mp4' | '.ogg' | '.ogv' | '.webm' | '.mov';
