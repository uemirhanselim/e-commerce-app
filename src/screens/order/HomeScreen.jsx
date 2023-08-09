import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { Box, FlatList, Icon, Pressable, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons'
import axios from 'axios';

// Gap stuff
const { width, height } = Dimensions.get('window');

const RenderItem = ({ item, navigation, customerList }) => {
  return (
    <Pressable onPress={() => {
      navigation.navigate(item['route'], {
        item: {
          "customerList": customerList,
        }
      })
    }}>
      <View style={style.item}>
        <Icon as={Ionicons} name={item['icon']} size={60} color="white" />
        <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>{item['title']}</Text>
      </View>
    </Pressable>
  )
};
const HomeScreenT = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const data = route.params.item
  const [customerList, setCustomerList] = useState([])

  useEffect(() => {

    postData()
  }, [])

  const postData = async () => {
    try {
      const response = await axios.post('http://duyu.alter.net.tr/api/TimelineCustomerList', {
        token: 'RasyoIoToken2021',
        StartDate: '01.01.2023',
        EndDate: '10.12.2023',
        SalesmanId: data['id'],
        user_token: '$2y$10$x4.gGU7y5jPP9uZ1wdkA0eqfzztRFIYb5.w3QhgaABonC2wWhh3GS',
      });
      setCustomerList(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  const homeData = [
    {
      "title": "Zaman Çizelgesi",
      "icon": "time",
      "route": "SwipeScreen"
    }
  ]
  return (
    <SafeAreaView style={style.container}>
      <View style={style.appBar}>
        <Text style={style.text}>
          Duyu
          <Text style={style.textSpan}>Box</Text>
        </Text>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{data['customer-name']}</Text>
      </View>
      <View style={{
        flex: 1, justifyContent: 'center', alignItems: 'flex-start', paddingHorizontal: 10
      }}>
        <FlatList
          numColumns={2}
          data={homeData}
          renderItem={({ item, index }) => <RenderItem item={item} customerList={customerList} navigation={navigation} />}
        />
      </View>
    </SafeAreaView>
  )
}

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30
  },
  textSpan: {
    color: 'rgb(110,0,239)'
  },
  appBar: {
    backgroundColor: 'white',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    height: '10%',
    paddingHorizontal: 10,
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: 'rgba(110,0,239, 0.5)',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginHorizontal: 4,
    width: width / 2.3,
    height: height / 5,
    borderRadius: 8,
    paddingVertical: 30,
  }
})

export default HomeScreenT