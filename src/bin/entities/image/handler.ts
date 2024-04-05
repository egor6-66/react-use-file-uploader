import imageCompression from 'browser-image-compression';

import { Image, ImageProxy } from './types';
import { readFile, byteConverter, SizeFormat } from '../../lib';
import fileProxy from '../proxy';

type imageHandlerProps = {
    files: FileList;
    defaultPreview: string | undefined;
    sizeFormat?: SizeFormat;
    removeItem: (id: number) => void;
    maxImgSizeMb?: number;
};

async function imageHandler(props: imageHandlerProps): Promise<ImageProxy[]> {
    const { maxImgSizeMb, files, removeItem, sizeFormat, defaultPreview } = props;

    const images: ImageProxy[] = [];
    let id = 0;

    for await (const file of Array.from(files)) {
        const updFile = maxImgSizeMb ? await imageCompression(file, { maxSizeMB: 6 }) : file;

        const previewUrl = await readFile(updFile);
        const jbj: Image = {
            id,
            size: byteConverter(updFile.size, sizeFormat),
            fileUrl: previewUrl || defaultPreview || '',
            name: updFile.name,
            file: updFile,
        };
        images.push(fileProxy(jbj, removeItem));
        id++;
    }
    return images;
}

export default imageHandler;
