import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'

import DatePicker from '../DatePicker'

export default function DateNotification(props) {
  const [eventDate, setEventDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [note, setNote] = useState('')

  const handleDate = date => {
    setEventDate(date)
  }

  const handleDateError = state => {
    setDateError(state)
  }

  useEffect(() => {
    const notification = {
      created_at: new Date(),
      type: 'date',
      note: note,
      km: '',
      date: eventDate
    }
    props.handleNotification(notification)
  }, [eventDate, note])

  return (
    <View style={styles.container}>
      <DatePicker handleDate={handleDate} handleDateError={handleDateError} editItem={true} />

      <Text style={{ fontSize: 18, color: '#86939e', fontWeight: 'bold', textAlign: 'left' }}>
        Σημείωση ειδοποίησης
      </Text>
      <View style={styles.textAreaContainer}>
        <TextInput
          value={note}
          onChangeText={text => setNote(text)}
          mode='outlined'
          multiline
          numberOfLines={5}
          theme={{ colors: { primary: '#2f3c91' } }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 32
  },
  textAreaContainer: {
    padding: 5,
    width: '90%'
  }
})
