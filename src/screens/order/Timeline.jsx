import { Box, HStack, Pressable, Spacer, VStack } from 'native-base';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import axios from 'axios'
import { LinearGradient } from 'expo-linear-gradient'
import { useFonts, Montserrat_500Medium_Italic, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import { Ionicons } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { GetStoredTheme } from '../../storage/ThemeStorage'
import { useDispatch, useSelector } from 'react-redux';
import { SetVisite, SetOrder, SetPayment, SetStartDate, SetEndDate, SetFilterOn, SetIsSheetOpen } from '../../redux/actions/cardActions'
import DateTimePicker from '@react-native-community/datetimepicker';
import { DarkTheme, LightTheme } from '../../constants/ColorTheme'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import BottomSheetButton from '../../components/BottomSheetButton';


const TimelineItem = ({ item, index, data, theme }) => {

  const originalCollectionDate = data[1][0].CollectionDate;
  const collectionDate = new Date(originalCollectionDate);
  const dateFormatter = (date) => {
    return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  const formatter = (text) => {
    return text.toLocaleString('tr-TR', {
      style: 'currency',
      currency: 'TRY',
    });
  }

  const visite = useSelector(state => state.VisiteReducer)
  const order = useSelector(state => state.OrderReducer)
  const payment = useSelector(state => state.PaymentReducer)
  const startDate = useSelector(state => state.StartDateReducer)
  const endDate = useSelector(state => state.EndDateReducer)
  const isFilterOn = useSelector(state => state.FilterOnReducer)

  let originalOrderDate = data[0][0].OrderDate;
  const date = new Date(originalOrderDate);

  const isBetween = (currentDate) => {
    if (currentDate > startDate && currentDate < endDate) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <VStack style={{
      width: '100%', marginBottom: 50, justifyContent: 'center',
      alignItems: 'center'
    }}>
      {isFilterOn === false ? (index === 0 ? BodyItem(theme, dateFormatter, date, visite, order, payment, formatter, data, 1)

        : index === 1 ? BodyItem(theme, dateFormatter, collectionDate, visite, order, payment, formatter, data, 0) : <></>) :
        isBetween(date) === true && isBetween(collectionDate) === true ? (index === 0 ? BodyItem(theme, dateFormatter, date, visite, order, payment, formatter, data, 1)

          : index === 1 ? BodyItem(theme, dateFormatter, collectionDate, visite, order, payment, formatter, data, 0) : <></>) :
          isBetween(date) === true && isBetween(collectionDate) === false ? (index === 0 ? BodyItem(theme, dateFormatter, date, visite, order, payment, formatter, data, 1)

            : <></>) :
            isBetween(date) === false && isBetween(collectionDate) === true ? (index === 1 ? BodyItem(theme, dateFormatter, collectionDate, visite, order, payment, formatter, data, 0) : <></>) :
              <></>
      }
      <Box style={{ height: 200 }} />
    </VStack>
  );
};


const Timeline = () => {
  const [customerData, setCustomerData] = useState({})
  const [orderData, setOrderData] = useState([])
  const navigation = useNavigation()
  const [theme, setTheme] = useState("dark")
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium_Italic, Montserrat_700Bold, Montserrat_600SemiBold
  });
  const sheetRef = useRef(null)
  const isSheetOpen = useSelector(state => state.IsSheetOpenReducer)

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
    <GestureHandlerRootView>
      <LinearGradient
        colors={theme === "dark" ? ["rgb(255, 234, 210)", "#ffff", "#ffff", "rgb(255, 234, 210)"] :
          ['rgb(179, 232, 229)', "#ffff", "#ffff", 'rgb(179, 232, 229)']}
        start={{ x: 0.05, y: -8 }}
        end={{ x: 3, y: 3 }}
      >

        <SafeAreaView style={[styles.timeline, { opacity: isSheetOpen ? 0.3 : 1 }]}>
          <View style={[styles.line, { backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)' }]} />
          <CustomerInfo customerData={customerData} theme={theme} navigation={navigation} sheetRef={sheetRef} />
          <View style={{ width: 300, height: 3, backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)' }} />


          <FlatList
            data={orderData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <TimelineItem item={item} index={index} data={orderData} theme={theme} />}
          />

        </SafeAreaView>

      </LinearGradient>
      <BottomSheetComponent sheetRef={sheetRef} theme={theme} />
    </GestureHandlerRootView>


  );
};

const InfoBar = ({ theme, navigation, sheetRef }) => {
  const dispatch = useDispatch()
  const visite = useSelector(state => state.VisiteReducer)
  const order = useSelector(state => state.OrderReducer)
  const payment = useSelector(state => state.PaymentReducer)

  const handleSnapPress = useCallback((index) => {
    sheetRef.current?.snapToIndex(index);
    dispatch(SetIsSheetOpen(true))
  })

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

      <View style={{ flexDirection: 'row' }}>
        <Pressable onPress={() => handleSnapPress(0)} marginRight={2}>

          <Icon name="sliders-h" size={28} color={theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'} />
        </Pressable>
        <Pressable onPress={() => navigation.navigate("Theme")}>


          <Ionicons name='settings-sharp' size={28} color={theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'} />
        </Pressable>
      </View>
    </HStack>
  )
}

const CustomerInfo = ({ customerData, theme, navigation, sheetRef }) => {
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
      <InfoBar theme={theme} navigation={navigation} sheetRef={sheetRef} />
    </View>
  )
}

const BottomSheetComponent = ({ sheetRef, theme }) => {
  const [showStartDatePicker, setShowStartDatePicker] = useState(false)
  const [showEndDatePicker, setShowEndDatePicker] = useState(false)
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const isFilterOn = useSelector(state => state.FilterOnReducer)
  const dispatch = useDispatch()
  const tolerance = 100000;
  const snapPoints = ['80%']
  const dateFormatter = (date) => {
    return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`;
  }

  function clearOnPress() {
    sheetRef.current.close()
    dispatch(SetIsSheetOpen(false))
    dispatch(SetFilterOn(false))
    dispatch(SetEndDate(new Date()))
    dispatch(SetStartDate(new Date()))
    setStartDate(new Date())
    setEndDate(new Date())
  }

  function filterOnPress() {
    sheetRef.current.close()
    dispatch(SetIsSheetOpen(false))
    dispatch(SetFilterOn(true))
    dispatch(SetEndDate(endDate))
    dispatch(SetStartDate(startDate))
  }

  return (
    <BottomSheet
      ref={sheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
      onClose={() => {
        dispatch(SetIsSheetOpen(false))
      }}
      backgroundStyle={{ backgroundColor: theme === "dark" ? 'rgb(172, 147, 214)' : 'rgb(100, 172, 182)', }}
    >
      <SafeAreaView style={{ flex: 1, margin: 10, justifyContent: 'space-between', alignItems: 'flex-start', flexDirection: 'column' }}>
        <View>
          <Text style={[styles.title, { color: 'white', fontSize: 16, marginBottom: 10 }]}>Tarih Aralığı</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Pressable onPress={() => setShowStartDatePicker(true)} style={{ width: '47%', marginRight: 5 }}>
              <View style={{
                borderWidth: 1, borderRadius: 10, width: '100%', height: 40, justifyContent: 'space-between',
                alignItems: 'center', borderColor: 'white', flexDirection: 'row', paddingHorizontal: 5,
              }}>
                {Math.abs(startDate.getTime() - new Date().getTime()) <= tolerance
                  ? <Text style={[styles.dscBar, { paddingLeft: 5, color: 'white', fontSize: 12 }]}>Başlangıç Tarihi</Text>
                  : <Text style={[styles.dscBar, { paddingLeft: 5, color: 'white', fontSize: 12 }]}>{dateFormatter(startDate)}</Text>
                }
                <Ionicons name='calendar' size={18} color='white' />
              </View>
            </Pressable>
            <View style={{ height: 2, width: '2%', backgroundColor: 'white' }}></View>
            <Pressable onPress={() => setShowEndDatePicker(true)} style={{ width: '47%', marginLeft: 5 }}>
              <View style={{
                borderWidth: 1, borderRadius: 10, width: '100%', height: 40, justifyContent: 'space-between',
                alignItems: 'center', borderColor: 'white', flexDirection: 'row', paddingHorizontal: 5,
              }}>
                {Math.abs(endDate.getTime() - new Date().getTime()) <= tolerance
                  ? <Text style={[styles.dscBar, { paddingLeft: 5, color: 'white', fontSize: 12 }]}>Bitiş Tarihi</Text>
                  : <Text style={[styles.dscBar, { paddingLeft: 5, color: 'white', fontSize: 12 }]}>{dateFormatter(endDate)}</Text>
                }
                <Ionicons name='calendar' size={18} color='white' />
              </View>
            </Pressable>
          </View>
        </View>
        <View style={{ flexDirection: 'row', flex: 0.25 }}>
          <BottomSheetButton label={"Temizle"} theme={theme} onPress={clearOnPress} />
          <Spacer />
          <BottomSheetButton label={"Filtrele"} theme={theme} onPress={filterOnPress}
            isActive={(Math.abs(endDate.getTime() - new Date().getTime()) <= tolerance) === false &&
              (Math.abs(startDate.getTime() - new Date().getTime()) <= tolerance) === false
            } />
        </View>

      </SafeAreaView>


      {showEndDatePicker && (<DateTimePicker
        mode='date'
        display='spinner'
        value={endDate}
        onChange={(event, selectedDate) => {

          if (event?.type === 'dismissed') {
            setShowEndDatePicker(false)
            return;
          } else {
            setShowEndDatePicker(false)
            setEndDate(selectedDate)

          }


        }}
      />)}

      {showStartDatePicker && (<DateTimePicker
        mode='date'
        display='spinner'
        value={startDate}
        onChange={(event, selectedDate) => {

          if (event?.type === 'dismissed') {
            setShowStartDatePicker(false)
            return;
          } else {
            setShowStartDatePicker(false)
            setStartDate(selectedDate)
          }


        }}
      />)}

    </BottomSheet>
  )
}

export default Timeline;


function BodyItem(theme, dateFormatter, collectionDate, visite, order, payment, formatter, data, firstItem) {
  const sTimeString = data[2][0].StartTime
  const eTimeString = data[2][0].EndTime
  const formattedSTime = `${sTimeString.split(':')[0]}.${sTimeString.split(':')[1]}`;
  const formattedETime = `${eTimeString.split(':')[0]}.${eTimeString.split(':')[1]}`;
  const plasiyerCost = data[0][0].OrderAmountPriceSalesman
  const formattedPlasiyerCost = plasiyerCost.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });
  return <>


    <View style={[styles.circle, firstItem !== 1 ? {
      borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)',
      marginTop: -100
    } : {
      borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
    }]}>
      <Text style={[styles.title, { fontSize: 18, color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>{dateFormatter(collectionDate)}</Text>
    </View>

    <HStack marginTop={firstItem !== 1 ? -12 : 12}>
      <View style={[theme === "dark" ? styles.darkItem : styles.lightItem, styles.itemRight,
      { display: visite === true ? 'flex' : 'none' }
      ]}>
        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
          <Text style={styles.description}>Ziyaret</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.description}>Açıklama:</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            {firstItem === 1 ? <Text style={[styles.infoDesc, { textAlign: 'center', fontSize: 10 }]}>{data[2][0].Description}</Text> : null}
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.description}>Ziyaret Saati:</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            {firstItem === 1 ? <Text style={styles.infoDesc}>{formattedSTime} - {formattedETime}</Text> : null}
          </View>
        </View>

      </View>
    </HStack>
    <HStack>
      <View style={[theme === "dark" ? styles.darkItem1 : styles.lightItem1, styles.itemLeft,
      { display: order === true ? 'flex' : 'none' }
      ]}>
        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
          <Text style={styles.description}>Sipariş</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description, { textAlign: 'center' }]}>Plasiyerin Tutarı:</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(formattedPlasiyerCost)}</Text> : null}
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description, { textAlign: 'center' }]}>Sipariş Tutarı:</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(data[0][0].OrderAmountPriceDefault)}</Text> : null}
          </View>
        </View>

      </View>
    </HStack>
    <HStack>
      <View style={[theme === "dark" ? styles.darkItem2 : styles.lightItem2, styles.itemRight,
      { display: payment === true ? 'flex' : 'none', marginBottom: 0 }
      ]}>

        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%' }]}>
          <Text style={styles.description}>Tahsilat</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description, { textAlign: 'center' }]}>Kredi Kartı:</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            {firstItem === 1 ? <Text style={styles.infoDesc}>{formatter(data[1][1].Amount)}</Text> :
              <Text style={styles.infoDesc}>{formatter(data[1][0].Amount)}</Text>}
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>

          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>

          </View>
        </View>
      </View>
    </HStack>
  </>;
}

const styles = StyleSheet.create({
  dividedItem: {
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 33,
  },
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
    flexDirection: 'column',
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
    flexDirection: 'column',
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
    flexDirection: 'column',
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
    flexDirection: 'column',
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
    flexDirection: 'column',
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
    flexDirection: 'column',
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
    fontSize: 11,
    marginBottom: 2,
    color: 'black',
    fontFamily: 'Montserrat_500Medium_Italic'
  },
  dscBar: {
    fontSize: 10,
    marginBottom: 2,
    textAlign: 'center',
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
    alignItems: 'flex-start',
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
    alignItems: 'flex-start',
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


