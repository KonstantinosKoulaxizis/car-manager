import React, { useEffect } from 'react'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { StyleSheet, BackHandler } from 'react-native'

import Navigation from './navigation/Navigation'

export default function App() {
  const handleBackButton = () => {
    return true
  }

  useEffect(() => {
    // SplashScreen.hide()
    BackHandler.addEventListener('hardwareBackPress', handleBackButton)
  }, [])

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
