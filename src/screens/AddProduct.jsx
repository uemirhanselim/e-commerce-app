import React, { useEffect, useRef, useState } from 'react'
import { AppState, StyleSheet } from 'react-native'
import { Camera } from 'expo-camera';
import { Box, HStack, Image, Input, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import CustomButton from '../components/CustomButton';
import { getStoredProduct, storeProduct } from '../storage/AddItemStorage'

import * as Notifications from 'expo-notifications';
import * as Linking from 'expo-linking';
import { registerForPushNotificationsAsync } from '../product/PushNotifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

const AddProduct = () => {
    const navigation = useNavigation()
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
    const state = useSelector(state => state.CameraReducer)
    const [brand, setBrand] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();
    const [isPublishProductPressed, setPublishProductPressed] = useState(false)


    useEffect(() => {
        //? SHOWS THE STORED DATA
        // CoData()
        const prefix = Linking.createURL("/")

        //* Checks app state
        const subscription = AppState.addEventListener('change', nextAppState => {
            console.log('next app state', nextAppState);
            if (
                appState.current.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                console.log('App has come to the foreground!');
            }
            if (isPublishProductPressed === false && nextAppState === 'background') {
                pushNt()
            }
            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log('AppState', appState.current);
        })

        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);

        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log('response is ', response);
            console.log("the linking is", response.notification.request.content.data.data)
            Linking.openURL(prefix + "tabNav/profile")
        });


        return () => {
            subscription.remove();
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, [])
    const pushNt = async () => {
        await schedulePushNotification()
    }

    // const CoData = async () => {
    //     const incoming = await getStoredProduct("maymune")
    //     console.log(`stored Data => ${incoming['title']} -- ${incoming['description']} -- ${incoming['id']}`)
    // }


    return (
        <Box safeArea flex={1} color={Colors.white} >
            <HStack alignItems='center' pl={6} space={3}>
                <Pressable >


                    <FontAwesome name="arrow-left" color={Colors.black} size={22} />
                </Pressable>
                <Text color={Colors.black} fontSize={24} bold > Add Product </Text>
            </HStack>
            {state === "" ? <View width='full' height={300} backgroundColor={Colors.orange} /> :
                <Image source={{ uri: state }} w='full' height={300} resizeMode='contain' alt='product' />}
            <Box style={styleSheet.fab}>
                <Pressable onPress={() => {
                    if (!permission.granted || !permissionResponse.granted) {
                        requestPermission()
                        requestMediaPermission()
                        console.log("Pressed")
                    } else {
                        navigation.navigate("CameraScreen")
                        console.log("Allowed")
                    }
                }}>

                    <FontAwesome name='camera' color={Colors.white} size={20} />
                </Pressable>
            </Box>
            <ScrollView mt={10}>
                <VStack mx={5} space={5} mb={15}>

                    <View justifyContent='center' alignItems='flex-start' w='full'>
                        <Text style={styleSheet.label}>Brand </Text>
                        <Input style={styleSheet.largeInput} height={16} value={brand} onChangeText={text => setBrand(text)} />
                    </View>
                    <View justifyContent='center' alignItems='flex-start' w='full'>
                        <Text style={styleSheet.label}>Description </Text>
                        <Input style={styleSheet.largeInput} multiline numberOfLines={4} maxLength={40} textAlignVertical='top'
                            value={desc} onChangeText={text => setDesc(text)}
                        />
                    </View>
                    <HStack justifyContent='space-between'>
                        <View style={styleSheet.smallView}>
                            <Text style={styleSheet.label}>Price </Text>
                            <Input style={styleSheet.smallInput} keyboardType='numeric'
                                value={price} onChangeText={text => setPrice(text)} />
                        </View>
                        <View style={styleSheet.smallView}>
                            <Text style={styleSheet.label}>Stock </Text>
                            <Input style={styleSheet.smallInput} keyboardType='numeric'
                                value={stock} onChangeText={text => setStock(text)} />
                        </View>
                    </HStack>
                    <CustomButton bg={Colors.orange} mt={5} onPress={async () => {
                        console.log("pressed")
                        setPublishProductPressed(true)
                        // await storeProduct(brand, {
                        //     "id": price * 3,
                        //     "title": brand,
                        //     "description": desc,
                        //     "price": price,
                        //     "discountPercentage": 12.96,
                        //     "rating": 3,
                        //     "stock": stock,
                        //     "brand": brand,
                        //     "category": "smartphones",
                        //     "thumbnail": state,
                        //     "images": [
                        //     ]
                        // })
                        // const incoming = await getStoredProduct("maymune")
                        // console.log(`stored Data => ${incoming['title']}`)
                    }}>Publish Product</CustomButton>
                </VStack>
            </ScrollView>
        </Box >
    )
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You haven't published your product",
            body: 'Go back to app to publish your product',
            data: { data: "deepLinkUrl" },
        },
        trigger: { seconds: 2 },
    });
}


export default AddProduct

const styleSheet = StyleSheet.create({
    fab: {
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        backgroundColor: Colors.black,
        height: 70,
        width: 70,
        top: 325,
        right: 15,
        position: 'absolute',
        justifyContent: 'center',
        alignItems: 'center'
    },
    smallInput: {
        height: 56,
        borderWidth: 0.2,
        backgroundColor: Colors.lightOrange,
        color: Colors.black,
        fontSize: 15,
    },
    largeInput: {
        borderWidth: 0.2,
        backgroundColor: Colors.lightOrange,
        color: Colors.black,
        fontSize: 15,
    },
    smallView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: '48%',
    },
    largeView: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 'full',
    },
    label: {
        fontSize: 17,
        fontWeight: "bold",
    }
})