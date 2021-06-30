import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'

import NotificationsList from '../components/notifications/NotificationsList'

const SettingsView = props => {
  const [selectedType, setSelectedType] = useState('Χιλιόμετρα')

  const handleTypeChange = type => {
    setSelectedType(type)
  }
  return (
    <View style={styles.centeredView}>
      <View style={styles.buttonTabs}>
        <Button
          title='Χιλιόμετρα'
          titleStyle={selectedType !== 'Χιλιόμετρα' ? { color: '#1b2254' } : {}}
          buttonStyle={selectedType === 'Χιλιόμετρα' ? styles.activeButton : styles.notActiveButton}
          containerStyle={styles.tabButton}
          icon={
            <Icon
              name='speedometer'
              size={25}
              color={selectedType === 'Χιλιόμετρα' ? '#d2d6ef' : '#1b2254'}
              style={{ marginRight: 10 }}
            />
          }
          onPress={() => handleTypeChange('Χιλιόμετρα')}
        />
        <Button
          title='Ημερομηνία'
          titleStyle={selectedType !== 'Ημερομηνία' ? { color: '#1b2254' } : {}}
          buttonStyle={selectedType === 'Ημερομηνία' ? styles.activeButton : styles.notActiveButton}
          containerStyle={styles.tabButton}
          icon={
            <Icon
              name='calendar-clock'
              size={25}
              color={selectedType === 'Ημερομηνία' ? '#d2d6ef' : '#1b2254'}
              style={{ marginRight: 10 }}
            />
          }
          onPress={() => handleTypeChange('Ημερομηνία')}
        />
      </View>
      <View style={{ flex: 1 }}>
        <NotificationsList type={selectedType} />
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
  buttonTabs: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
    marginBottom: 60
  },
  tabButton: {
    marginTop: 30,
    borderRadius: 25,
    minWidth: 150
  },
  activeButton: {
    backgroundColor: '#1b2254'
  },
  notActiveButton: {
    backgroundColor: '#d3d3d3',
    color: '#1b2254'
    // borderWidth: 5,
    // borderColor: '#1b2254'
  }
})

export default SettingsView
