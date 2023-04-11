import { ReactNode, useState, FC, useEffect } from 'react';

import { audioHandler, AudioTypes } from './entities/audio';
import { documentHandler, DocumentTypes } from './entities/document';
import { imageHandler, ImageTypes } from './entities/image';
import { inputHandler, InputTypes } from './entities/input';
import { videoHandler, VideoTypes } from './entities/video';
import { SizeFormat } from './lib';

type InitOptions<T> = {
    defaultPreview?: string;
    formDataName?: string;
    sizeFormat?: SizeFormat;
} & InputTypes.Input<T>;

type Files<T> = T extends 'image'
    ? ImageTypes.ImageProxy
    : T extends 'audio'
    ? AudioTypes.AudioProxy
    : T extends 'video'
    ? VideoTypes.VideoProxy
    : DocumentTypes.DocumentProxy;

function useFileUploader<T>(options: InitOptions<T>): [FC<{ children: ReactNode }>, Files<T>[], boolean, FormData | null] {
    const { accept, defaultPreview, formDataName, sizeFormat } = options;

    const [files, setFiles] = useState<any[]>([]);
    const [formData, setFormData] = useState<FormData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const removeItem = (id: number) => {
        setFiles((prev) => prev.filter((i) => i.id !== id));
    };

    useEffect(() => {
        if (files.length && formDataName) {
            const formData = new FormData();
            files.forEach((file) => formData.append(formDataName, file));
            setFormData(formData);
        }
    }, [files.length]);

    const inputOnChange = (event: Event) => {
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
    };

    const Uploader = inputHandler({ options, onChange: inputOnChange });
    return [Uploader, files, isLoading, formData];
}

export type { InitOptions, ImageTypes, VideoTypes, AudioTypes, InputTypes };
export default useFileUploader;
