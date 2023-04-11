export type Video = {
    id: number;
    videoUrl: string;
    previewUrl: string;
    name: string;
    size: string;
    file: File;
};

export type VideoProxy = {
    remove: () => void;
} & Video;

export type Extension = '.mp4' | '.ogg' | '.ogv' | '.webm' | '.mov';
