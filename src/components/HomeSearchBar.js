import React from 'react'
import { Box, HStack, Input, Pressable } from 'native-base'
import Colors from '../constants/Colors'
import { Icon } from '@rneui/themed';

const HomeSearchBar = () => {
    return (
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
            />

            <Pressable ml={3}>
                <Icon name='shopping-basket' type='entypo' size={24} color={Colors.white} />
                <Box bg={Colors.red} px={1} rounded='full' position='absolute' top={-13} left={3} _text={{
                    color: Colors.white, fontSize: '11px',
                }}>3</Box>
            </Pressable>

        </HStack>
    )
}

export default HomeSearchBar