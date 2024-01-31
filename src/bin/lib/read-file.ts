import { blobUrlFromBuffer } from './blobUrl-from-buffer';

function readFile(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        resolve(blobUrlFromBuffer(file as any));

        // resolve(blobUrlFromBuffer())
        // reader.onload = () => {
        //     console.log(reader.result);
        //     resolve(String(reader.result));
        // };
        // reader.onerror = reject;
        // reader.readAsDataURL(file);
    });
}

export default readFile;
