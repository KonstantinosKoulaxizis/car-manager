import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

export default function MainFilter(props) {
  const [activeTab, setActiveTab] = useState('table')

  const handleActiveTab = type => {
    setActiveTab(type)
  }

  useEffect(() => {
    props.handleActiveTab(activeTab)
  }, [activeTab])

  return (
    <View style={styles.buttonsView}>
      <Button
        title='Πίνακας'
        buttonStyle={styles.typeButtons}
        titleStyle={{ fontSize: 14, color: '#1b2254' }}
        onPress={() => handleActiveTab('table')}
        icon={
          <Icon
            name='table'
            size={23}
            color={activeTab === 'table' ? '#d2d6ef' : '#1b2254'}
            style={{ marginRight: 10 }}
          />
        }
        disabledStyle={styles.typeButtonsActive}
        disabledTitleStyle={{ color: '#fff' }}
        disabled={activeTab === 'table'}
      />
      <Button
        title='Γραφήματα'
        buttonStyle={styles.typeButtons}
        titleStyle={{ fontSize: 14, color: '#1b2254' }}
        onPress={() => handleActiveTab('graph')}
        icon={
          <Icon
            name='chart-areaspline'
            size={23}
            color={activeTab === 'graph' ? '#d2d6ef' : '#1b2254'}
            style={{ marginRight: 10 }}
          />
        }
        disabledStyle={styles.typeButtonsActive}
        disabledTitleStyle={{ color: '#fff' }}
        disabled={activeTab === 'graph'}
      />
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
    width: 150,
    borderRadius: 25
  }
})
