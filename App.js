import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Navigation from './navigation/Navigation'

export default function App() {
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
