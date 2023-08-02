// import { View, Text } from 'react-native'
// import React from 'react'
// import { FlatList } from 'native-base'
// import Test from './Test'

// const SwipeScreen = () => {
//     return (
//         <View style={{ flex: 1 }}>
//             <FlatList
//                 horizontal

//                 data={[
//                     "Screen 1",
//                     "Screen 2",
//                     "Screen 3",
//                 ]}
//                 showsHorizontalScrollIndicator={false}
//                 renderItem={({ item, index }) => {
//                     return (
//                         <Test label={item} index={index} />
//                     )
//                 }}
//             />
//         </View>
//     )
// }

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios'
import TimelineV2 from './TimelineV2';
import CircularProgress from 'react-native-circular-progress-indicator';

const SwipeScreen = () => {
  const [index, setIndex] = useState(0)
  const [customerData, setCustomerData] = useState([])
  const [unitDates, setUnitDates] = useState([])
  const [paymentList, setPaymentList] = useState([])
  const [visitList, setVisitList] = useState([])
  const [orderList, setOrderList] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  const list = [
    {
      "CustomerId": "120 04 004",
      "CustomerName": "MUSTERI 1482"
    },
    {
      "CustomerId": "120 04 006",
      "CustomerName": "MUSTERI 1484"
    },
    {
      "CustomerId": "120 04 010",
      "CustomerName": "MUSTERI 1488"
    },
    {
      "CustomerId": "120 04 012",
      "CustomerName": "MUSTERI 1490"
    },
    {
      "CustomerId": "120 04 013",
      "CustomerName": "MUSTERI 1491"
    },
    {
      "CustomerId": "120 04 017",
      "CustomerName": "MUSTERI 1495"
    },
    {
      "CustomerId": "120 04 018",
      "CustomerName": "MUSTERI 1496"
    },
    {
      "CustomerId": "120 05 005",
      "CustomerName": "MUSTERI 1501"
    },
    {
      "CustomerId": "120 05 013",
      "CustomerName": "MUSTERI 1509"
    },
    {
      "CustomerId": "120 08 007",
      "CustomerName": "MUSTERI 2233"
    },
    {
      "CustomerId": "120 08 011",
      "CustomerName": "MUSTERI 2237"
    },
    {
      "CustomerId": "120 08 012",
      "CustomerName": "MUSTERI 2238"
    },
    {
      "CustomerId": "120 25 025",
      "CustomerName": "MUSTERI 3182"
    }
  ]

  useEffect(() => {

    setIsLoading(true)
    postData().then(() => setIsLoading(false))
  }, [index])

  const postData = async () => {
    console.log(index)
    console.log("useEffect has worked")

    try {
      const response = await axios.post('http://duyu.alter.net.tr/api/TimelineCustomer', {
        token: 'RasyoIoToken2021',
        StartDate: '01.01.2023',
        EndDate: '10.04.2023',
        CustomerId: list[index]['CustomerId'],
        user_token: '$2y$10$x4.gGU7y5jPP9uZ1wdkA0eqfzztRFIYb5.w3QhgaABonC2wWhh3GS',
      });
      const rp = response.data[2].reverse()
      const rv = response.data[3].reverse()
      const ro = response.data[1].reverse()

      for (let i = 0; i < rp.length; i++) {
        if (!unitDates.includes(rp[i].CollectionDate)) {
          unitDates.push(rp[i].CollectionDate);
        }
      }
      for (let i = 0; i < ro.length; i++) {
        if (!unitDates.includes(ro[i].OrderDate)) {
          unitDates.push(ro[i].OrderDate);
        }
      }
      for (let i = 0; i < rv.length; i++) {
        if (!unitDates.includes(rv[i].VisitDate)) {
          unitDates.push(rv[i].VisitDate);
        }
      }
      setCustomerData(response.data);
      setPaymentList(response.data[2]);
      setVisitList(response.data[3]);
      setOrderList(response.data[1]);
    } catch (error) {
      console.log(error)
    }
  }

  if (isLoading) {
    return <View style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
      <Text>Loading...</Text>
    </View>
  }

  return (
    <Swiper loop={false} showsPagination={false} index={index} onIndexChanged={(value) => setIndex(value)}>

      {list.map((item, index) => {
        return <TimelineV2 customerData={customerData} orderList={orderList} paymentList={paymentList} unitDates={unitDates} visitList={visitList} key={index} />
      })}
      {/* <View style={[styles.screen, { backgroundColor: 'red' }]}>
        <Text>Screen 1</Text>
      </View>
      <View style={styles.screen}>
        <Text>Screen 2</Text>
      </View>
      <View style={styles.screen}>
        <Text>Screen 3</Text>
      </View> */}
    </Swiper>
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SwipeScreen