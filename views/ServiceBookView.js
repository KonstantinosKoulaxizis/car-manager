import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

import SericeBookList from '../components/serviceBook/SericeBookList'

export default function ServiceBookView() {
  const [activeTab, setActiveTab] = useState('book')
  const [serviceTablesData, setServiceTablesData] = useState([])
  const [loading, seLoading] = useState(true)

  const handleTablesData = async () => {
    const carEventsRaw = await AsyncStorage.getItem('car_events')
    const servicesArr = []

    if (carEventsRaw && carEventsRaw.length) {
      const carEvents = JSON.parse(carEventsRaw)

      carEvents.forEach(i => {
        if ((i.type && i.type == 'service') || i.type == 'tires') {
          servicesArr.push(i)
        }
      })
      const servicesArrFormated = servicesArr.sort(
        (a, b) => new moment(b.date).format('YYYYMMDD') - new moment(a.date).format('YYYYMMDD')
      )
      setServiceTablesData(servicesArrFormated)
    }
    seLoading(false)
  }


  useEffect(() => {
    handleTablesData()
    setActiveTab('book')
  }, [])

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size='large' color='#3c4689' />
        </View>
      ) : (
        <>
          {activeTab === 'book' && (
            <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
              <SericeBookList data={serviceTablesData} />
            </View>
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 40,
    marginBottom: 80
  }
})
