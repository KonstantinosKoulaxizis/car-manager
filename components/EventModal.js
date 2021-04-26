import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

import GasType from './modalTypes/GasType'
import ServiceType from './modalTypes/ServiceType'
import KteoType from './modalTypes/KteoType'

const EventModal = props => {
  const [editItem, setEditItem] = useState(false)

  const handleEditItem = () => {
    setEditItem(!editItem)
  }

  const handleTitle = () => {
    if (props.item && props.item.type) {
      if (props.item.type === 'gas') {
        return 'Ανεφοδιασμός'
      } else if (props.item.type === 'service') {
        return 'Service'
      } else if (props.item.type === 'kteo') {
        return 'KTEO'
      }
    }
  }

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.handleModalStatus}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            buttonStyle={styles.closeButton}
            containerStyle={{ borderRadius: 50, position: 'absolute', right: 15, top: 15 }}
            onPress={props.handleModalStatus}
            icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
          />
          <Text style={styles.modalText}>{handleTitle()}</Text>
          {props.item.type && props.item.type === 'gas' && (
            <GasType
              item={props.item}
              editItem={editItem}
              handleEditItem={handleEditItem}
              itemsIndex={props.itemsIndex}
              handleRefresh={props.handleRefresh}
              handleModalStatus={props.handleModalStatus}
            />
          )}
          {props.item.type && props.item.type === 'service' && (
            <ServiceType
              item={props.item}
              editItem={editItem}
              handleEditItem={handleEditItem}
              itemsIndex={props.itemsIndex}
              handleRefresh={props.handleRefresh}
              handleModalStatus={props.handleModalStatus}
            />
          )}
          {props.item.type && props.item.type === 'kteo' && (
            <KteoType
              item={props.item}
              editItem={editItem}
              handleEditItem={handleEditItem}
              itemsIndex={props.itemsIndex}
              handleRefresh={props.handleRefresh}
              handleModalStatus={props.handleModalStatus}
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
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
  registerButton: {
    width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  closeButtonBig: {
    width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#bf1e2d'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  }
})

export default EventModal
