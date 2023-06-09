import { Box, HStack, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'

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
    <VStack style={{ width: '100%', marginBottom: 50 }}>
      {index === 0 ? <>
        <HStack marginTop={3}>
          <Text style={[styles.title, { top: 8, left: '850%', fontSize: 18, color: 'rgb(130, 148, 196)' }]}>{formattedOrderDate}</Text>
          <View style={styles.circle} />
        </HStack>
        <HStack>
          <View style={[styles.item, isOddIndex ? styles.itemLeft : styles.itemRight]}>

            <View style={[styles.content, { paddingLeft: 10 }]}>
              <Text style={styles.description}>Plansız ziyaret</Text>
              <Text style={styles.description}>Açıklama: {" "}
                <Text style={styles.infoDesc}>{data[2][0].Description}</Text></Text>
              <Text style={styles.description}>Ziyaret Saati: {" "}
                <Text style={styles.infoDesc}>{formattedSTime} - {formattedETime}</Text></Text>
            </View>
          </View>
        </HStack>
        <HStack>
          <View style={[styles.item1, isOddIndex ? styles.itemLeft : styles.itemLeft]}>

            <View style={[styles.content, { paddingTop: 10, paddingLeft: 10 }]}>
              <Text style={styles.description}>Plasiyerin Sipariş Tutarı: {" "}
                <Text style={styles.infoDesc}>{data[0][0].OrderAmountPriceSalesman}</Text></Text>
              <Text style={styles.description}>Sipariş Tutarı: {" "}
                <Text style={styles.infoDesc}>{data[0][0].OrderAmountPriceDefault}</Text></Text>
            </View>
          </View>
        </HStack>
        <HStack>
          <View style={[styles.item2, isOddIndex ? styles.itemLeft : styles.itemRight]}>

            <View style={[styles.content, { paddingLeft: 10, paddingTop: 30 }]}>
              <Text style={styles.description}>{data[1][1].CollectionType}: {" "}
                <Text style={styles.infoDesc}>{data[1][1].Amount}</Text></Text>
            </View>
          </View>
        </HStack>
      </>

        : index === 1 ? <>
          <HStack >
            <Text style={[styles.title, { top: 8, left: '850%', fontSize: 18, color: 'rgb(130, 148, 196)' }]}>{formattedCollectionDate}</Text>
            <View style={styles.circle} />
          </HStack>
          <HStack>
            <View style={[styles.item, isOddIndex ? styles.itemRight : styles.itemLeft]}>


            </View>
          </HStack>
          <HStack>
            <View style={[styles.item1, isOddIndex ? styles.itemLeft : styles.itemLeft]}>


            </View>
          </HStack>
          <HStack>
            <View style={[styles.item2, isOddIndex ? styles.itemRight : styles.itemLeft]}>

              <View style={[styles.content, { paddingLeft: 10, paddingTop: 30 }]}>
                <Text style={styles.description}>{data[1][0].CollectionType}: {" "}
                  <Text style={styles.infoDesc}>{data[1][0].Amount}</Text></Text>
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
  let [fontsLoaded] = useFonts({
    Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold
  });

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

  if (Object.keys(customerData).length === 0 && orderData.length === 0 && !fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={["rgb(255, 234, 210)", "#ffff", "#ffff", "rgb(255, 234, 210)"]}
      start={{ x: 0.05, y: -8 }}
      end={{ x: 3, y: 3 }}
    >

      <View style={styles.timeline}>
        <CustomerInfo customerData={customerData} />
        <View style={{ width: 300, height: 3, backgroundColor: 'rgb(172, 177, 214)' }} />
        <View style={styles.line} />

        <FlatList
          data={orderData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <TimelineItem item={item} index={index} data={orderData} />}
        />

      </View>
      <InfoBar />
    </LinearGradient>


  );
};

const InfoBar = () => {
  return (
    <View style={{
      position: 'absolute', height: 30,
      width: 180, bottom: 100, left: 10, flexDirection: 'row',
    }}>
      <View style={[styles.info, { backgroundColor: 'rgb(130, 148, 196)', borderBottomLeftRadius: 10, borderTopLeftRadius: 10 }]}>
        <Text style={styles.description}>Ziyaret</Text>
      </View>
      <View style={[styles.info, { backgroundColor: 'rgb(172, 177, 214)' }]}>
        <Text style={styles.description}>Sipariş</Text>
      </View>
      <View style={[styles.info, { backgroundColor: 'rgb(219, 223, 234)', borderBottomRightRadius: 10, borderTopRightRadius: 10 }]}>
        <Text style={styles.description}>Tahsilat</Text>
      </View>
    </View>
  )
}

const CustomerInfo = ({ customerData }) => {
  return (
    <>
      <Text style={{
        paddingTop: 40, alignItems: 'flex-start', fontSize: 18, marginBottom: 8,
        fontFamily: 'Montserrat_700Bold', color: 'rgb(130, 148, 196)'
      }}>{customerData.CustomerName}</Text>
      <View>

        <HStack>
          <Text style={[styles.title]} >Numara: {" "}
            <Text style={styles.infoDesc}>{customerData.CustomerId}</Text>  -</Text>
          <Text style={styles.title}>  Adres: {" "}
            <Text style={styles.infoDesc}>{customerData.CustomerProvince}</Text></Text>
        </HStack>
        <HStack>
          <Text style={[styles.title]}>Bakiye: {" "}
            <Text style={styles.infoDesc}>{customerData.CustomerRisk}</Text>  -</Text>
          <Text style={styles.title}>  Cari Risk: {" "}
            <Text style={styles.infoDesc}>{customerData.CustomerRisk}</Text></Text>
        </HStack>


      </View>
      <Text style={{ fontFamily: 'Montserrat_700Bold', marginTop: 10, marginBottom: 5, color: 'rgb(130, 148, 196)' }} >{customerData.SalesmanId} - {customerData.SalesmanName}</Text></>
  )
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
    width: 5,
    height: '100%',
    backgroundColor: 'rgb(172, 177, 214)',

    position: 'absolute',
    top: 147,
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgb(130, 148, 196)',
    position: 'absolute',
    left: '50%',
    top: 2,
    marginLeft: -20,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(130, 148, 196)',
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
  item1: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(172, 177, 214)',
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
  item2: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: 'rgb(219, 223, 234)',
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
    fontSize: 13,
    marginBottom: 2,
    fontFamily: 'Montserrat_700Bold'
  },
  infoDesc: {
    fontSize: 13,
    marginBottom: 2,

    fontFamily: 'Montserrat_400Regular'
  },
  description: {
    fontSize: 12,
    marginBottom: 2,

    fontFamily: 'Montserrat_600SemiBold'
  },
  timestamp: {
    fontSize: 14,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 10,
    marginBottom: 10,
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    marginTop: 20,
    left: 5,
    marginRight: '50%',
  },

  itemRight: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: 5,
    marginBottom: 10,
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    marginTop: 20,
    right: -10,
    marginLeft: '50%',
  },
});

export default TimelineApp;
