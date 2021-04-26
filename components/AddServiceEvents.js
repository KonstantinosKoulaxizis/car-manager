import React, { useEffect, useState } from 'react'

import { StyleSheet, View, Text, Modal, ScrollView } from 'react-native'
import { Input, Button, CheckBox } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import ServiceTypes from '../utils/ServiceTypes'
import TireTypes from '../utils/TireTypes'

export default function AddServiceEvents(props) {
  const [data, setData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleEvent, setModalVisibleEvent] = useState(false)
  const [serviceArray, setServiceArray] = useState([])

  const [customEvent, setCustomEvent] = useState('')

  const handleCheck = type => {
    const found = serviceArray.find(i => i === type)
    let updated = []

    if (found) {
      updated = serviceArray.filter(i => i !== type)
    } else {
      updated = [...serviceArray, type]
    }

    setServiceArray(updated)
    props.handleAddEvent(updated)
  }

  const handleIsChecked = type => {
    const found = serviceArray.find(i => i === type)

    if (found) {
      return true
    } else return false
  }

  const handleCustomEvent = () => {
    setData([...data, customEvent])
    setCustomEvent('')
    setModalVisibleEvent(false)
  }

  const handleExtraEvents = () => {
    const newEntries = []
    let data

    if (props.tires) {
      data = TireTypes
    } else {
      data = ServiceTypes
    }

    props.loadedItem.forEach(i => {
      const existing = data.find(s => s === i)

      if (!existing) {
        newEntries.push(i)
      }
    })
    setData([...data, ...newEntries])
  }

  useEffect(() => {
    if (props.loadedItem) {
      setServiceArray(props.loadedItem)
      handleExtraEvents()
    } else if (props.tires) {
      setData(TireTypes)
    } else {
      setData(ServiceTypes)
    }
  }, [])

  return (
    <View>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button
          title='Επιλέξτε εργασία'
          buttonStyle={styles.addServiceBtn}
          containerStyle={{
            paddingTop: 30,
            paddingBottom: 40,
            borderRadius: 25
          }}
          icon={<Icon name='car-cog' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />}
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>

      <Modal animationType='slide' transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              buttonStyle={styles.closeButton}
              containerStyle={{
                borderRadius: 50,
                position: 'absolute',
                right: 15,
                top: 15
              }}
              onPress={() => setModalVisible(!modalVisible)}
              icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
            />
            <Text style={styles.modalText}>Επιλέξτε μια η περισσότερες εργασίες</Text>

            <ScrollView>
              {data.map((i, index) => (
                <View key={index}>
                  <CheckBox title={i} checked={handleIsChecked(i)} onPress={() => handleCheck(i)} />
                </View>
              ))}

              {!props.tires && (
                <Button
                  title='Άλλο σέρβις'
                  buttonStyle={styles.addServiceBtn}
                  containerStyle={{
                    paddingTop: 10,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  icon={
                    <Icon name='pen-plus' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />
                  }
                  onPress={() => setModalVisibleEvent(!modalVisibleEvent)}
                />
              )}
            </ScrollView>
            <View>
              <Button
                title='Προσθήκη'
                buttonStyle={styles.registerButton}
                disabled={!serviceArray.length ? true : false}
                containerStyle={{
                  paddingTop: 30,
                  paddingBottom: 10,
                  borderRadius: 25
                }}
                icon={<Icon name='car-cog' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />}
                disabledStyle={{ backgroundColor: '#8d8fa0' }}
                onPress={() => setModalVisible(!modalVisible)}
              />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType='fade' transparent={true} visible={modalVisibleEvent}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Button
              buttonStyle={styles.closeButton}
              containerStyle={{
                borderRadius: 50,
                position: 'absolute',
                right: 15,
                top: 15
              }}
              onPress={() => setModalVisibleEvent(!modalVisibleEvent)}
              icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
            />
            <View style={{ width: 280 }}>
              <Input
                label='Παρακαλώ εισάγετε το όνομα της εργασίας'
                leftIcon={<Icon name='pen' size={24} color='black' />}
                onChangeText={setCustomEvent}
                // value={value}
              />
            </View>
            <Button
              title='Προσθήκη'
              buttonStyle={styles.addServiceBtn}
              containerStyle={{
                paddingTop: 10,
                justifyContent: 'center',
                alignItems: 'center'
              }}
              icon={
                <Icon name='plus-thick' size={25} color='#d2d6ef' style={{ marginRight: 15 }} />
              }
              onPress={handleCustomEvent}
            />
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start'
  },
  addServiceBtn: {
    width: 250,
    borderRadius: 25,
    backgroundColor: '#666ea3'
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0, 0, 0, 0.64)'
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
  modalText: {
    marginBottom: 35,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  registerButton: {
    width: 280,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  }
})
