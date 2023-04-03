import { useNavigation } from '@react-navigation/native'
import { Box, Flex, Heading, HStack, Image, Input, Pressable, ScrollView, Text } from 'native-base'
import React, { useEffect, useState } from 'react'
import { ActivityIndicator } from 'react-native-paper'
import Colors from '../constants/Colors'
import { StyleSheet } from 'react-native'
import Rating from '../components/Rating'
import { useSelector } from 'react-redux'
import { Icon } from '@rneui/themed'

const HomeScreen = () => {
    const navigation = useNavigation()
    const [productList, setProductList] = useState([])
    const [filteredData, setFilteredData] = useState([])
    const [isLoading, setLoading] = useState(true)
    const state = useSelector((state) => state.ProductReducer)
    let addedItems = [];
    if (state && state.items) {
        addedItems = state.items;
    }


    const handleSearch = (query) => {
        if (query) {
            setFilteredData(
                productList.filter((product) => product['title'].toLowerCase()
                    .includes(query.toLowerCase()))
            )
        } else {
            setFilteredData(productList)
        }
    }


    const getProducts = async () => {
        try {
            const res = await fetch('https://dummyjson.com/products')
            const json = await res.json()
            setProductList(json['products'])
            setFilteredData(json['products'])
            setLoading(false)
        } catch (error) {
            console.log(`Error on getProducts --> ${error}`)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])

    return (
        <Box flex={1}>
            <HStack
                space={3}
                w='full'
                px={6}
                bg={Colors.orange}
                py={4}
                alignItems='center'
                safeAreaTop
            >
                <Input
                    placeholder='Search for an item ....'
                    w="85%"
                    bg={Colors.white}
                    type="search"
                    variant="filled"
                    h={12}
                    borderWidth={0}
                    _focus={{ bg: Colors.white }}
                    onChangeText={(value) => handleSearch(value)}

                />

                <Pressable ml={3} onPress={() => navigation.navigate("CardScreen")}>
                    <Icon name='shopping-basket' type='entypo' size={24} color={Colors.white} />
                    <Box bg={Colors.red} px={1} rounded='full' position='absolute' top={-13} left={3} _text={{
                        color: Colors.white, fontSize: '11px',
                    }}>{addedItems.length}</Box>
                </Pressable>

            </HStack>

            {isLoading ? <ActivityIndicator size='large' color={Colors.orange} style={styleSheet.activityIndicator} /> :
                <ScrollView flex={1}>
                    <Flex
                        flexWrap="wrap"
                        direction='row'
                        justifyContent="space-between"
                        px={6}
                    >
                        {filteredData.map((product) => (
                            <Pressable
                                key={product['id']}
                                w="47%"
                                bg={Colors.white}
                                rounded='md'
                                shadow={2}
                                pt={0.3}
                                my={3}
                                pb={2}
                                overflow='hidden'
                                onPress={() => navigation.navigate("ProductDetailsScreen", product)}
                            >
                                <Image source={{ uri: product['thumbnail'] }}
                                    alt={product['title']}
                                    w='full'
                                    h={24}
                                    resizeMode='cover'
                                />

                                <Box px={4} pt={1}>
                                    <Heading size='sm' bold>
                                        ${product['price']}
                                    </Heading>
                                    <Text fontSize={10} mt={1} isTruncated w='full'>
                                        {product['title']}
                                    </Text>
                                    <Rating value={product["rating"]} />
                                </Box>
                            </Pressable>
                        ))}
                    </Flex>
                </ScrollView>}

            <Box style={styleSheet.fab}>
                <Pressable onPress={() => navigation.navigate("AddProduct")}>

                    <Icon name='plus' type='entypo' color={Colors.white} />
                </Pressable>
            </Box>

        </Box>
    )
}

export default HomeScreen


const styleSheet = StyleSheet.create({
    activityIndicator: {
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,

    },
    fab: {
        borderBottomRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        backgroundColor: Colors.orange,
        height: 60,
        width: 60,
        bottom: 16,
        right: 15,
        position: 'absolute',
        justifyContent: 'center'
    }
})