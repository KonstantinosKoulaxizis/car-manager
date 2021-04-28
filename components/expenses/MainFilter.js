import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, Text, View, Modal } from 'react-native'
import { Button } from 'react-native-elements'

import TimeFilter from './TimeFilter'
import TextContainer from './TextContainer'
import TypeButtons from './TypeButtons'

const OPTIONS = [
  { title: 'Χωρίς φίλτρο', type: 'no_filter', name: 'filter-variant-remove' },
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
  }

  const handleModalStatus = () => {
    setOpenModal(!openModal)
  }

  const handleFilterChange = selected => {
    setSelectedType(selected)
    handleCarData(selected)
    handleModalStatus()
  }

  const handleCarData = async selected => {
    const carEventsRaw = await AsyncStorage.getItem('car_events')
    const carEvents = JSON.parse(carEventsRaw)

    if (selected && selected.type !== 'no_filter') {
      const filtered = carEvents.filter(e => e.type === selected.type)
      props.handleData(filtered)
    } else {
      props.handleData(carEvents)
    }
  }

  useEffect(() => {
    setSelectedType(OPTIONS[0])
    handleCarData(OPTIONS[0])
  }, [])

  return (
    <View style={styles.container}>
      {!openFilters ? (
        <>
          <Button
            title='Φίλτρα'
            buttonStyle={{ borderRadius: 25, backgroundColor: '#1b2254', height: 50 }}
            onPress={handleOpenFilters}
            icon={
              <Icon name='filter-variant' size={25} color='#d2d6ef' style={{ marginRight: 10 }} />
            }
          />
          <TypeButtons handleActiveTab={props.handleActiveTab} />
          <TextContainer selectedType={selectedType} />
        </>
      ) : (
        <View
          style={{
            backgroundColor: '#e0dbdb',
            height: 360,
            borderRadius: 25
          }}
        >
          <Button
            title={selectedType.title ? selectedType.title : 'Χωρίς φίλτρο'}
            buttonStyle={{
              borderRadius: 25,
              backgroundColor: '#1b2254',
              height: 50,
              marginTop: 20,
              width: 250,
              alignSelf: 'center'
            }}
            onPress={handleModalStatus}
            icon={
              <Icon
                name={selectedType.name ? selectedType.name : 'filter-variant'}
                size={25}
                color='#d2d6ef'
                style={{ marginRight: 10 }}
              />
            }
          />

          <TimeFilter handleOpenFilters={handleOpenFilters} />
        </View>
      )}

      <Modal
        animationType='fade'
        transparent={true}
        visible={openModal}
        onRequestClose={handleModalStatus}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
              Επέλεξε φίλτρο
            </Text>
            {OPTIONS.map((i, index) => (
              <View key={index}>
                <Button
                  title={i.title ? i.title : 'Χωρίς φίλτρο'}
                  buttonStyle={{
                    borderRadius: 25,
                    backgroundColor: '#1b2254',
                    marginTop: 15,
                    width: 250
                  }}
                  onPress={() => handleFilterChange(i)}
                  icon={
                    <Icon
                      name={i.name ? i.name : 'filter-variant-remove'}
                      size={25}
                      color='#d2d6ef'
                      style={{ marginRight: 10 }}
                    />
                  }
                />
              </View>
            ))}
          </View>
        </View>
      </Modal>
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
  }
})
