function readFile(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            resolve(String(reader.result));
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

export default readFile;
