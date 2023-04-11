export type Image = {
    id: number;
    previewUrl: string;
    name: string;
    size: string;
    file: File;
};

export type ImageProxy = {
    remove: () => void;
} & Image;

export type Extension = '.jpeg' | '.jpg' | '.gif' | '.png' | '.pict' | '.ico' | '.svg' | '.webp';
