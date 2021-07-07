import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import { Input } from 'react-native-elements'
import NumberFormat from 'react-number-format'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function KmNotification(props) {
  const [carMeter, setCarMeter] = useState('')
  const [note, setNote] = useState('')

  useEffect(() => {
    const notification = {
      created_at: new Date(),
      type: 'km',
      note: note,
      km: carMeter.replace(/,/g, ''),
      date: ''
    }
    props.handleNotification(notification)
  }, [carMeter, note])

  return (
    <View style={styles.container}>
      <NumberFormat
        value={carMeter}
        displayType={'text'}
        thousandSeparator={true}
        renderText={value => (
          <Input
            label='Χιλιόμετρα (km)'
            placeholder='π.χ. 12.000'
            leftIcon={<Icon name='speedometer' size={24} color='black' />}
            onChangeText={setCarMeter}
            value={value}
            keyboardType={'numeric'}
          />
        )}
      />

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
