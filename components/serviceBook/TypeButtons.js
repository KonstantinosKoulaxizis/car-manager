import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'

import MockServiceStats from './MockServiceStats'

export default function TypeButtons(props) {
  const [activeTab, setActiveTab] = useState('book')

  const handleActiveTab = type => {
    setActiveTab(type)
  }

  useEffect(() => {
    props.handleActiveTab(activeTab)
  }, [activeTab])

  return (
    <View>
      <View style={styles.buttonsView}>
        <Button
          title='Βιβλίο Σέρβις'
          buttonStyle={styles.typeButtons}
          titleStyle={{ fontSize: 13, color: '#1b2254' }}
          onPress={() => handleActiveTab('book')}
          icon={
            <Icon
              name='notebook-outline'
              size={23}
              color={activeTab === 'book' ? '#d2d6ef' : '#1b2254'}
              style={{ marginRight: 10 }}
            />
          }
          disabledStyle={styles.typeButtonsActive}
          disabledTitleStyle={{ color: '#fff' }}
          disabled={activeTab === 'book'}
        />
        <Button
          title='Στατιστικά'
          buttonStyle={styles.typeButtons}
          titleStyle={{ fontSize: 14, color: '#1b2254' }}
          onPress={() => handleActiveTab('stats')}
          icon={
            <Icon
              name={activeTab === 'stats' ? 'file-chart' : 'file-chart-outline'}
              size={23}
              color={activeTab === 'stats' ? '#d2d6ef' : '#1b2254'}
              style={{ marginRight: 10 }}
            />
          }
          disabledStyle={styles.typeButtonsActive}
          disabledTitleStyle={{ color: '#fff' }}
          disabled={activeTab === 'stats'}
        />
      </View>
      {activeTab === 'stats' && <MockServiceStats />}
    </View>
  )
}

const styles = StyleSheet.create({
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginBottom: 20
  },
  typeButtonsActive: {
    backgroundColor: '#1b2254',
    width: 150,
    borderRadius: 25
  },
  typeButtons: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#1b2254',
    width: 155,
    borderRadius: 25
  }
})
