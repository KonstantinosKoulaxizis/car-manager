import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, ScrollView, Dimensions } from 'react-native'
import { Button, Divider } from 'react-native-elements'

import MockStatsTable from './MockStatsTable'
import MockCostGraph from './MockCostGraph'

const MOCK_DATA_SERVICE = [
  {
    cost: '90',
    count: '3',
    name: 'Αλλαγή λαδιών',
    color: '#003f5c'
  },
  {
    cost: '10',
    count: '1',
    name: 'Αλλαγή του φίλτρου λαδιού',
    color: '#444e86'
  },
  {
    cost: '30',
    count: '1',
    name: 'Προσθήκη αντιψυκτικού',
    color: '#dd5182'
  },
  {
    cost: '30',
    count: '1',
    name: 'Εκκαθάριση συστήματος ψύξης',
    color: '#ffa600'
  }
]

const MOCK_DATA_TIRES = [
  {
    cost: '320',
    count: '1',
    name: 'Αντικατάσταση ελαστικών',
    color: '#003f5c'
  },
  {
    cost: '30',
    count: '1',
    name: 'Ευθυγράμμιση τροχών',
    color: '#ffa600'
  }
]
export default function MockServiceStats(props) {
  const windowHeight = Dimensions.get('window').height
  console.log(
    '🚀 ~ file: MockServiceStats.js ~ line 53 ~ MockServiceStats ~ windowHeight',
    windowHeight
  )

  const [activeTab, setActiveTab] = useState('table')
  const [openFilters, setOpenFilters] = useState(true)

  const handleOpenFilters = () => {
    setOpenFilters(!openFilters)
  }

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
      {openFilters && (
        <>
          <Button
            disabled
            title='Φίλτρα'
            buttonStyle={{
              backgroundColor: '#f0f0f0',
              borderWidth: 5,
              borderColor: '#858585',
              borderRadius: 25
            }}
            disabledTitleStyle={{ color: 'grey' }}
            icon={<Icon name='filter-variant' size={25} color='grey' style={{ marginRight: 10 }} />}
          />
          <View style={styles.textContainer}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: -10, marginBottom: 10 }}>
              Χωρίς φίλτρο
            </Text>
            <Text style={props.openFilters ? { height: 0 } : styles.textStyle}>
              Από: 01-01-2021
            </Text>
            <Text style={props.openFilters ? { height: 0 } : styles.textStyle}>
              Έως: 31-01-2021
            </Text>
          </View>
        </>
      )}
      <Divider style={{ marginTop: 10 }} />
      {windowHeight < 750 && (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: openFilters ? 20 : 0
          }}
        >
          <Button
            buttonStyle={{ backgroundColor: '#1b2254', width: 35, height: 35, borderRadius: 25 }}
            titleStyle={{ fontSize: 14, color: '#1b2254' }}
            onPress={handleOpenFilters}
            icon={
              <Icon
                name={openFilters ? 'arrow-up-thick' : 'arrow-down-thick'}
                size={20}
                color='#f0f0f0'
              />
            }
          />
        </View>
      )}
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
          windowHeigh={windowHeight}
        />
      )}
      {activeTab === 'graph' && (
        <ScrollView style={{ height: 380 }}>
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
