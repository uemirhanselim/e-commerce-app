
import { Box, Button, Center, FlatList, HStack, Image, Pressable, Text, View, VStack } from 'native-base'
import React from 'react'
import Colors from '../constants/Colors'
import { FontAwesome } from '@expo/vector-icons'
import { useDispatch } from 'react-redux'
import { DeleteFromCard } from '../redux/actions/cardActions'
import { Swipeable, TouchableOpacity } from 'react-native-gesture-handler'





const Item = ({ item }) => {

    const rightSwipe = () => {
        return (
            <View style={{ backgroundColor: '#fff', height: 100 }}>
                <TouchableOpacity
                    style={{
                        width: 100, height: 100, backgroundColor: 'red'
                        , justifyContent: 'center', alignItems: 'center',
                    }}>
                    <FontAwesome name='trash' size={24} color={Colors.white} />
                </TouchableOpacity>
            </View>
        )
    }

    return (

        <Swipeable renderRightActions={rightSwipe}>
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
        </Swipeable>

    )
}

const CardItems = ({ card }) => {
    const dispatch = useDispatch()
    const deleteItem = (id) => {
        dispatch(DeleteFromCard(id))
    }
    return (
        <Box mr={6}>
            {card.map((item) => <Item item={item} />)}

        </Box>

    )
}

export default CardItems