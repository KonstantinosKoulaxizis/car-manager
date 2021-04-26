import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NumberFormat from 'react-number-format'
import { Snackbar } from 'react-native-paper'
import { StyleSheet, View, ScrollView, Text } from 'react-native'
import { Input, Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import DropDownPicker from 'react-native-dropdown-picker'

import DatePicker from '../components/DatePicker'
import EventUtils from '../utils/EventUtils'
import ServiceTypes from '../utils/ServiceTypes'
import AddServiceEvents from '../components/AddServiceEvents'

export default function ServiceEvent(props) {
  const [carMeter, setCarMeter] = useState('')
  const [eventDate, setEventDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [visible, setVisible] = useState(false)
  const [serviceArray, setServiceArray] = useState([])
  const [finalCost, setFinalCost] = useState('')

  const onDismissSnackBar = () => setVisible(false)

  const handleDate = date => {
    setEventDate(date)
  }

  const handleDateError = state => {
    setDateError(state)
  }

  const handleAddGasEvent = async () => {
    if (!dateError && carMeter.length && finalCost && finalCost.length && serviceArray.length > 0) {
      const newEvent = {
        date: eventDate,
        km: carMeter,
        cost: finalCost,
        services: serviceArray,
        type: 'service'
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

  const handleAddEvent = arr => {
    setServiceArray(arr)
  }

  const handleIsDisabled = () => {
    if (!dateError && carMeter.length && finalCost && finalCost.length && serviceArray.length > 0) {
      return false
    } else {
      return true
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
            label='Χιλιόμετρα (km)'
            leftIcon={<Icon name='speedometer' size={24} color='black' />}
            onChangeText={setCarMeter}
            value={value}
            keyboardType={'numeric'}
          />
        )}
      />
      <AddServiceEvents handleAddEvent={handleAddEvent} serviceArray={serviceArray} />

      {serviceArray && serviceArray.length > 0 ? (
        <>
          <Text style={{ fontWeight: 'bold', fontSize: 15, alignSelf: 'center', marginBottom: 20 }}>
            {serviceArray.join(' - ')}
          </Text>
          <Input
            label='Κόστος (€)'
            leftIcon={
              <Icon name='cash-register' size={24} color={serviceArray.length ? 'black' : 'grey'} />
            }
            onChangeText={value => setFinalCost(value)}
            value={finalCost}
            keyboardType={'numeric'}
            disabled={!serviceArray.length}
          />
        </>
      ) : (
        <Text style={{ color: '#ee3e54' }}>* Παρακαλώ επιλέξτε μια η περισσότερες εργασίες</Text>
      )}

      <View>
        <Button
          title='Αποθήκευση'
          buttonStyle={styles.registerButton}
          containerStyle={{ paddingTop: 30, paddingBottom: 40, borderRadius: 25 }}
          icon={<Icon name='content-save' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />}
          onPress={handleAddGasEvent}
          disabled={handleIsDisabled()}
        />
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        theme={{ colors: { accent: '#ee3e54' } }}
        action={{
          label: 'close',
          onPress: () => {
            onDismissSnackBar
          }
        }}
      >
        Παρακαλώ συμπληρώστε όλα τα πεδία
      </Snackbar>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20,
    height: 'auto'
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
