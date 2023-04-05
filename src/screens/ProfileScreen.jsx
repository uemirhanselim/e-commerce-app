
import { Box, Center, FormControl, Heading, Image, Input, ScrollView, Text, VStack, View } from 'native-base'
import React, { useState, useEffect } from 'react'
import CustomButton from '../components/CustomButton'
import Colors from '../constants/Colors'
import { GetData, StoreData } from '../storage/ProfileStorage'
import MapView, { Marker } from 'react-native-maps'
import { ActivityIndicator } from 'react-native-paper'

const Inputs = [
    {
        label: "USERNAME",
        type: "text",
    },
    {
        label: "EMAIL",
        type: "text",
    },
    {
        label: "NEW PASSWORD",
        type: "password",
    },
    {
        label: "CONFIRM PASSWORD",
        type: "password",
    },
]

const ProfileScreen = () => {
    const [displayedUsername, setDisplayedUsername] = useState("Zaniolo")
    const [usernameController, setUsernameController] = useState("")
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [city, setCity] = useState("");
    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        getStoredData()
        getLocation()
    }, [])


    const getStoredData = async () => {
        const name = await GetData("username")
        console.log(`stored name: ${name}`)
        if (name ?? false) {
            setDisplayedUsername(name)

        }

        const lat = await GetData("latitude")
        const lon = await GetData("longitude")
        const region = await GetData("region")
        setCity(region)
        setLatitude(parseFloat(lat))
        setLongitude(parseFloat(lon))
        setLoading(false)
        console.log("lat", lat)
        console.log("long", lon)
        console.log("city", region)

    }

    const getLocation = async () => {

    }

    return (
        <>
            <Center bg={Colors.orange} pt={10} pb={6}>
                <Image source={{ uri: 'https://i1.sndcdn.com/avatars-000583246488-dhm5la-t500x500.jpg' }}
                    alt='profile'
                    w={108}
                    h={108}
                    resizeMode='cover'
                    borderRadius={60}
                />
                <Heading bold fontSize={15} isTruncated my={2} color={Colors.white}>
                    {displayedUsername}
                </Heading>
                <Text italic fontSize={13} color={Colors.white}>
                    {city}
                </Text>
            </Center>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Box h='full' bg={Colors.white} px={5}>
                    <VStack space={10} mt={5} pb={10}>
                        {
                            Inputs.map((item, index) => (
                                <FormControl key={index}>
                                    <FormControl.Label
                                        _text={{
                                            fontSize: "12px",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.label}
                                    </FormControl.Label>
                                    <Input
                                        borderWidth={0.2}
                                        bg={Colors.lightOrange}
                                        py={4}
                                        type={item.type}
                                        color={Colors.black}
                                        fontSize={15}
                                        _focus={{ bg: Colors.lightOrange, borderWidth: 1, }}
                                        onChangeText={(value) => setUsernameController(value)}
                                        value={item.label === "USERNAME" ? usernameController : null}
                                    />
                                </FormControl>
                            ))
                        }
                        <CustomButton bg={Colors.orange} color={Colors.white} onPress={async () => {
                            setDisplayedUsername(usernameController)
                            await StoreData("username", usernameController)
                            setUsernameController("")
                        }}>
                            UPDATE PROFILE
                        </CustomButton>
                        {isLoading ? <ActivityIndicator /> :
                            <MapView style={{ height: 300 }} initialRegion={{
                                latitude: latitude,
                                longitude: longitude,
                                latitudeDelta: 0.0922,
                                longitudeDelta: 0.0421,
                            }}>

                                <Marker
                                    coordinate={{ latitude: latitude, longitude: longitude }}
                                    title="Emirhan's Home"
                                />
                            </MapView>}
                    </VStack>

                </Box>
            </ScrollView>
        </>
    )
}

export default ProfileScreen