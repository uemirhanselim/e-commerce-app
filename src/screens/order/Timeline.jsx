import { Box, HStack, Spacer, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import axios from 'axios'
import { format } from 'date-fns';

const TimelineItem = ({ item, index, data }) => {
  const isOddIndex = index % 2 === 1;
  const originalOrderDate = item[0].OrderDate;
  const date = new Date(originalOrderDate);
  const formattedOrderDate = `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`;
  const originalCollectionDate = data[1][0].CollectionDate;
  const collectionDate = new Date(originalCollectionDate);
  const formattedCollectionDate = `${collectionDate.getDate() < 10 ? '0' : ''}${collectionDate.getDate()}.${collectionDate.getMonth() + 1 < 10 ? '0' : ''}${collectionDate.getMonth() + 1}.${collectionDate.getFullYear()}`;

  const sTimeString = data[2][0].StartTime
  const eTimeString = data[2][0].EndTime
  const formattedSTime = `${sTimeString.split(':')[0]}.${sTimeString.split(':')[1]}`;
  const formattedETime = `${eTimeString.split(':')[0]}.${eTimeString.split(':')[1]}`;
  return (
    <VStack style={{ width: '100%' }}>
      {index === 0 ? <>
        <HStack >
          <Text style={{ left: 200 }}>{formattedOrderDate}</Text>
          <View style={styles.circle} />
        </HStack>
        <HStack>
          <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemRight]}>

            <View style={[styles.content, { paddingLeft: 10 }]}>
              <Text style={styles.description}>Plansız ziyaret</Text>
              <Text style={styles.description}>Açıklama: {data[2][0].Description}  </Text>
              <Text style={styles.description}>Ziyaret Saati: {formattedSTime} - {formattedETime}</Text>
            </View>
          </View>
        </HStack>
        <HStack>
          <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemLeft]}>

            <View style={[styles.content, { paddingTop: 15, paddingLeft: 10 }]}>
              <Text style={styles.description}>Plasiyerin Sipariş Tutarı: {data[0][0].OrderAmountPriceSalesman}</Text>
              <Text style={styles.description}>Sipariş Tutarı: {data[0][0].OrderAmountPriceDefault}  </Text>
            </View>
          </View>
        </HStack>
        <HStack>
          <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemRight]}>

            <View style={[styles.content, { paddingLeft: 10, paddingTop: 30 }]}>
              <Text style={styles.description}>{data[1][1].CollectionType}: {data[1][1].Amount}</Text>
            </View>
          </View>
        </HStack>
      </>

        : index === 1 ? <>
          <HStack >
            <Text style={{ left: 100 }}>{formattedCollectionDate}</Text>
            <View style={styles.circle} />
          </HStack>
          <HStack>
            <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemRight]}>

              <View style={[styles.content, { paddingLeft: 10, paddingTop: 30 }]}>
                <Text style={styles.description}>{data[1][0].CollectionType}: {data[1][0].Amount}</Text>
              </View>
            </View>
          </HStack>
          <HStack>
            <View style={[styles.item, isOddIndex ? styles.itemRight : styles.itemLeft]}>

              <View style={styles.content}>

              </View>
            </View>
          </HStack>
          <HStack>
            <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemRight]}>

              <View style={styles.content}>

              </View>
            </View>
          </HStack>
        </> : <></>}
      <Box style={{ height: 50 }} />
    </VStack>
  );
};


const TimelineApp = () => {
  const [customerData, setCustomerData] = useState({})
  const [orderData, setOrderData] = useState([])

  const postData = async () => {

    try {
      const response = await axios.post('http://duyu.alter.net.tr/api/TimelineCustomer', {
        token: 'RasyoIoToken2021',
        StartDate: '01.01.2023',
        EndDate: '10.04.2023',
        CustomerId: '120 04 006',
        user_token: '$2y$10$x4.gGU7y5jPP9uZ1wdkA0eqfzztRFIYb5.w3QhgaABonC2wWhh3GS',
      });
      setCustomerData(response.data[0][0]);
      const orderList = []
      for (i = 1; i < response.data.length; i++) {

        orderList.push(response.data[i])

      }
      setOrderData(orderList)

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    postData();
  }, [])

  if (Object.keys(customerData).length === 0 && orderData.length === 0) {
    return null;
  }

  return (
    <View style={styles.timeline}>
      <CustomerInfo customerData={customerData} />
      <View style={styles.line} />
      <FlatList
        data={orderData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => <TimelineItem item={item} index={index} data={orderData} />}
      />
    </View>


  );
};

const CustomerInfo = ({ customerData }) => {
  return (
    <>
      <Text style={{ paddingTop: 60, alignItems: 'flex-start' }}>{customerData.CustomerId} - {customerData.CustomerName}</Text>
      <Text >{customerData.CustomerName} Adresi / {customerData.CustomerProvince}</Text>
      <Text >Bakiye: {customerData.CustomerBalance}</Text>
      <Text >CARİ RİSK: {customerData.CustomerRisk}</Text>

      <Text style={{ marginTop: 10, marginBottom: 5, fontWeight: 'bold', color: 'purple' }} >{customerData.SalesmanId} - {customerData.SalesmanName}</Text>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timeline: {
    flexDirection: 'column',
    paddingHorizontal: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: '100%',
    backgroundColor: 'green',

    position: 'absolute',
    top: 175,
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: 'purple',
    position: 'absolute',
    left: '50%',
    top: 2,
    marginLeft: -8,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,

  },
  content: {
    marginLeft: 0,
    padding: 2,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  description: {
    fontSize: 12,
    marginBottom: 2,
  },
  timestamp: {
    fontSize: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,
    left: 5,
    marginRight: '50%',
  },

  itemRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'orange',
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
    marginTop: 20,
    right: -10,
    marginLeft: '50%',
  },
});

export default TimelineApp;
