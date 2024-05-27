import { Video, VideoProxy } from './types';
import { readFile, getVideoCover, byteConverter, SizeFormat } from '../../lib';
import fileProxy from '../proxy';

type VideoHandlerProps = {
    files: FileList;
    defaultPreview?: string | undefined;
    sizeFormat?: SizeFormat;
    removeItem: (id: number) => void;
};

async function videoHandler(props: VideoHandlerProps): Promise<VideoProxy[]> {
    const { files, removeItem, sizeFormat, defaultPreview } = props;

    const videos: VideoProxy[] = [];
    let id = 0;

    for await (const file of Array.from(files)) {
        const videoUrl = await readFile(file);
        const previewUrl = await getVideoCover(file, 0.1);

        const jbj: Video = {
            id,
            fileUrl: videoUrl,
            size: byteConverter(file.size, sizeFormat),
            previewUrl: previewUrl || defaultPreview || '',
            name: file.name,
            file,
        };
        videos.push(fileProxy(jbj, removeItem));
        id++;
    }
    return videos;
}

export default videoHandler;
