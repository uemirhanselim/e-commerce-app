import React, { useEffect, useState } from 'react'
import { StyleSheet } from 'react-native'
import { Camera } from 'expo-camera';
import { Box, HStack, Image, Input, Pressable, ScrollView, Text, View, VStack } from 'native-base'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import CustomButton from '../components/CustomButton';
import { getStoredProduct, storeProduct } from '../storage/AddItemStorage'

const AddProduct = () => {
    const navigation = useNavigation()
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [permissionResponse, requestMediaPermission] = MediaLibrary.usePermissions();
    const state = useSelector(state => state.CameraReducer)
    const [brand, setBrand] = useState("")
    const [desc, setDesc] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState("")

    //? SHOWS THE STORED DATA
    // useEffect(() => {
    //     CoData()
    // }, [])

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
                    <CustomButton bg={Colors.lightOrange} mt={5} onPress={async () => {
                        await storeProduct(brand, {
                            "id": price * 3,
                            "title": brand,
                            "description": desc,
                            "price": price,
                            "discountPercentage": 12.96,
                            "rating": 3,
                            "stock": stock,
                            "brand": brand,
                            "category": "smartphones",
                            "thumbnail": state,
                            "images": [
                            ]
                        })
                        const incoming = await getStoredProduct("maymune")
                        console.log(`stored Data => ${incoming['title']}`)
                    }}>Publish Product</CustomButton>
                </VStack>
            </ScrollView>
        </Box >
    )
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