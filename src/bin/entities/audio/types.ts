export type Audio = {
    id: number;
    audioUrl: string;
    name: string;
    size: string;
    file: File;
    album: {
        coverUrl: string;
        name: string;
        artist: string;
        title: string;
        year: string;
    };
};

export type AudioProxy = {
    remove: () => void;
} & Audio;

export type Extension = '.ogg' | '.vorbis' | '.wav' | '.mp3' | '.webm';
