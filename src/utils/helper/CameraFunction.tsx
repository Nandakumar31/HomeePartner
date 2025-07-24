    import { launchCamera, launchImageLibrary } from "react-native-image-picker";
    import { setprofileImageUri } from "../../store/slices/ProfileSlice";
    import { useDispatch } from "react-redux";
    import { requestCameraPermission } from "../Permissions/requestLocationPermission";

    const useImagePicker = () => {
        const dispatch = useDispatch();
        const openCamera = async (index:any,func:any,pics:any) => {
            const hasPermission = await requestCameraPermission(); 
            if (hasPermission) {
                launchCamera(
                    {
                        mediaType: 'photo',
                        cameraType: 'back',
                    },
                    (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled camera');
                        } else if (response.errorCode) {
                            console.error('Camera Error: ', response.errorMessage);
                        } else if (response.assets) {
                            const newPhotos = [...pics];
                            newPhotos[index] = response.assets[0].uri; 
                            func(newPhotos);
                        }
                    }
                );
            } else {
                console.log('Camera Permission Denied');
            }
        };


        const handleProfileImageUpload = async () => {
            try {
                const hasPermission = await requestCameraPermission(); 
                if (!hasPermission) {
                    console.log('Camera Permission Denied');
                    return;
                }
        
                launchCamera(
                    {
                        mediaType: 'photo',
                        cameraType: 'back',
                    },
                    (response) => {
                        if (response.didCancel) {
                            console.log('User cancelled camera');
                        } else if (response.errorCode) {
                            console.error('Camera Error: ', response.errorMessage);
                        } else if (response.assets && response.assets.length > 0) {  
                            dispatch(setprofileImageUri(response.assets[0].uri));
                        }
                    }
                );
            } catch (error) {
                console.error('Error in handleProfileImageUpload:', error);
            }
        };
        
        

        const openGallery = () => {
            launchImageLibrary({ mediaType: 'photo' }, (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image selection');
                } else if (response.errorCode) {
                    console.log('Gallery error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    dispatch(setprofileImageUri(response.assets[0].uri));
                }
            });
        };

        
        return { openGallery, handleProfileImageUpload, openCamera };
    };

    export default useImagePicker;
