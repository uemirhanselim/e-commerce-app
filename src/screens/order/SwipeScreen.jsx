import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios'
import TimelineV2 from './TimelineV2';
import { useRoute } from '@react-navigation/native';

const SwipeScreen = () => {
  const [index, setIndex] = useState(0)
  const [customerData, setCustomerData] = useState([])
  const [unitDates, setUnitDates] = useState([])
  const [paymentList, setPaymentList] = useState([])
  const [visitList, setVisitList] = useState([])
  const [orderList, setOrderList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const route = useRoute()
  const data = route.params.item

  useEffect(() => {

    setIsLoading(true)
    postData().then(() => setIsLoading(false))
  }, [index])

  const postData = async () => {
    console.log("useEffect has worked")
    console.log("customerlist ", data['customerList'])
    console.log("index ", index)

    try {
      const response = await axios.post('http://duyu.alter.net.tr/api/TimelineCustomer', {
        token: 'RasyoIoToken2021',
        StartDate: '01.01.2023',
        EndDate: '10.04.2023',
        CustomerId: data['customerList'][0][index]['CustomerId'],
        user_token: '$2y$10$x4.gGU7y5jPP9uZ1wdkA0eqfzztRFIYb5.w3QhgaABonC2wWhh3GS',
      });
      console.log(response.data)
      const rp = response.data[2].reverse()
      const rv = response.data[3].reverse()
      const ro = response.data[1].reverse()
      // setUnitDates([])
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

  if (isLoading && unitDates.length === 0) {
    return <View style={{ marginTop: '100%' }}>
      <Text style={{ textAlign: 'center' }}>Loading...</Text>
    </View>
  }

  return (
    <Swiper loop={false} showsPagination={false} index={index} onIndexChanged={(value) => setIndex(value)}>

      {data['customerList'][0].map((item, index) => {
        return <TimelineV2 customerData={customerData} orderList={orderList} paymentList={paymentList} unitDates={unitDates} visitList={visitList} key={index} />
      })}
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