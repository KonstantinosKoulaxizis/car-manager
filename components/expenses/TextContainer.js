import React, { useEffect, useState } from 'react'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, Text, View } from 'react-native'

export default function TextContainer(props) {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())

  const handleDates = async () => {
    const carEventsRaw = await AsyncStorage.getItem('car_events')
    const carEvents = JSON.parse(carEventsRaw)

    const startDateRaw = await AsyncStorage.getItem('starting_date')
    const startDateFormated = JSON.parse(startDateRaw)

    if (startDateFormated) {
      setStartDate(startDateFormated)
    }

    if (carEvents && carEvents[0] && carEvents[0].date) {
      setEndDate(carEvents[0].date)
    }
  }

  useEffect(() => {
    handleDates()
  }, [])
  return (
    <View style={styles.textContainer}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -10, marginBottom: 10 }}>
        {props.selectedType.title}
      </Text>
      <Text style={styles.textStyle}>Από: {moment(startDate).format('DD-MM-YYYY')}</Text>
      <Text style={styles.textStyle}>Έως: {moment(endDate).format('DD-MM-YYYY')}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  textContainer: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#dce0f2',
    padding: 15,
    borderRadius: 15
  },
  textStyle: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#3c4743'
  }
})
