
import { Box, Button, Center, HStack, Image, Pressable, Text, VStack } from 'native-base'
import React from 'react'
import { SwipeListView } from 'react-native-swipe-list-view'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'

const Swiper = () => {
    <SwipeListView
        rightOpenValue={-50}
        previewRowKey="0"
        previewOpenValue={-40}
        previewOpenDelay={3000}
        data={prdoucts.slice(0.2)} // TODO: CHange here later
        renderHiddenItem={renderHiddenItems}
        renderItem={renderItems} />

}

const renderItems = (data) => {
    <Pressable>
        <Box ml={6} mb={3}>
            <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} overflow='hidden'>
                <Center w='25%' bg={Colors.lightBlack}>
                    <Image source={{
                        uri: data.item.url //TODO change this 
                    }} alt={data.item.name} w='full' resizeMode='contain'
                    />
                </Center>
                <VStack w='60%' px={2} space={2}>
                    <Text isTruncated color={Colors.black} bold fontSize={10}>
                        {data.item.name} //TODO Change here
                    </Text>
                    <Text bold color={Colors.lightBlack}>${price}</Text>//TODO: Change here
                </VStack>
                <Center>
                    <Button bg={Colors.orange} _pressed={{ bg: Colors.orange }} _text={{
                        color:Colors.white
                    }}>5</Button>
                </Center>
            </HStack>
        </Box>
    </Pressable>
}

const renderHiddenItems = () => {
    <Pressable w={50} roundedTopRight={10} roundedBottomRight={10} h='88%' ml='auto' justifyContent="center" bg={Colors.red}>
        <Center alignItems="center" >
            <FontAwesome name='trash' size={24} color={Colors.white} />
        </Center>
    </Pressable>
}

const CardItems = () => {
    return (
        <Box mr={6}>
            <Swiper />
        </Box>

    )
}

export default CardItems