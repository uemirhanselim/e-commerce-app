import { View, Text, Pressable, StyleSheet, PixelRatio } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView } from 'react-native'
import { Box, FlatList, HStack, Spacer } from 'native-base'
import { useFonts, Montserrat_500Medium_Italic, Montserrat_700Bold, Montserrat_600SemiBold } from '@expo-google-fonts/montserrat'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons } from '@expo/vector-icons'
import Icon from 'react-native-vector-icons/FontAwesome5';
import { DarkTheme, LightTheme } from '../../constants/ColorTheme'
import BottomSheet from '@gorhom/bottom-sheet';
import { SetVisite, SetOrder, SetPayment, SetStartDate, SetEndDate, SetFilterOn, SetIsSheetOpen } from '../../redux/actions/cardActions'
import { GetStoredTheme } from '../../storage/ThemeStorage'
import BottomSheetButton from '../../components/BottomSheetButton'

const TimelineV2 = ({ customerData, unitDates, paymentList, visitList, orderList }) => {
  // console.log("customer date length", customerData.length)
  // console.log("payment list length", paymentList.length)
  // console.log("visit list length", visitList.length)
  // console.log("order list length", orderList.length)
  // console.log("unit dates length", unitDates.length)

  // const [customerData, setCustomerData] = useState([])
  // const [unitDates, setUnitDates] = useState([])
  // const [paymentList, setPaymentList] = useState([])
  // const [visitList, setVisitList] = useState([])
  // const [orderList, setOrderList] = useState([])
  const navigation = useNavigation()
  const sheetRef = useRef(null)
  const isSheetOpen = useSelector(state => state.IsSheetOpenReducer)
  let [fontsLoaded] = useFonts({
    Montserrat_500Medium_Italic, Montserrat_700Bold, Montserrat_600SemiBold
  });
  const [theme, setTheme] = useState("dark")
  //TODO: set theme from storage 
  //TODO: initialize fonts at home screen

  const getTheme = async () => {
    const th = await GetStoredTheme()
    if (th !== null) {
      setTheme(th)
    } else {
      return
    }
  }

  // useEffect(() => {

  //   // navigation.addListener('focus', () => {
  //   //   getTheme()
  //   // })
  //   postData();
  // }, [theme])


  // const postData = async () => {

  //   try {
  //     const response = await axios.post('http://duyu.alter.net.tr/api/TimelineCustomer', {
  //       token: 'RasyoIoToken2021',
  //       StartDate: '01.01.2023',
  //       EndDate: '10.04.2023',
  //       CustomerId: '120 04 006',
  //       user_token: '$2y$10$x4.gGU7y5jPP9uZ1wdkA0eqfzztRFIYb5.w3QhgaABonC2wWhh3GS',
  //     });
  //     const rp = response.data[2].reverse()

  //     for (let i = 0; i < rp.length; i++) {
  //       if (!unitDates.includes(rp[i].CollectionDate)) {
  //         unitDates.push(rp[i].CollectionDate);
  //       }
  //     }
  //     setCustomerData(response.data);
  //     setPaymentList(response.data[2]);
  //     setVisitList(response.data[3]);
  //     setOrderList(response.data[1]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  if (!fontsLoaded) {
    return <Text> asdşlakdşlklşsakdş </Text>;
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
          <View
            style={[styles.line, {
              backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)',
              opacity: isSheetOpen ? 0.1 : 1
            }]}
          />

          <CustomerInfo customerData={customerData[0]} theme={theme} navigation={navigation} sheetRef={sheetRef} />
          <View style={{ width: 300, height: 3, backgroundColor: theme === "dark" ? 'rgb(172, 177, 214)' : 'rgb(59, 172, 182)' }} />

          <FlatList
            data={unitDates}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => <TimelineItem item={item} index={index} theme={theme}
              paymentList={paymentList} orderList={orderList} visitList={visitList} unitDates={unitDates}
            />}
          />
        </SafeAreaView>
      </LinearGradient>
      <BottomSheetComponent sheetRef={sheetRef} theme={theme} />
    </GestureHandlerRootView>
  )
}

const TimelineItem = ({ item, index, theme, paymentList, orderList, visitList, unitDates }) => {
  const [currentVisitData, setCurrentVisitData] = useState(null)
  const [currentPaymnentData, setCurrentPaymentData] = useState(null)
  const [currentOrderData, setCurrentOrderData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setLists().then(() => setIsLoading(false))
  }, [])

  const setLists = async () => {
    const orderData = orderList.find((order) => order.OrderDate === unitDates[index]);
    const visitData = visitList.find((visit) => visit.VisitDate === unitDates[index]);
    const paymentData = paymentList.find((payment) => payment.CollectionDate === unitDates[index]);
    setCurrentVisitData(visitData || null);
    setCurrentOrderData(orderData || null);
    setCurrentPaymentData(paymentData || null);
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

  let originalOrderDate = unitDates[index];
  const date = new Date(originalOrderDate);

  const isBetween = (currentDate) => {
    if (currentDate > startDate && currentDate < endDate) {
      return true;
    } else {
      return false;
    }
  }


  return (
    <>
      {!isLoading ? <View style={{
        width: '100%', justifyContent: 'center',
        alignItems: 'center', flexDirection: 'column'
      }}>

        {isFilterOn === false ? <BodyItem theme={theme} date={date}
          visite={visite} order={order} payment={payment} formatter={formatter} index={index} currentOrderData={currentOrderData}
          currentPaymnentData={currentPaymnentData} currentVisitData={currentVisitData} unitDates={unitDates}
        /> : isBetween(date) === true ?
          <BodyItem theme={theme} date={date}
            visite={visite} order={order} payment={payment} formatter={formatter} index={index} currentOrderData={currentOrderData}
            currentPaymnentData={currentPaymnentData} currentVisitData={currentVisitData} unitDates={unitDates}
          /> : null
        }
        <Box style={{ height: 200 }} />
      </View> : <View />}
    </>
  );
};


const BodyItem = ({ theme, visite, order, payment, formatter, index, currentOrderData, currentPaymnentData, currentVisitData, unitDates }) => {
  const sTimeString = currentVisitData === null ? null : currentVisitData.StartTime
  const eTimeString = currentVisitData === null ? null : currentVisitData.EndTime
  const formattedSTime = sTimeString !== null ? `${sTimeString.split(':')[0]}.${sTimeString.split(':')[1]}` : null
  const formattedETime = eTimeString !== null ? `${eTimeString.split(':')[0]}.${eTimeString.split(':')[1]}` : null;
  const plasiyerCost = currentOrderData === null ? null : currentOrderData.OrderAmountPriceSalesman
  const formattedPlasiyerCost = plasiyerCost === null ? null : plasiyerCost.toLocaleString('tr-TR', {
    style: 'currency',
    currency: 'TRY',
  });

  const dateFormatter = (date) => {
    return `${date.getDate() < 10 ? '0' : ''}${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${date.getMonth() + 1}.${date.getFullYear()}`;
  }
  return <>
    <View style={[styles.circle, index % 2 === 0 ? {
      borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)',
    } : {
      borderColor: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
    }]}>
      <Text style={[styles.title, { fontSize: 18, color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)' }]}>
        {dateFormatter(new Date(unitDates[index]))}
      </Text>
    </View>

    {currentVisitData !== null ? <HStack marginTop={0}>
      <View style={[theme === "dark" ? styles.darkItem : styles.lightItem, styles.itemRight,
      { display: visite === true ? 'flex' : 'none', marginTop: index === unitDates.length - 1 ? 20 : 20 }
      ]}>
        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%', alignItems: 'center' }]}>
          <Text style={styles.title}>Ziyaret</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.description}>Açıklama</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.infoDesc, { fontSize: 10 }]}>{currentVisitData.Description}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.description}>Ziyaret Saati</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.infoDesc}>{formattedSTime} - {formattedETime}</Text>
          </View>
        </View>

      </View>
    </HStack> : null}
    {currentOrderData !== null ? <HStack>
      <View style={[theme === "dark" ? styles.darkItem1 : styles.lightItem1, styles.itemLeft,
      { display: order === true ? 'flex' : 'none' }
      ]}>
        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%', alignItems: 'center' }]}>
          <Text style={styles.title}>Sipariş</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description]}>Sipariş Tutarı</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.infoDesc}>{formatter(formattedPlasiyerCost)}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description]}>Sistem Sipariş Tutarı</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.infoDesc}>{formatter(currentOrderData.OrderAmountPriceDefault)}</Text>
          </View>
        </View>

      </View>
    </HStack> : null}
    {currentPaymnentData !== null ? <HStack>
      <View style={[theme === "dark" ? styles.darkItem2 : styles.lightItem2, styles.itemRight,
      { display: payment === true ? 'flex' : 'none', marginBottom: 0, marginTop: index === unitDates.length - 1 ? 20 : 0 }
      ]}>

        <View style={[styles.dividedItem, { borderLeftWidth: 0, borderTopWidth: 0, borderBottomWidth: 0, borderRightWidth: 0, width: '100%', alignItems: 'center' }]}>
          <Text style={styles.title}>Tahsilat</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={[styles.description]}>Kredi Kartı</Text>
          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>
            <Text style={styles.infoDesc}>{formatter(currentPaymnentData.Amount)}</Text>
          </View>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <View style={[styles.dividedItem, { borderLeftWidth: 0, borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>

          </View>
          <View style={[styles.dividedItem, { borderRightWidth: 0, borderBottomWidth: 0, width: '50%' }]}>

          </View>
        </View>
      </View>
    </HStack> : null}
    {index === unitDates.length - 1 ? <Box height={150} /> : null}
  </>;
}

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
  const data = customerData[0]
  return (
    <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
      <Text style={{
        paddingTop: 80, alignItems: 'flex-start', fontSize: 18, marginBottom: 8,
        fontFamily: 'Montserrat_700Bold', color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
      }}>{data.CustomerName}</Text>
      <View>
        <HStack>
          <Text style={[styles.title]} >Numara: {" "}
            <Text style={styles.infoDesc}>{data.CustomerId}</Text>  -</Text>
          <Text style={styles.title}>  Adres: {" "}
            <Text style={styles.infoDesc}>{data.CustomerProvince}</Text></Text>
        </HStack>
        <HStack>
          <Text style={[styles.title]}>Bakiye: {" "}
            <Text style={styles.infoDesc}>{data.CustomerRisk}</Text>  -</Text>
          <Text style={styles.title}>  Cari Risk: {" "}
            <Text style={styles.infoDesc}>{data.CustomerRisk}</Text></Text>
        </HStack>
      </View>
      <Text style={{
        fontFamily: 'Montserrat_700Bold', marginTop: 10, marginBottom: 5,
        color: theme === "dark" ? 'rgb(130, 148, 196)' : 'rgb(47, 143, 157)'
      }} >{data.SalesmanId} - {data.SalesmanName}</Text>
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

const fontScale = PixelRatio.getFontScale();
const getFontSize = size => size / fontScale;


const styles = StyleSheet.create({
  dividedItem: {
    borderColor: 'white',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 33,
    paddingLeft: 5,
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
    bottom: 0,
    marginLeft: 0,
  },
  circle: {
    width: 140,
    height: 40,
    borderWidth: 4,
    borderRadius: 10,
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


  },
  darkItem1: {
    flexDirection: 'column',
    backgroundColor: DarkTheme.item1,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

  },
  darkItem2: {
    flexDirection: 'column',
    backgroundColor: DarkTheme.item2,
    borderRadius: 10,
    width: '100%',
    height: 100,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,

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
    fontSize: getFontSize(10),
    marginBottom: 2,
    textAlign: 'left',
    fontFamily: 'Montserrat_600SemiBold'
  },
  timestamp: {
    fontSize: 14,
  },
  itemLeft: {
    alignItems: 'flex-start',
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    left: 0,
    marginRight: '52%',
  },

  itemRight: {
    alignItems: 'flex-start',
    borderRadius: 10,
    width: '46%',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 0,
    right: -5,
    marginLeft: '48%',
  },
});

export default TimelineV2