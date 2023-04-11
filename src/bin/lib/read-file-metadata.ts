import fileMetadata from './file_metadata';

type Metadata = {
    album: string;
    artist: string;
    picture: {
        data: ArrayBuffer;
    };
    title: string;
    year: string;
};

function readFileMetadata(file: File): Promise<Metadata> {
    return new Promise(async (resolve, reject) => {
        fileMetadata.read(file, {
            onSuccess({ tags }: { tags: Metadata }) {
                resolve(tags);
            },
            onError(error: any) {
                reject(error);
            },
        });
    });
}

export default readFileMetadata;
