export const extractFilePathFromURL = (fileURL: any) => {
    const match = fileURL.match(/[^/]+(?=\?alt=media)/);
    let fileName = match ? decodeURIComponent(match[0]).split('/').pop() : null;
    if (fileName && fileName.length > 10) {
        const extension: any = fileName.split('.').pop();
        fileName = fileName.substring(0, 10 - extension.length - 1) + '...' + extension;
    }
    return fileName;
};

export const validateIfsc = (val: any) => {
    const IFSCReg = /^[A-Z]{4}0[A-Z0-9]{6}$/;
    return IFSCReg.test(val);
}