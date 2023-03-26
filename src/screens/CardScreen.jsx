import { Text, Box, Center, ScrollView, HStack, Pressable } from 'native-base'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardEmpty from '../components/CardEmpty'
import CardItems from '../components/CardItems'
import CustomButton from '../components/CustomButton'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

const CardScreen = () => {
    const state = useSelector((state) => state)
    let addedItems = []
    addedItems = state.result
    const [totalPrice, setTotalPrice] = useState(0);
    const navigation = useNavigation()

    useEffect(() => {
        let totalPrice = 0;
        for (let i = 0; i < addedItems.length; i++) {
            totalPrice += addedItems[i]['price'];
        }
        setTotalPrice(totalPrice);
    }, [addedItems]);

    return (
        <Box flex={1} safeAreaTop bg={Colors.orange}>
            <HStack alignItems='center' space={3}
                w='full'
                px={6}>

                <Pressable onPress={() => navigation.goBack()}>
                    <FontAwesome name='arrow-left' size={22} color={Colors.white} />

                </Pressable>
                <Text color={Colors.black} fontSize={24} bold>
                    Card
                </Text>

            </HStack>
            {addedItems.length === 0 ?
                <CardEmpty /> :
                <ScrollView showsVerticalScrollIndicator={false} pt={10}>
                    <CardItems card={addedItems} />
                    <Center mt={5}>
                        <HStack
                            rounded={50}
                            justifyContent='space-between'
                            bg={Colors.white}
                            shadow={2}
                            w='90%'
                            pl={5}
                            h={45}
                            alignItems='center'
                            mt={10}
                        >

                            <Text>Total</Text>
                            <Text pr={10}>${totalPrice}</Text>
                        </HStack>
                    </Center>
                    <Center px={5}>
                        <CustomButton bg={Colors.black} color={Colors.white} mt={5}>
                            PAYMENT
                        </CustomButton>
                    </Center>
                </ScrollView>
            }
        </Box >
    )
}

export default CardScreen