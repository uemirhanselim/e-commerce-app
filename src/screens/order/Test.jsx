import { View, Text, Dimensions } from 'react-native'
import React from 'react'

const Test = ({ label }) => {
    return (
        <View style={{
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height, justifyContent: 'center', alignItems: 'center'
        }}>
            <Text>{label}</Text>
        </View>
    )
}

export default Test