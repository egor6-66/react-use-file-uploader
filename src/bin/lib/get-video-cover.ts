import readFile from './read-file';

async function getVideoCover(file: File, seekTo = 0.0): Promise<string> {
    return new Promise((resolve, reject) => {
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', URL.createObjectURL(file));
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            // @ts-ignore
            reject('error when loading video file', ex);
        });
        videoPlayer.addEventListener('loadedmetadata', () => {
            if (videoPlayer.duration < seekTo) {
                reject('video is too short.');
                return;
            }
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);
            videoPlayer.addEventListener('seeked', () => {
                const canvas = document.createElement('canvas');
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                const ctx = canvas.getContext('2d');
                // @ts-ignore
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // @ts-ignore
                ctx.canvas.toBlob(
                    async (blob) => {
                        const url = blob ? await readFile(blob) : '';
                        resolve(url);
                    },
                    'image/jpeg',
                    0.75
                );
            });
        });
    });
}

export default getVideoCover;
