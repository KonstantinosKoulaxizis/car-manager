import React, { useEffect, useState, useRef } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, View, Image, Animated } from 'react-native'
import { Button } from 'react-native-elements'

const SPLASH = '../assets/splash_auto.png'

export default function App({ navigation }) {
  const [loading, seLoading] = useState(true)
  const [newAccount, setNewAccount] = useState(false)
  const fadeAnim = useRef(new Animated.Value(0)).current



  const handleExistingUser = async () => {
    const username = await AsyncStorage.getItem('usersName')
    const carInfoRaw = await AsyncStorage.getItem('carInfo')
    const carInfo = JSON.parse(carInfoRaw)

    if (username && username.length && username.length > 0 && !carInfo) {
      navigation.navigate('free_account')
    } else if (username && username.length && username.length > 0 && carInfo) {
      navigation.navigate('main')
      // seLoading(false)
    } else {
      seLoading(false)
      setNewAccount(true)
    }
  }

  useEffect(() => {
    handleExistingUser()
  }, [])

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1800,
      useNativeDriver: true
    }).start()
  }, [fadeAnim])

  return (
    <View style={styles.container}>
      {loading && (
        <View style={{ marginTop: 300, alignItems: 'center', justifyContent: 'center' }}>
          {/* <ActivityIndicator size='large' color='#3c4689' /> */}
          {/* <Image style={{ width: 300, height: 300 }} source={require(SPLASH)} /> */}
        </View>
      )}
      {newAccount && (
        <Animated.View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 40,
            opacity: fadeAnim
          }}
        >
          <Image style={{ width: 300, height: 300 }} source={require(SPLASH)} />
          <View style={styles.buttonsGrid}>
            <Button
              title='Δημιουργία Λογαριασμού'
              buttonStyle={styles.registerButton}
              containerStyle={{ marginTop: 20, borderRadius: 25 }}
              onPress={() => navigation.navigate('free_account')}
            />
          </View>
        </Animated.View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#1b2254'
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
    backgroundColor: '#9b2630'
  }
})
