import React, { useState } from 'react'

import { StyleSheet, View } from 'react-native'

import MainFilter from '../components/expenses/MainFilter'
export default function MockService(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('')

  const handleData = d => {
    setData(d)
  }

  const handleLoading = l => {
    setLoading(l)
  }

  const handleActiveTab = type => {
    setActiveTab(type)
  }

  return (
    <View style={styles.container}>
      <MainFilter handleData={handleData} handleActiveTab={handleActiveTab} />
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
