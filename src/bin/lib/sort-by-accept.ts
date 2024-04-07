function sortByAccept(files: any[]) {
    const obj = {
        image: [],
        audio: [],
        video: [],
        document: [],
    };

    return files.reduce((acc = obj, file) => {
        const type = file.file.type.split('/')[0];
        if (acc[type === 'text' || type === 'application' ? 'document' : type]) {
            acc[type === 'text' || type === 'application' ? 'document' : type].push(file);
        }
        return acc;
    }, obj);
}
export default sortByAccept;
