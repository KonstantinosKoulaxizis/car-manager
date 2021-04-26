import React, { useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

import { ImageBackground, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'

const image = '../assets/app_cover.jpg'

export default function App({ navigation }) {
  const handleExistingUser = async () => {
    const username = await AsyncStorage.getItem('usersName')
    const carInfoRaw = await AsyncStorage.getItem('carInfo')
    const carInfo = JSON.parse(carInfoRaw)

    if (username && username.length && username.length > 0 && !carInfo) {
      navigation.navigate('free_account')
    } else if (username && username.length && username.length > 0 && carInfo) {
      navigation.navigate('main')
    }
  }

  useEffect(() => {
    handleExistingUser()
  }, [])
  return (
    <View style={styles.container}>
      <ImageBackground source={require(image)} style={styles.image}>
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
            icon={<Icon name='star' size={25} color='#edc919' style={{ marginRight: 10 }} />}
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
    borderRadius: 25,
    backgroundColor: '#1b2254'
  }
})
