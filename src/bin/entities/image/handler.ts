import { Image, ImageProxy } from './types';
import { readFile, byteConverter, SizeFormat } from '../../lib';
import fileProxy from '../proxy';

type imageHandlerProps = {
    files: FileList;
    defaultPreview: string | undefined;
    sizeFormat?: SizeFormat;
    removeItem: (id: number) => void;
};

async function imageHandler(props: imageHandlerProps): Promise<ImageProxy[]> {
    const { files, removeItem, sizeFormat, defaultPreview } = props;

    const images: ImageProxy[] = [];
    let id = 0;

    for await (const file of Array.from(files)) {
        const previewUrl = await readFile(file);
        const jbj: Image = {
            id,
            size: byteConverter(file.size, sizeFormat),
            previewUrl: previewUrl || defaultPreview || '',
            name: file.name,
            file,
        };
        images.push(fileProxy(jbj, removeItem));
        id++;
    }
    return images;
}

export default imageHandler;
