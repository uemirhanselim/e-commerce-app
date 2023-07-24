import { View, Text, StyleSheet, SafeAreaView, Dimensions } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import { Box, FlatList, Icon, ScrollView } from 'native-base';
import { Ionicons } from '@expo/vector-icons'

// Gap stuff
const { width, height } = Dimensions.get('window');

const renderItem = ({ item }) => {
  return (
    <View style={style.item}>
      <Icon as={Ionicons} name={item['icon']} size={60} color="white" />
      <Text style={{ color: 'white', fontSize: 15, fontWeight: '500' }}>{item['title']}</Text>
    </View>
  )
};
const HomeScreenT = () => {
  const route = useRoute()
  const data = route.params.item

  const homeData = [
    {
      "title": "Zaman Çizelgesi",
      "icon": "time",
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
          renderItem={renderItem}
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