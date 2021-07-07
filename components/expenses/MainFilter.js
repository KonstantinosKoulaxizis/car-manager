import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, Text, View, Modal } from 'react-native'
import { Button } from 'react-native-elements'

import TimeFilter from './TimeFilter'
import TextContainer from './TextContainer'
import TypeButtons from './TypeButtons'

const OPTIONS = [
  { title: 'Συνολικά', type: 'no_filter', name: 'filter-variant-remove' },
  { title: 'Ανεφοδιασμός', type: 'gas', name: 'gas-station' },
  { title: 'Service', type: 'service', name: 'wrench' },
  { title: 'KTEO', type: 'kteo', name: 'car-settings' },
  { title: 'Κάρτα Καυσαερίων', type: 'fumes_event', name: 'card-account-details-star' },
  { title: 'Ελαστικά', type: 'tires', name: 'car-traction-control' },
  { title: 'Ασφάλεια', type: 'insurance', name: 'card-account-details' }
]

export default function MainFilter(props) {
  const [selectedType, setSelectedType] = useState({})
  const [openModal, setOpenModal] = useState(false)
  const [openFilters, setOpenFilters] = useState(false)

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters)
    // props.handleOpenModal(!openFilters)
  }

  const handleModalStatus = () => {
    setOpenModal(!openModal)
  }

  // const handleFilterChange = selected => {
  //   setSelectedType(selected)
  //   handleCarData(selected)
  //   handleModalStatus()
  //   // TODO Remove in pro
  //   handleOpenFilters()
  // }

  const handleCarData = async selected => {
    const carEventsRaw = await AsyncStorage.getItem('car_events')
    const carEvents = JSON.parse(carEventsRaw)

    if (selected && selected.type !== 'no_filter') {
      const filtered = carEvents.filter(e => e.type === selected.type)
      props.handleData(filtered)
    } else {
      props.handleData(carEvents)
    }
    props.handleLoading(false)
  }

  useEffect(() => {
    setSelectedType(OPTIONS[0])
    handleCarData(OPTIONS[0])
  }, [])

  return (
    <View style={styles.container}>
      <View>
        <TypeButtons handleActiveTab={props.handleActiveTab} />
        {props.activeTab != 'graph' && (
          <View style={styles.buttonsView}>
            <Button
              title='Μήνας'
              buttonStyle={styles.typeButtonsLeft}
              titleStyle={{ fontSize: 14, color: '#1b2254', fontWeight: 'bold' }}
              disabledStyle={{ borderColor: '#858585' }}
              disabled
            />
            <Button
              title='Χρόνος'
              buttonStyle={styles.typeButtons}
              titleStyle={{ fontSize: 14, color: '#1b2254', fontWeight: 'bold' }}
              disabledStyle={{ borderColor: '#858585' }}
              disabled
            />
            <Button
              title='Συνολικά'
              buttonStyle={styles.typeButtonsRight}
              titleStyle={{ fontSize: 14, color: '#1b2254', fontWeight: 'bold' }}
              disabledStyle={{ borderColor: '#858585' }}
              // disabled
            />
          </View>
        )}
        <TextContainer selectedType={selectedType} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    marginTop: 40,
    padding: 35
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20
  },
  typeButtonsActive: {
    backgroundColor: '#1b2254',
    width: 150,
    borderRadius: 25
  },
  typeButtons: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#1b2254',
    width: 150,
    borderRadius: 25
  },
  textContainer: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 15
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  typeButtons: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#1b2254',
    width: 115
  },
  typeButtonsLeft: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#1b2254',
    width: 115,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  typeButtonsRight: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#1b2254',
    width: 112,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  }
})
