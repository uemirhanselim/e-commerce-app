import React, { useState } from 'react'
import { Box, Heading, HStack, Image, Pressable, ScrollView, Spacer, Text, VStack } from 'native-base'
import Colors from '../constants/Colors'
import Rating from '../components/Rating'
import NumericInput from 'react-native-numeric-input'
import CustomButton from '../components/CustomButton'
import { useDispatch, useSelector } from 'react-redux'
import { AddToCard } from '../redux/actions/cardActions'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Snackbar } from 'react-native-paper';

const ProductDetailsScreen = ({ route }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [snackbarText, setSnackbarText] = useState(" added to your card!")
    const [visible, setVisible] = useState(false);
    const state = useSelector(state => state.ProductReducer)
    let addedItems = []
    if (state && state.items) {
        addedItems = state.items
    }
    const product = route.params;

    const addItem = (item) => {
        console.log(`item ${item['id']}`)

        if (addedItems.length === 0 || !addedItems.some(element => element['id'] === item['id'])) {
            dispatch(AddToCard(item))
        } else {
            setSnackbarText(" is already in your card!")
        }
    }

    return (
        <Box safeArea flex={1} bg={Colors.white}>
            <HStack alignItems='center' space={3}
                w='full'
                px={6}>

                <Pressable onPress={() => navigation.goBack()}>
                    <FontAwesome name='arrow-left' size={22} color={Colors.black} />

                </Pressable>
                <Text color={Colors.black} fontSize={24} bold>
                    Card
                </Text>

            </HStack>
            <ScrollView>
                <Image src={product["thumbnail"]}
                    alt="Image" w="full" h={300} resizeMode="contain" />
                <VStack px={4}>
                    <Heading bold fontSize={20} mb={2} lineHeight={22} mt={3}>
                        {product['title']}
                    </Heading>
                    <Rating value={product['rating']} />
                    <HStack space={2} alignItems='center' my={5}>
                        <Heading bold color={Colors.black} fontSize={22}>
                            Stock: {product['stock']}
                        </Heading>
                        {/* <NumericInput value={amount} totalWidth={140} totalHeight={40} iconSize={25}
                            step={1}
                            minValue={0}
                            borderColor={Colors.lightBlack}
                            rounded
                            iconStyle={{ backgroundColor: Colors.white }}
                            textColor={Colors.black}
                            rightButtonBackgroundColor={Colors.orange}
                            leftButtonBackgroundColor={Colors.orange}
                            onChange={(value) => setAmount(value)}
                        /> */}
                        <Spacer />
                        <Heading bold color={Colors.black} fontSize={24}>
                            ${product['price']}
                        </Heading>
                    </HStack>
                    <Text lineHeight={24} fontSize={14}>
                        {product['description']}
                    </Text>
                    <CustomButton onPress={() => {
                        addItem(product);

                        setVisible(!visible)
                        // navigation.goBack();
                    }} bg={Colors.orange} color={Colors.white} mt={10}>ADD TO CARD</CustomButton>

                </VStack>
            </ScrollView>
            <Snackbar
                visible={visible}
                duration={5000}
                onDismiss={() => setVisible(false)}
            >
                {product['title'] + snackbarText}
            </Snackbar>
        </Box>
    )
}

export default ProductDetailsScreen