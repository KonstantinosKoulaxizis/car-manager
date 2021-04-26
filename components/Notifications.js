import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Switch } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function Notifications(props) {
  const [isEnabled, setIsEnabled] = useState(false)
  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  return (
    <View style={!isEnabled ? styles.container : styles.containerOpen}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ marginRight: 10 }}>Ειδοποίηση</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#8d99e8' }}
          thumbColor={isEnabled ? '#243691' : '#f4f3f4'}
          ios_backgroundColor='#3e3e3e'
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
        <Icon
          name={isEnabled ? 'bell-alert' : 'bell-cancel'}
          size={25}
          color='grey'
          style={{ marginRight: 15 }}
        />
      </View>
      {isEnabled && (
        <Text style={{ marginTop: 11, marginLeft: 10, color: '#ee3e54', fontWeight: 'bold' }}>
          * Διαθέσιμο μόνο στο Pro
        </Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 32
  },
  containerOpen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    marginTop: 10
  }
})
