import React, { useEffect, useState } from 'react'

import NumberFormat from 'react-number-format'
import { StyleSheet, ScrollView } from 'react-native'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import DatePicker from '../DatePicker'
import ModalButtons from './ModalButtons'

export default function FumesType(props) {
  const [carMeter, setCarMeter] = useState('')
  const [eventDate, setEventDate] = useState(new Date())
  const [dateError, setDateError] = useState(false)
  const [finalCost, setFinalCost] = useState('')
  const [newItem, setNewItem] = useState({})

  const handleDate = date => {
    setEventDate(date)
  }

  const handleDateError = state => {
    setDateError(state)
  }

  const handleEvent = () => {
    if (props.item) {
      setEventDate(props.item.date)
      setCarMeter(props.item.km)
      setFinalCost(props.item.cost)
    }
  }

  const handleItem = () => {
    // TODO handle error
    const i = {
      cost: finalCost,
      date: eventDate,
      km: carMeter,
      type: props.item.type
    }
    setNewItem(i)
  }

  useEffect(() => {
    handleEvent()
  }, [])

  useEffect(() => {
    handleItem()
  }, [carMeter, eventDate, finalCost])

  return (
    <ScrollView style={styles.container}>
      <DatePicker
        handleDate={handleDate}
        handleDateError={handleDateError}
        editItem={props.editItem}
      />

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
            disabled={!props.editItem}
          />
        )}
      />

      <Input
        label='Κόστος (€)'
        leftIcon={<Icon name='cash-register' size={24} color='black' />}
        onChangeText={value => setFinalCost(value)}
        value={finalCost}
        keyboardType={'numeric'}
        disabled={!props.editItem}
      />

      <ModalButtons
        editItem={props.editItem}
        handleEditItem={props.handleEditItem}
        item={newItem}
        itemsIndex={props.itemsIndex}
        handleRefresh={props.handleRefresh}
        handleModalStatus={props.handleModalStatus}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
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
  },
  registerButton: {
    // width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  closeButtonBig: {
    // width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#bf1e2d'
  }
})
