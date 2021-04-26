import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modal, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const AddEventModal = props => {
  const handleSelectedAction = type => {
    props.handleModalStatus()
    if (type === 'service') {
      props.navigation.navigate('service_event')
    } else if (type === 'gas') {
      props.navigation.navigate('gas_event')
    } else if (type === 'kteo') {
      props.navigation.navigate('kteo_event')
    } else if (type === 'tires') {
      props.navigation.navigate('tire_event')
    } else if (type === 'insurance') {
      props.navigation.navigate('insurance_event')
    } else if (type === 'fumes') {
      props.navigation.navigate('fumes_event')
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
            // title='X'
            buttonStyle={styles.closeButton}
            containerStyle={{ borderRadius: 50, position: 'absolute', right: 15, top: 15 }}
            onPress={props.handleModalStatus}
            icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
          />
          <Text style={styles.modalText}>Προσθήκη</Text>

          <View>
            <Button
              title='Ανεφοδιασμός'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={
                <Icon name='gas-station' size={25} color='#d2d6ef' style={{ marginRight: 10 }} />
              }
              onPress={() => handleSelectedAction('gas')}
            />

            <Button
              title='Service'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={<Icon name='wrench' size={25} color='#d2d6ef' style={{ marginRight: 10 }} />}
              onPress={() => handleSelectedAction('service')}
            />

            <Button
              title='KTEO'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={
                <Icon name='car-settings' size={25} color='#d2d6ef' style={{ marginRight: 10 }} />
              }
              onPress={() => handleSelectedAction('kteo')}
            />

            <Button
              title='Κάρτα Καυσαερίων'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={
                <Icon
                  name='card-account-details-star'
                  size={25}
                  color='#d2d6ef'
                  style={{ marginRight: 10 }}
                />
              }
              onPress={() => handleSelectedAction('fumes')}
            />

            <Button
              title='Ελαστικά'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={
                <Icon
                  name='car-traction-control'
                  size={25}
                  color='#d2d6ef'
                  style={{ marginRight: 10 }}
                />
              }
              onPress={() => handleSelectedAction('tires')}
            />

            <Button
              title='Ασφάλεια'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              icon={
                <Icon
                  name='card-account-details'
                  size={25}
                  color='#d2d6ef'
                  style={{ marginRight: 10 }}
                />
              }
              onPress={() => handleSelectedAction('insurance')}
            />
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
  registerButton: {
    width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  }
})

export default AddEventModal
