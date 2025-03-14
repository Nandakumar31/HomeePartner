import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { extractFilePathFromURL } from '../components/Regex/Regex';


const { width, height } = Dimensions.get("window");

const FileUploadComponent = ({ onPress, fileTittle, data, ondelete }: any) => {
    // console.log('eeeeeeeeeeeeeeeeeeeee', data);

    const [loading, setLoading] = useState(false);


    const handlePress = async () => {
        if (data) {
            await ondelete(setLoading);
        } else {
            await onPress(setLoading);
        }
    };


    return (
        <>

            <View style={styles.fssaidoc}>
                <Text style={{
                    color: "#707070", fontFamily: 'Poppins-Medium', fontSize: 10,
                    marginHorizontal: 10, textAlign: 'center',marginVertical:5
                }}>
                    {fileTittle}
                </Text>
                {data ? (
                    <Text style={{ color: "#707070", textAlign: 'center',marginVertical:5 }}>
                        {/* {data?.length > 10 ? `${data.slice(0, 16)}...` : data} */}
                        {data?.length > 10 && extractFilePathFromURL(data)}
                    </Text>

                ) : (
                    <Text style={{ color: "#AEAEAE", fontFamily: 'Poppins-Medium', fontSize: 10, marginVertical: 5 }}>
                        .doc,.pdf,.jpg
                    </Text>
                )}
                {loading ? (
                    <ActivityIndicator size="small" color="#03894E" />
                ) : (
                    <TouchableOpacity
                        style={[styles.button, { borderColor: data ? 'red' : '#03894E' }]}
                        onPress={handlePress}                >
                        <Text style={[styles.txt3, { color: data ? 'red' : '#03894E' }]}>
                            {data ? 'Cancel' : 'Upload'}
                        </Text>
                    </TouchableOpacity>

                )}
            </View>
        </>
    );
};


export default FileUploadComponent;

const styles = StyleSheet.create({
    fssaidoc: {
        width: width / 2.8,
        height: 110,
        borderWidth: 1,
        borderStyle: 'dashed',
        borderColor: "#C5C5C5",
        marginHorizontal: 5,
        marginVertical: 10,
        borderRadius: 5,
        alignItems: "center",


    },
    button: {
        borderWidth: 1,
        borderRadius: 50,
        width: 115,
        height: 28,
        padding: 5,
        marginVertical:5
    },
    txt3: {
        fontSize: 12,
        textAlign: 'center',
        width: 100
    },
})