import { Camera, CameraType } from 'expo-camera'
import { View, Box, Pressable } from 'native-base'
import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { UpdateURI } from '../redux/actions/cardActions'
import * as MediaLibrary from 'expo-media-library';



const CameraScreen = () => {
    const [isCameraReady, setIsCameraReady] = useState(false);
    const [cameraRef, setCameraRef] = useState(null);
    const navigation = useNavigation()
    const dispatch = useDispatch()

    const updateURI = (uri) => {
        dispatch(UpdateURI(uri))
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} type={CameraType.back} ref={ref => setCameraRef(ref)}
                onCameraReady={() => setIsCameraReady(true)}>
            </Camera>
            <Box style={styles.fab}>
                <Pressable onPress={async () => {
                    if (isCameraReady) {
                        try {
                            const { uri } = await cameraRef.takePictureAsync()
                            console.log(`Taken photo URL => ${uri}`)
                            updateURI(uri)
                            await MediaLibrary.saveToLibraryAsync(uri)
                            navigation.goBack()
                        } catch (error) {
                            console.log('Error occurred while taking a picture:', error)
                        }
                    }
                }}>

                    <FontAwesome name='camera' color={Colors.lightBlack} size={20} />
                </Pressable>
            </Box>
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.lightBlack,
    },
    camera: {
        flex: 0.8,
    },
    fab: {
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: Colors.white,
        height: 70,
        width: 70,
        bottom: 50,
        right: 160,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    }
})