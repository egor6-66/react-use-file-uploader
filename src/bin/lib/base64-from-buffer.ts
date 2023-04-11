function base64FromBuffer(type: 'image' | 'audio' | 'video', arraybuffer: ArrayBuffer) {
    const extension = () => {
        if (type === 'image') return 'image/png';
        if (type === 'audio') return 'audio/mpeg';
        if (type === 'video') return '  video/mp4';
    };
    // @ts-ignore
    return `data:${extension()};base64,${btoa(String.fromCharCode.apply(null, new Uint8Array(arraybuffer)))}`;
}

export default base64FromBuffer;
