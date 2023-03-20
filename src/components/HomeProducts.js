import React, { useEffect, useState } from 'react'
import { Box, Flex, Heading, Image, Pressable, ScrollView, Text } from 'native-base'
import Colors from '../constants/Colors'
import { ActivityIndicator, StyleSheet } from 'react-native'
import Rating from './Rating'


const HomeProducts = () => {
  const [productList, setProductList] = useState([])
  const [isLoading, setLoading] = useState(true)

  const getProducts = async () => {
    try {
      const res = await fetch('https://dummyjson.com/products')
      const json = await res.json()
      console.log(`data: ${json['products'][0]['rating']}`)
      setProductList(json['products'])
      setLoading(false)
    } catch (error) {
      console.log(`Error on getProducts --> ${error}`)
    }
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (

    isLoading ? <ActivityIndicator size='large' color={Colors.orange} style={styleSheet.activityIndicator} /> :
      <ScrollView flex={1}>
        <Flex
          flexWrap="wrap"
          direction='row'
          justifyContent="space-between"
          px={6}
        >
          {productList.map((product) => (
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
      </ScrollView>

  )
}

const styleSheet = StyleSheet.create({
  activityIndicator: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

  }
})

export default HomeProducts