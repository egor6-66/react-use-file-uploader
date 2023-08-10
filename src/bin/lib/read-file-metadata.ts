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

function readFileMetadata(file: File): Promise<Metadata | null> {
    return new Promise(async (resolve, reject) => {
        fileMetadata.read(file, {
            onSuccess({ tags }: { tags: Metadata }) {
                resolve(tags);
            },
            onError(error: any) {
                resolve(null);
                // reject(error);
            },
        });
    });
}

export default readFileMetadata;
