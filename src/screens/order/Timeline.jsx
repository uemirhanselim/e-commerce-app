import { Box, HStack, Pressable, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Montserrat_400Regular, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { DarkTheme, LightTheme } from '../../constants/ColorTheme'
import { GetStoredTheme } from '../../storage/ThemeStorage'
import { useDispatch, useSelector } from 'react-redux';
import { SetVisite, SetOrder, SetPayment } from '../../redux/actions/cardActions'

const TimelineItem = ({ item, index, data, theme }) => {
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

  const visite = useSelector(state => state.VisiteReducer)
  const order = useSelector(state => state.OrderReducer)
  const payment = useSelector(state => state.PaymentReducer)
  return (
    <VStack style={{
      width: '100%', marginBottom: 50, justifyContent: 'center',
      alignItems: 'center'
    }}>
      {index === 0 ? <>

        <View style={[styles.circle, { borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>

          <Text style={[styles.title, { fontSize: 18, color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>
            {formattedOrderDate}</Text>
        </View>

        <HStack marginTop={10}>
          <View style={[theme === "dark" ? styles.darkItem : styles.lightItem, isOddIndex ? styles.itemLeft : styles.itemRight,
          { display: visite === true ? 'flex' : 'none' }]}>

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
          <View style={[theme === "dark" ? styles.darkItem1 : styles.lightItem1, isOddIndex ? styles.itemLeft : styles.itemLeft,
          { display: order === true ? 'flex' : 'none' }
          ]}>

            <View style={[styles.content, { paddingTop: 10, paddingLeft: 10 }]}>
              <Text style={styles.description}>Plasiyerin Sipariş Tutarı: {" "}
                <Text style={styles.infoDesc}>{data[0][0].OrderAmountPriceSalesman}</Text></Text>
              <Text style={styles.description}>Sipariş Tutarı: {" "}
                <Text style={styles.infoDesc}>{data[0][0].OrderAmountPriceDefault}</Text></Text>
            </View>
          </View>
        </HStack>
        <HStack>
          <View style={[theme === "dark" ? styles.darkItem2 : styles.lightItem2, isOddIndex ? styles.itemLeft : styles.itemRight,
          { display: payment === true ? 'flex' : 'none' }
          ]}>

            <View style={[styles.content, { paddingLeft: 10, paddingTop: 30 }]}>
              <Text style={styles.description}>{data[1][1].CollectionType}: {" "}
                <Text style={styles.infoDesc}>{data[1][1].Amount}</Text></Text>
            </View>
          </View>
        </HStack>
      </>

        : index === 1 ? <>


          <View style={[styles.circle, { borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>
            <Text style={[styles.title, { fontSize: 18, color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>{formattedCollectionDate}</Text>
          </View>

          <HStack marginTop={10}>
            <View style={[theme === "dark" ? styles.darkItem : styles.lightItem, isOddIndex ? styles.itemRight : styles.itemLeft,
            { display: visite === true ? 'flex' : 'none' }
            ]}>


            </View>
          </HStack>
          <HStack>
            <View style={[theme === "dark" ? styles.darkItem1 : styles.lightItem1, isOddIndex ? styles.itemLeft : styles.itemLeft,
            { display: order === true ? 'flex' : 'none' }
            ]}>


            </View>
          </HStack>
          <HStack>
            <View style={[theme === "dark" ? styles.darkItem2 : styles.lightItem2, isOddIndex ? styles.itemRight : styles.itemLeft,
            { display: payment === true ? 'flex' : 'none' }
            ]}>

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


const Timeline = () => {
  const [customerData, setCustomerData] = useState({})
  const [orderData, setOrderData] = useState([])
  const navigation = useNavigation()
  const [theme, setTheme] = useState("dark")
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

  const getTheme = async () => {
    const th = await GetStoredTheme()
    if (th !== null) {
      setTheme(th)
    } else {
      return
    }
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      getTheme()
    })
    postData();
  }, [theme])

  if (Object.keys(customerData).length === 0 && orderData.length === 0 && !fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient
      colors={theme === "dark" ? ["rgb(255, 234, 210)", "#ffff", "#ffff", "rgb(255, 234, 210)"] :
        ['rgb(179, 232, 229)', "#ffff", "#ffff", 'rgb(179, 232, 229)']}
      start={{ x: 0.05, y: -8 }}
      end={{ x: 3, y: 3 }}
    >

      <View style={styles.timeline}>
        <View style={[styles.line, { backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)' }]} />
        <CustomerInfo customerData={customerData} theme={theme} navigation={navigation} />
        <View style={{ width: 300, height: 3, backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)' }} />


        <FlatList
          data={orderData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => <TimelineItem item={item} index={index} data={orderData} theme={theme} />}
        />

      </View>
    </LinearGradient>


  );
};

const InfoBar = ({ theme, navigation }) => {
  const dispatch = useDispatch()
  const visite = useSelector(state => state.VisiteReducer)
  const order = useSelector(state => state.OrderReducer)
  const payment = useSelector(state => state.PaymentReducer)
  return (
    <HStack style={{ top: 35, justifyContent: 'space-between', width: '100%', paddingHorizontal: 20, position: 'absolute' }}>
      <View style={{
        height: 30,

        width: 220, flexDirection: 'row',
      }}>
        <View style={[visite === true && order === false && payment === false ? styles.unselectedInfo : styles.info, {
          backgroundColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)',
          borderBottomLeftRadius: 10, borderTopLeftRadius: 10,
        }]}>
          <Text style={styles.dscBar} onPress={() => {
            if (visite === true && order === false && payment === false) {
              dispatch(SetOrder(true))
              dispatch(SetPayment(true))
            } else {
              dispatch(SetVisite(true))
              dispatch(SetOrder(false))
              dispatch(SetPayment(false))
            }
          }}>Ziyaret</Text>
        </View>
        <View style={[visite === false && order === true && payment === false ? styles.unselectedInfo : styles.info, {
          backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)',
        }]}>
          <Text style={styles.dscBar} onPress={() => {
            if (visite === false && order === true && payment === false) {
              dispatch(SetVisite(true))
              dispatch(SetPayment(true))
            } else {
              dispatch(SetVisite(false))
              dispatch(SetOrder(true))
              dispatch(SetPayment(false))
            }
          }}>Sipariş</Text>
        </View>
        <View style={[visite === false && order === false && payment === true ? styles.unselectedInfo : styles.info, {
          backgroundColor: theme === "dark" ? 'rgb(219, 223, 234)' : 'rgb(130, 219, 216)',
          borderBottomRightRadius: 10, borderTopRightRadius: 10,
        }]}>
          <Text style={styles.dscBar} onPress={() => {
            if (visite === false && order === false && payment === true) {
              dispatch(SetOrder(true))
              dispatch(SetVisite(true))
            } else {
              dispatch(SetVisite(false))
              dispatch(SetOrder(false))
              dispatch(SetPayment(true))
            }
          }}>Tahsilat</Text>
        </View>
      </View>
      <Pressable onPress={() => navigation.navigate("Theme")}>


        <Ionicons name='settings-outline' size={28} color={theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'} />
      </Pressable>
    </HStack>
  )
}

const CustomerInfo = ({ customerData, theme, navigation }) => {
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>

      <Text style={{
        paddingTop: 80, alignItems: 'flex-start', fontSize: 18, marginBottom: 8,
        fontFamily: 'Montserrat_700Bold', color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
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
      <Text style={{
        fontFamily: 'Montserrat_700Bold', marginTop: 10, marginBottom: 5,
        color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
      }} >{customerData.SalesmanId} - {customerData.SalesmanName}</Text>
      <InfoBar theme={theme} navigation={navigation} />
    </View>
  )
}

const styles = StyleSheet.create({
  info: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  unselectedInfo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgb(81 102 207)',
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

    position: 'absolute',
    top: '19%',
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 140,
    height: 40,
    borderWidth: 4,
    borderRadius: 10,
    position: 'absolute',
    backgroundColor: 'white',
    top: 5,
    marginTop: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: LightTheme.item,
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
  lightItem1: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: LightTheme.item1,
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
  lightItem2: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: LightTheme.item2,
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
  darkItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: DarkTheme.item,
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
  darkItem1: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: DarkTheme.item1,
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
  darkItem2: {
    flexDirection: 'row',
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: DarkTheme.item2,
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
  dscBar: {
    fontSize: 10,
    marginBottom: 2,

    fontFamily: 'Montserrat_600SemiBold'
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
    left: 0,
    marginRight: '52%',
  },

  itemRight: {
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
    right: -5,
    marginLeft: '48%',
  },
});

export default Timeline;
