import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const image = { uri: 'https://www.modirent.gr/images/modirent-slider1.jpg' }

export default function App({ navigation }) {
  const handleExistingUser = async () => {
    const username = await AsyncStorage.getItem('usersName')
    const carInfo = await AsyncStorage.getItem('carInfo')
    console.log('🚀 ~ file: Landing.js ~ line 14 ~ handleExistingUser ~ carInfo', carInfo)

    if (username && username.length && username.length > 0 && !carInfo) {
      navigation.navigate('free_account')
    } else if (username && username.length && username.length > 0 && carInfo) {
      navigation.navigate('free_account')
    }
  }

  useEffect(() => {
    handleExistingUser()
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground source={image} style={styles.image}>
        <Text style={styles.text}>Kalos ir8ate sto NAME_OF_THE_APP</Text>
        <View style={styles.buttonsGrid}>
          <Button
            title='Δημιουργία Λογαριασμού'
            buttonStyle={styles.registerButton}
            containerStyle={{ marginTop: 20, borderRadius: 25 }}
            onPress={() => navigation.navigate('free_account')}
          />
          <Button
            title='Pro Account'
            buttonStyle={styles.registerButton}
            containerStyle={{ marginTop: 30, borderRadius: 25 }}
          />
        </View>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center'
  },
  text: {
    color: 'grey',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  buttonsGrid: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80
  },
  registerButton: {
    width: 240,
    height: 60,
    borderRadius: 25
  }
})
