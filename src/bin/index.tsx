import { ReactNode, useState, FC, useEffect, useRef } from 'react';

import { audioHandler, AudioTypes } from './entities/audio';
import {AudioProxy} from "./entities/audio/types";
import { documentHandler, DocumentTypes } from './entities/document';
import {DocumentProxy} from "./entities/document/types";
import { imageHandler, ImageTypes } from './entities/image';
import {ImageProxy} from "./entities/image/types";
import { inputHandler, InputTypes } from './entities/input';
import getAccept from './entities/input/getAccept';
import { videoHandler, VideoTypes } from './entities/video';
import {VideoProxy} from "./entities/video/types";
import { sortByAccept as getSortByAccept, SizeFormat, getRandomInt } from './lib';


type SortBuAcceptType = {
    image: ImageProxy[];
    audio: AudioProxy[];
    video: VideoProxy[];
    document: DocumentProxy[];
};

type AfterUploadingType<T> = {
    type: InputTypes.Accept;
    files: Files<T>[];
    formData: FormData | null;
    sortByAccept?: SortBuAcceptType;
};

type InitOptions<T> = {
    defaultPreview?: string;
    formDataName?: string;
    sizeFormat?: SizeFormat;
    onAfterUploading?: (data: AfterUploadingType<T>) => void;
    onOpen?: () => void;
    onClose?: () => void;
    onCloseWithoutFiles?: () => void;
} & InputTypes.Input<T>;

type Files<T> = T extends 'image'
    ? ImageTypes.ImageProxy
    : T extends 'audio'
    ? AudioTypes.AudioProxy
    : T extends 'video'
    ? VideoTypes.VideoProxy
    : DocumentTypes.DocumentProxy;

function useFileUploader<T>(options: InitOptions<T>): {
    Uploader: FC<{ children: ReactNode }>;
    open: () => void;
    files: Files<T>[];
    sortByAccept: Files<T>[];
    isLoading: boolean;
    formData: FormData | null;
    clear: () => void;
} {
    const { accept, multiple, extension, defaultPreview, formDataName, sizeFormat, onAfterUploading, onOpen, onClose, onCloseWithoutFiles } = options;

    const once = useRef(false);

    const [visibleModal, setVisibleModal] = useState<boolean>(false);
    const [files, setFiles] = useState<any[]>([]);
    const [sortByAccept, setSortByAccept] = useState<any[]>([]);
    const [sortForApi, setSortForApi] = useState<any[]>([]);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const removeItem = (id: number) => {
        setFiles((prev) => prev.filter((i) => i.id !== id));
    };

    function handleFocusBack() {
        setTimeout(() => setVisibleModal(false), 200);
        onClose && onClose();
        window.removeEventListener('focus', handleFocusBack);
    }

    function clickedFileInput() {
        once.current = true;
        setVisibleModal(true);
        onOpen && onOpen();
        window.addEventListener('focus', handleFocusBack);
    }

    const clear = () => {
        setFiles([]);
        setFormData(null);
    };

    useEffect(() => {
        once.current && !isLoading && !visibleModal && !files.length && onCloseWithoutFiles && onCloseWithoutFiles();
    }, [visibleModal && files.length]);

    const open = () => {
        if (!isLoading) {
            clear();
            const input = document.createElement('input');
            input.type = 'file';
            input.style.display = 'none';
            input.accept = getAccept(accept, extension);
            input.multiple = !!multiple;
            input.onchange = inputOnChange;
            input.click();
            clickedFileInput();
        } else {
            // alert('loading in progress');
        }
    };

    useEffect(() => {
        if (files.length && formDataName) {
            const formData = new FormData();
            files.forEach((file) => formData.append(formDataName, file.file));
            setFormData(formData);
        }
    }, [files.length]);

    function inputOnChange(event: Event) {
        setIsLoading(true);
        const target = event.target as HTMLInputElement;
        if (!target?.files?.length) return;
        const set = (files: any, sortByAccept?: any) => {
            setFiles(files);
            setSortByAccept(sortByAccept);
            setIsLoading(false);
            setVisibleModal(false);
            onAfterUploading &&
                onAfterUploading({
                    type: accept,
                    files,
                    formData,
                    sortByAccept,
                });
        };
        const getProps = (files: any) => ({
            files,
            removeItem,
            defaultPreview,
            sizeFormat,
        });

        switch (accept) {
            case 'all':
                Promise.all(
                    Array.from(target.files).map(async (file) => {
                        const accept = file.type.split('/')[0];
                        switch (accept) {
                            case 'image':
                                const img = await imageHandler(getProps([file]));
                                return {...img[0], id: getRandomInt(1000)};
                            case 'audio':
                                const audio = await audioHandler(getProps([file]));
                                return {...audio[0], id: getRandomInt(1000)};
                            case 'video':
                                const video = await videoHandler(getProps([file]));
                                return {...video[0], id: getRandomInt(1000)};
                            case 'text':
                                const text = await documentHandler(getProps([file]));
                                return {...text[0], id: getRandomInt(1000)};
                        }
                    })
                ).then((files) => {
                    set(files, getSortByAccept(files));
                });
                break;
            case 'image':
                imageHandler(getProps(target.files)).then((files) => {
                    set(files);
                });
                break;
            case 'audio':
                audioHandler(getProps(target.files)).then((files) => {
                    set(files);
                });
                break;
            case 'video':
                videoHandler(getProps(target.files)).then((files) => {
                    set(files);
                });
                break;
            case 'document':
                documentHandler(getProps(target.files)).then((files) => {
                    set(files);
                });
                break;
        }
    }

    const Uploader = inputHandler({ options, open });
    return { Uploader, open, files, sortByAccept, isLoading, formData, clear };
}

type Accept = InputTypes.Accept;
type ImageFile = ImageTypes.ImageProxy;
type AudioFile = AudioTypes.AudioProxy;
type VideoFile = VideoTypes.VideoProxy;
type DocumentFile = DocumentTypes.DocumentProxy;

export type { InitOptions, Accept, ImageFile, AudioFile, VideoFile, DocumentFile, AfterUploadingType, SortBuAcceptType };
export default useFileUploader;
