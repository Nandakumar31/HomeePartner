import storage from '@react-native-firebase/storage';
import RNFS from 'react-native-fs';


const extractFilePathFromURL = (fileURL: any) => {
    const path = fileURL.split('o/')[1].split('?')[0];

    return decodeURIComponent(path);
};

const uploadFileToFirebase = async (fileUri: any, fileName: any, fileLocation: any) => {
    try {
        // console.log(fileUri, fileName, ']]]]]]]]]]]]]]]]]]');
        const filePath = `${RNFS.TemporaryDirectoryPath}/${fileName}`;
        await RNFS.copyFile(fileUri, filePath);
        const storageRef = storage().ref(`DeliverApp/${fileLocation}/${fileName}`);
        
        await storageRef.putFile(filePath);
        console.log('File uploaded successfully!');
     
        const downloadURL = await storageRef.getDownloadURL();

        console.log('Download URL:', downloadURL);

        return downloadURL; 
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error; 
    }
};

const deleteFileFromFirebase = async (fileLink: any) => {
    // console.log(fileLink, 'link for delet');
    try {
        const filePath = extractFilePathFromURL(fileLink);     
        await storage().ref(filePath).delete();
        console.log('File deleted successfully!');
    } catch (error) {
        console.error('Error deleting file:', error);
        throw error; 
    }
};

export { uploadFileToFirebase, deleteFileFromFirebase };
