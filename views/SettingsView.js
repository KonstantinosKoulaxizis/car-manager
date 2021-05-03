import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const SettingsView = props => {
  return (
    <View style={styles.centeredView}>
      <View>
        <Button
          title='Ρυθμίσεις Χρήστη'
          titleStyle={{ fontWeight: 'bold' }}
          buttonStyle={styles.registerButton}
          containerStyle={{ marginTop: 30, borderRadius: 25 }}
          icon={
            <Icon name='account-settings' size={25} color='#d2d6ef' style={{ marginRight: 10 }} />
          }
          onPress={() => props.navigation.navigate('profile_settings')}
        />

        <Text style={{ marginTop: 15, marginLeft: 10, color: '#bf1e2d', fontWeight: 'bold' }}>
          * Διαθέσιμα μόνο στο Pro
        </Text>

        <Button
          title='Ειδοποιήσεις'
          buttonStyle={styles.registerButton}
          icon={<Icon name='bell' size={25} color='grey' style={{ marginRight: 10 }} />}
          containerStyle={{ marginTop: 5, borderRadius: 25 }}
          disabledStyle={{ borderWidth: 5, borderColor: 'grey' }}
          disabledTitleStyle={{ color: 'grey', fontWeight: 'bold' }}
          disabled
        />

        <Button
          title='Προσθήκη Οχήματος'
          buttonStyle={styles.registerButton}
          icon={<Icon name='car-connected' size={25} color='grey' style={{ marginRight: 10 }} />}
          containerStyle={{ marginTop: 20, borderRadius: 25 }}
          disabledStyle={{ borderWidth: 5, borderColor: 'grey' }}
          disabledTitleStyle={{ color: 'grey', fontWeight: 'bold' }}
          disabled
        />

        <Button
          title='Προσθήκη Χρήστη'
          buttonStyle={styles.registerButton}
          icon={<Icon name='account-plus' size={25} color='grey' style={{ marginRight: 10 }} />}
          containerStyle={{ marginTop: 20, borderRadius: 25 }}
          disabledStyle={{ borderWidth: 5, borderColor: 'grey' }}
          disabledTitleStyle={{ color: 'grey', fontWeight: 'bold' }}
          disabled
        />

        <Button
          title='Προσφορές'
          buttonStyle={styles.registerButton}
          icon={
            <Icon
              name='alert-decagram-outline'
              size={25}
              color='grey'
              style={{ marginRight: 10 }}
            />
          }
          containerStyle={{ marginTop: 20, borderRadius: 25 }}
          disabledStyle={{ borderWidth: 5, borderColor: 'grey' }}
          disabledTitleStyle={{ color: 'grey', fontWeight: 'bold' }}
          disabled
        />

        <Button
          title='Ζωντανή Συνομιλία'
          buttonStyle={styles.registerButton}
          icon={<Icon name='chat' size={25} color='grey' style={{ marginRight: 10 }} />}
          containerStyle={{ marginTop: 20, borderRadius: 25 }}
          disabledStyle={{ borderWidth: 5, borderColor: 'grey' }}
          disabledTitleStyle={{ color: 'grey', fontWeight: 'bold' }}
          disabled
        />
      </View>
    </View>
  )
}

// #1b2254
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export default SettingsView
