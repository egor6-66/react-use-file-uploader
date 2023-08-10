import { Audio, AudioProxy } from './types';
import { readFile, readFileMetadata, base64FromBuffer, byteConverter, SizeFormat } from '../../lib';
import fileProxy from '../proxy';

type audioHandlerProps = {
    files: FileList;
    defaultPreview: string | undefined;
    sizeFormat?: SizeFormat;
    removeItem: (id: number) => void;
};

async function audioHandler(props: audioHandlerProps): Promise<AudioProxy[]> {
    const { files, removeItem, sizeFormat, defaultPreview } = props;
    const audios: AudioProxy[] = [];
    let id = 0;

    for await (const file of Array.from(files)) {
        const audioUrl = await readFile(file);
        const metadata = await readFileMetadata(file);
        const albumCover = metadata?.picture?.data ? base64FromBuffer('image', metadata.picture.data) : defaultPreview || '';
        const obj: Audio = {
            id,
            fileUrl: audioUrl,
            name: file?.name,
            size: byteConverter(file.size, sizeFormat),
            file,
            album: {
                coverUrl: albumCover,
                artist: metadata?.artist || '',
                name: metadata?.album || '',
                title: metadata?.title || '',
                year: metadata?.year || '',
            },
        };
        audios.push(fileProxy(obj, removeItem));
        id++;
    }
    return audios;
}

export default audioHandler;
