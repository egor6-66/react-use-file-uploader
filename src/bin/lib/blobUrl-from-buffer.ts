export const blobUrlFromBuffer = (arrayBuffer: ArrayBuffer) => {
    const blob = new Blob([arrayBuffer]);
    return window.URL.createObjectURL(blob);
};
