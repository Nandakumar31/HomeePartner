import { Alert } from 'react-native';
import DocumentPicker, { pick, types } from '@react-native-documents/picker';
import { deleteFileFromFirebase, uploadFileToFirebase } from '../../components/fileuplode&deletefirebase';


const FileUpload = async (dispatch: any, action: any, message: any, setLoading: any) => {
  try {
    setLoading(true);
    console.log('Function called - File picker is opening');

    const pickerResult = await pick({
      type: [types.pdf,
      types.images
      ]
    });

    if (pickerResult && pickerResult.length > 0) {
      const file = pickerResult[0];
      const fileUri = file.uri;
      const fileName = file.name || `file_${Date.now()}.jpg`;

      console.log('File Selected:', fileUri, fileName);

      if (fileUri) {
        
        const link = await uploadFileToFirebase(fileUri, fileName,'DeliveryApp');
        console.log('Upload success:', link);
        dispatch(action(link));
        Alert.alert(`${message} Image file uploaded successfully!`);
      }
    } else {
      console.log('No file selected');
    }
  } catch (err: any) {
    if (err?.code === 'DOCUMENT_PICKER_CANCELED') {
      console.log('User cancelled the file picker.');
    } else {
      console.error('Error while uploading image file:', err);
      Alert.alert('Error', 'An error occurred while uploading the file.');
    }
  } finally {
    setLoading(false);
  }
};

export default FileUpload;




const deleteFile = async (dispatch: any, action: any, message: any, file: any, setLoading: any) => {
  try {
    // console.log('neja====>',file);        
    setLoading(true);
    await deleteFileFromFirebase(file);
    dispatch(action(null));
    Alert.alert(`${message} file deleted!`);
    console.log(`${message} file deleted!`);
  } catch (error) {
    console.error('Error while deleting file:', error);
  } finally {
    setLoading(false);
  }
};

export { FileUpload, deleteFile };
