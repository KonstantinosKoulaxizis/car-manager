import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, Text, View, ImageBackground } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Snackbar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome'

const image = { uri: 'https://www.modirent.gr/images/modirent-slider1.jpg' }

export default function RegistrationModal({ navigation }) {
  const [usersName, setUsersName] = useState('')
  const [visible, setVisible] = useState(false)

  const onDismissSnackBar = () => setVisible(false)

  const handleUsersName = async () => {
    if (usersName && usersName.length > 0) {
      try {
        await AsyncStorage.setItem('usersName', usersName)
        navigation.navigate('add_car')
      } catch (error) {
        console.log('🚀 ~ file: RegistrationModal.js ~ line 23 ~ handleUsersName ~ error', error)
      }
    } else {
      setVisible(true)
    }
  }

  const handleSavedName = async () => {
    const username = await AsyncStorage.getItem('usersName')
    if (username && username.length && username.length > 0) {
      setUsersName(username)
    }
  }

  useState(() => {
    handleSavedName()
  }, [])
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
              value={usersName}
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
        Παρακαλώ συμπληρώστε το όνομα σας
      </Snackbar>
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
