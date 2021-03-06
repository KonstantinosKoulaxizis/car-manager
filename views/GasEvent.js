import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NumberFormat from 'react-number-format'
import { Snackbar } from 'react-native-paper'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import DatePicker from '../components/DatePicker'
import EventUtils from '../utils/EventUtils'

export default function GasEvent(props) {
  const [carMeter, setCarMeter] = useState('')
  const [eventDate, setEventDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [literPrice, setLiterPrice] = useState('')
  const [finalCost, setFinalCost] = useState('')
  const [visible, setVisible] = useState(false)

  const onDismissSnackBar = () => setVisible(false)

  const handleDate = date => {
    setEventDate(date)
  }

  const handleDateError = state => {
    setDateError(state)
  }

  const handleAddGasEvent = async () => {
    if (!dateError && carMeter.length && literPrice.length && finalCost.length) {
      const newEvent = {
        date: eventDate,
        km: carMeter,
        liters: (Number(finalCost) / Number(literPrice)).toFixed(3),
        price: literPrice,
        cost: finalCost,
        type: 'gas'
      }

      await EventUtils.addEvent(newEvent)
      props.handleRefresh()
      props.navigation.navigate('main')
    } else {
      setVisible(true)
    }
  }

  const handleUsersKm = async () => {
    const carInfoRaw = await AsyncStorage.getItem('carInfo')
    const carInfoObj = JSON.parse(carInfoRaw)

    if (carInfoObj && carInfoObj.km) {
      setCarMeter(carInfoObj.km)
    }
  }

  useEffect(() => {
    handleUsersKm()
  }, [])

  return (
    <ScrollView style={styles.container}>
      <DatePicker handleDate={handleDate} handleDateError={handleDateError} editItem={true} />

      <NumberFormat
        value={carMeter}
        displayType={'text'}
        thousandSeparator={true}
        renderText={value => (
          <Input
            label='???????????????????? (km)'
            leftIcon={<Icon name='speedometer' size={24} color='black' />}
            onChangeText={setCarMeter}
            value={value}
            keyboardType={'numeric'}
          />
        )}
      />

      <Input
        label='???????? ???????????? (???)'
        leftIcon={<Icon name='gas-station' size={24} color='black' />}
        onChangeText={value => setLiterPrice(value)}
        value={literPrice}
        keyboardType={'numeric'}
      />
      <Input
        label='???????????? (???)'
        leftIcon={<Icon name='cash-register' size={24} color='black' />}
        onChangeText={value => setFinalCost(value)}
        value={finalCost}
        keyboardType={'numeric'}
      />
      <View>
        <Button
          title='????????????????????'
          buttonStyle={styles.registerButton}
          containerStyle={{ marginTop: 30, borderRadius: 25 }}
          icon={<Icon name='content-save' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />}
          onPress={handleAddGasEvent}
        />
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        theme={{ colors: { accent: '#bf1e2d' } }}
        action={{
          label: '????????????????',
          onPress: () => {
            onDismissSnackBar
          }
        }}
      >
        ???????????????? ?????????????????????? ?????? ???? ??????????
      </Snackbar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 40
  },
  textField: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  },
  registerButton: {
    width: '100%',
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  }
})
