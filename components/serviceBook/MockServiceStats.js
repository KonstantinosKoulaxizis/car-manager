import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Button, Divider } from 'react-native-elements'

import MockStatsTable from './MockStatsTable'
import MockCostGraph from './MockCostGraph'

const MOCK_DATA_SERVICE = [
  {
    cost: '90',
    count: '3',
    name: 'Αλλαγή λαδιών',
    color: '#595555'
  },
  {
    cost: '10',
    count: '1',
    name: 'Αλλαγή του φίλτρου λαδιού',
    color: '#898989'
  },
  {
    cost: '30',
    count: '1',
    name: 'Προσθήκη αντιψυκτικού',
    color: '#c6c6c6'
  },
  {
    cost: '30',
    count: '1',
    name: 'Εκκαθάριση συστήματος ψύξης',
    color: '#e0e0e0'
  }
]

const MOCK_DATA_TIRES = [
  {
    cost: '320',
    count: '1',
    name: 'Αντικατάσταση ελαστικών',
    color: '#595555'
  },
  {
    cost: '30',
    count: '1',
    name: 'Ευθυγράμμιση τροχών',
    color: '#e0e0e0'
  }
]
export default function MockServiceStats() {
  const [activeTab, setActiveTab] = useState('table')


  const handleActiveTab = type => {
    setActiveTab(type)
  }

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 13,
          color: '#bf1e2d',
          alignSelf: 'center',
          marginBottom: 10,
          marginTop: -10,
          fontWeight: 'bold'
        }}
      >
        * Διαθέσιμο στη Pro έκδοση. Τα δεδομένα προορίζονται μόνο για προεπισκόπηση της λειτουργίας
      </Text>
      <Divider style={{ marginTop: 10 }} />
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

      {activeTab === 'table' && (
        <MockStatsTable
          MOCK_DATA_TIRES={MOCK_DATA_TIRES}
          MOCK_DATA_SERVICE={MOCK_DATA_SERVICE}
        />
      )}
      {activeTab === 'graph' && (
        <ScrollView style={{marginBottom: 250}}>
          <MockCostGraph title={'Service'} icon={'wrench'} data={MOCK_DATA_SERVICE} />
          <MockCostGraph title={'Ελαστικά'} icon={'car-traction-control'} data={MOCK_DATA_TIRES} />
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignContent: 'center',
    paddingLeft: 35,
    paddingRight: 35
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 20,
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
  },
  textContainer: {
    marginTop: 20,
    alignSelf: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 15
  },
  textStyle: {
    fontSize: 14,
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#3c4743'
  }
})
