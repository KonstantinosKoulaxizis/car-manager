import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, Switch } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import KmNotification from './KmNotification'
import DateNotification from './DateNotification'

export default function Notifications(props) {
  const [isEnabled, setIsEnabled] = useState(false)
  const [selectedType, setSelectedType] = useState('Χιλιόμετρα')

  const handleTypeChange = type => {
    setSelectedType(type)
  }

  const toggleSwitch = () => setIsEnabled(previousState => !previousState)

  useEffect(() => {
    props.handleActiveNotification(isEnabled)
  }, [isEnabled])

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
        <>
          <View style={styles.buttonTabs}>
            <Button
              title='Χιλιόμετρα'
              titleStyle={selectedType !== 'Χιλιόμετρα' ? { color: '#1b2254' } : {}}
              buttonStyle={
                selectedType === 'Χιλιόμετρα' ? styles.activeButton : styles.notActiveButton
              }
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
              buttonStyle={
                selectedType === 'Ημερομηνία' ? styles.activeButton : styles.notActiveButton
              }
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
          <View style={{ width: '100%' }}>
            {selectedType === 'Χιλιόμετρα' && (
              <KmNotification handleNotification={props.handleNotification} />
            )}
            {selectedType === 'Ημερομηνία' && (
              <DateNotification handleNotification={props.handleNotification} />
            )}
          </View>
        </>
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
  },
  buttonTabs: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%'
    // marginBottom: 60
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
