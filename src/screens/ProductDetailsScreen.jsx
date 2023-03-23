import React, { useState } from 'react'
import { Box, Heading, HStack, Image, ScrollView, Spacer, Text, VStack } from 'native-base'
import Colors from '../constants/Colors'
import Rating from '../components/Rating'
import NumericInput from 'react-native-numeric-input'
import CustomButton from '../components/CustomButton'
import { useDispatch } from 'react-redux'
import { AddToCard } from '../redux/actions/cardActions'

const ProductDetailsScreen = ({ route }) => {
    const dispatch = useDispatch()
    const [amount, setAmount] = useState(0)
    const product = route.params;
    const addItem = (item) => {
        dispatch(AddToCard(item))
    }
    return (
        <Box safeArea flex={1} bg={Colors.white}>
            <ScrollView>
                <Image src={product["thumbnail"]}
                    alt="Image" w="full" h={300} resizeMode="contain" />
                <VStack px={4}>
                    <Heading bold fontSize={20} mb={2} lineHeight={22} mt={3}>
                        {product['title']}
                    </Heading>
                    <Rating value={product['rating']} />
                    <HStack space={2} alignItems='center' my={5}>
                        <NumericInput value={amount} totalWidth={140} totalHeight={40} iconSize={25}
                            step={1}
                            minValue={0}
                            borderColor={Colors.lightBlack}
                            rounded
                            iconStyle={{ backgroundColor: Colors.white }}
                            textColor={Colors.black}
                            rightButtonBackgroundColor={Colors.orange}
                            leftButtonBackgroundColor={Colors.orange}
                            onChange={(value) => setAmount(value)}
                        />
                        <Spacer />
                        <Heading bold color={Colors.black} fontSize={24}>
                            ${product['price']}
                        </Heading>
                    </HStack>
                    <Text lineHeight={24} fontSize={14}>
                        {product['description']}
                    </Text>
                    <CustomButton onPress={() => {
                        //console.log(`first: ${latestItem['title']}}`)
                        addItem(product);
                        console.log(`pressed`)
                        // console.log(`second: ${cards['title']}`)
                    }} bg={Colors.orange} color={Colors.white} mt={10}>ADD TO CARD</CustomButton>
                </VStack>
            </ScrollView>
        </Box>
    )
}

export default ProductDetailsScreen