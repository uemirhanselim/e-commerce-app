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

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';

const SwipeScreen = () => (
    <Swiper loop={false} showsPagination={false} index={0}>
      <View style={[styles.screen, {backgroundColor: 'red'}]}>
        <Text>Screen 1</Text>
      </View>
      <View style={styles.screen}>
        <Text>Screen 2</Text>
      </View>
      <View style={styles.screen}>
        <Text>Screen 3</Text>
      </View>
    </Swiper>
  );
  
  const styles = StyleSheet.create({
    screen: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

export default SwipeScreen