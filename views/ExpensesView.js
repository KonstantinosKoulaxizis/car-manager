import React, { useState } from 'react'

import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import DatePicker from '../components/DatePicker'

import MainFilter from '../components/expenses/MainFilter'
export default function MockService(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleData = d => {
    setData(d)
  }

  const handleLoading = l => {
    setLoading(l)
  }
  return (
    <View style={styles.container}>
      <MainFilter handleData={handleData} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
    // alignItems: 'center'
    // justifyContent: 'space-between'
    // justifyContent: 'center'
  }
})
