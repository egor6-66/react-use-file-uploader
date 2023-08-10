import { AudioTypes } from '../audio';
import { DocumentTypes } from '../document';
import { ImageTypes } from '../image';
import { VideoTypes } from '../video';

export type Accept = 'image' | 'audio' | 'video' | 'document' | 'all';
export type Extension<T> = T extends 'image'
    ? ImageTypes.Extension[]
    : T extends 'audio'
    ? AudioTypes.Extension[]
    : T extends 'video'
    ? VideoTypes.Extension[]
    : DocumentTypes.Extension[];

export type Input<T> = {
    accept: Accept & T;
    multiple?: boolean;
    extension?: Extension<T>;
};
