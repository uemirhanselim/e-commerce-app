
import { Box, Center, Text } from 'native-base'
import React from 'react'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import CustomButton from './CustomButton'
import { useNavigation } from '@react-navigation/native'

const CardEmpty = () => {
    const navigation = useNavigation()
    return (
        <Box flex={1} px={4}>
            <Center h="90%">
                <Center w={200} h={200} bg={Colors.white} rounded='full'>
                    <FontAwesome name='shopping-basket' size={64} color={Colors.orange} />
                </Center>
                <Text color={Colors.orange} bold mt={5}>CARD IS EMPTY</Text>
            </Center>
            <CustomButton bg={Colors.black} color={Colors.white} onPress={() => navigation.goBack()}>
                START SHOPPING
            </CustomButton>
        </Box>
    )
}

export default CardEmpty