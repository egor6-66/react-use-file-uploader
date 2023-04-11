import { Document, DocumentProxy } from './types';
import { readFile, byteConverter, SizeFormat } from '../../lib';
import fileProxy from '../proxy';

type documentHandlerProps = {
    files: FileList;
    defaultPreview: string | undefined;
    sizeFormat?: SizeFormat;
    removeItem: (id: number) => void;
};

async function documentHandler(props: documentHandlerProps): Promise<any> {
    const { files, removeItem, sizeFormat, defaultPreview } = props;

    const documents: DocumentProxy[] = [];
    let id = 0;

    for await (const file of Array.from(files)) {
        const documentUrl = await readFile(file);

        const jbj: Document = {
            id,
            documentUrl: documentUrl || defaultPreview || '',
            size: byteConverter(file.size, sizeFormat),
            name: file.name,
            file,
        };
        documents.push(fileProxy(jbj, removeItem));
        id++;
    }
    return documents;
}

export default documentHandler;
