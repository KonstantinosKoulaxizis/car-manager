import React, { useState } from 'react'

import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const image = { uri: 'https://www.modirent.gr/images/modirent-slider1.jpg' }

export default function RegistrationModal({ navigation }) {
  const [usersName, setUsersName] = useState('')

  const handleUsersName = async () => {
    if (usersName && usersName.length > 0) {
      try {
        await AsyncStorage.setItem('usersName', usersName)
        navigation.navigate('add_car')
      } catch (error) {
        console.log('🚀 ~ file: RegistrationModal.js ~ line 23 ~ handleUsersName ~ error', error)
      }
    }
  }
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.textField}>
          <View>
            <Text style={styles.textStyle}>Παρακαλώ εισάγετε το όνομα σας</Text>
            <Input
              placeholder='π.χ. Γιάννης Γ.'
              leftIcon={<Icon name='user' size={24} color='black' />}
              onChangeText={value => setUsersName(value)}
            />
            <Button
              title='Συνέχεια'
              buttonStyle={styles.confirmationButton}
              containerStyle={{ marginTop: 30, borderRadius: 25 }}
              onPress={handleUsersName}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  textField: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: '800',
    marginBottom: 40
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmationButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30
  }
})
