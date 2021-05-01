import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const PieClick = props => {
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
            // title='X'
            buttonStyle={styles.closeButton}
            containerStyle={{ borderRadius: 50, position: 'absolute', right: 15, top: 15 }}
            onPress={props.handleModalStatus}
            icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
          />
          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            {props.selected.icon && (
              <Icon
                name={props.selected.icon}
                size={25}
                color='#3c4743'
                style={{ marginRight: 10 }}
              />
            )}
            <Text style={styles.modalText}>{props.selected.name}</Text>
          </View>
          <View style={{ marginTop: 20, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
            <Text style={{ ...styles.modalText, color: '#3c4743' }}>
              Κόστος: {props.selected.cost} €
            </Text>
            <Text style={{ ...styles.modalText, color: '#3c4743' }}>
              Επισκέψεις: {props.selected.count} φορές
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  )
}

// #1b2254
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

export default PieClick
