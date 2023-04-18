import { ReactNode, useState, FC, useEffect, useRef } from 'react';

import { audioHandler, AudioTypes } from './entities/audio';
import { documentHandler, DocumentTypes } from './entities/document';
import { imageHandler, ImageTypes } from './entities/image';
import { inputHandler, InputTypes } from './entities/input';
import getAccept from './entities/input/getAccept';
import { videoHandler, VideoTypes } from './entities/video';
import { SizeFormat } from './lib';

type InitOptions<T> = {
    defaultPreview?: string;
    formDataName?: string;
    sizeFormat?: SizeFormat;
    onCancel?: () => void;
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
    isLoading: boolean;
    formData: FormData | null;
    clear: () => void;
} {
    const { accept, multiple, extension, defaultPreview, formDataName, sizeFormat, onCancel } = options;

    const [files, setFiles] = useState<any[]>([]);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const removeItem = (id: number) => {
        setFiles((prev) => prev.filter((i) => i.id !== id));
    };

    function fileInputClicked() {
        window.removeEventListener('focus', handleFocusBack);
    }

    function handleFocusBack() {
        onCancel && onCancel();
        window.removeEventListener('focus', handleFocusBack);
    }

    function clickedFileInput() {
        window.addEventListener('focus', handleFocusBack);
    }

    const clear = () => {
        setFiles([]);
    };

    const open = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.style.display = 'none';
        input.accept = getAccept(accept, extension);
        input.multiple = !!multiple;
        input.onchange = inputOnChange;
        input.click();
        clickedFileInput();
    };

    useEffect(() => {
        if (files.length && formDataName) {
            const formData = new FormData();
            files.forEach((file) => formData.append(formDataName, file.file));
            setFormData(formData);
        }
    }, [files.length]);

    function inputOnChange(event: Event) {
        fileInputClicked();
        setIsLoading(true);
        const target = event.target as HTMLInputElement;
        if (!target?.files?.length) return;
        const set = (files: any) => {
            setFiles(files);
            setIsLoading(false);
        };
        const getProps = (files: FileList) => ({
            files,
            removeItem,
            defaultPreview,
            sizeFormat,
        });

        switch (accept) {
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

    const Uploader = inputHandler({ options, onChange: inputOnChange, clickedFileInput });
    return { Uploader, open, files, isLoading, formData, clear };
}

export type { InitOptions, ImageTypes, VideoTypes, AudioTypes, InputTypes };
export default useFileUploader;
