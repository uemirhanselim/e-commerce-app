
import { Box, Button, Center, HStack, Image, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { SwipeListView } from 'react-native-swipe-list-view'
import { useDispatch } from 'react-redux'
import { DeleteFromCard } from '../redux/actions/cardActions'

const Swiper = ({ card }) => {
    return (
        <View>
            <SwipeListView
                rightOpenValue={-50}
                previewRowKey="0"
                previewOpenValue={-40}
                previewOpenDelay={3000}
                data={card}
                renderItem={renderItems}
                renderHiddenItem={renderHiddenItems}
            />
        </View>
    );
}


const renderItems = ({ item }) => {

    return (
        <Pressable>
            <Box ml={6} mb={3} s>
                <HStack alignItems="center" bg={Colors.white} shadow={1} rounded={10} h={20} overflow='hidden'>
                    <Center w='25%' h={10} bg={Colors.lightBlack}>
                        <Image source={{
                            uri: item['thumbnail']
                        }} alt={item['title']} w='full' h={20} resizeMode='contain'
                        />
                    </Center>
                    <VStack pl={5} w='60%' px={2} space={2}>
                        <Text isTruncated color={Colors.black} bold fontSize={16}>
                            {item['title']}
                        </Text>
                        <Text bold color={Colors.lightBlack}>${item['price']}</Text>
                    </VStack>
                    {/* <Center>
                        <Button bg={Colors.orange} _pressed={{ bg: Colors.orange }} _text={{
                            color: Colors.white
                        }}>1</Button>
                    </Center> */}
                </HStack>
            </Box>
        </Pressable >
    );
};


const renderHiddenItems = ({ item }) => {
    return (
        <Pressable w={60} roundedTopRight={10} roundedBottomRight={10} h={20} ml='auto' justifyContent="center" bg={Colors.red}>
            <Center alignItems="center" >
                <FontAwesome name='trash' size={24} color={Colors.white} />
            </Center>
        </Pressable>
    );
}


const CardItems = ({ card }) => {
    const dispatch = useDispatch()
    const deleteItem = (id) => {
        dispatch(DeleteFromCard(id))
    }
    return (
        <Box mr={6}>
            <Swiper card={card} />
        </Box>

    )
}

export default CardItems