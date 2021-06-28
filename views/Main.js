import React, { useState, useEffect } from 'react'
import { BottomNavigation } from 'react-native-paper'
import { BackHandler, StyleSheet, Dimensions, Alert } from 'react-native'
import { FAB } from 'react-native-paper'

import AddEventModal from '../components/AddEventModal'

import OverView from './OverView'
import ExpensesView from './ExpensesView'
import ServiceBookView from './ServiceBookView'
import SettingsView from './SettingsView'

const Main = props => {
  const OverViewRoute = () => (
    <OverView navigation={props.navigation} handleRefresh={props.handleRefresh} />
  )

  const ExpensesRoute = () => <ExpensesView />

  const ServiceBookRoute = () => <ServiceBookView />

  const SettingsRoute = () => <SettingsView navigation={props.navigation} />

  const [index, setIndex] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [routes] = useState([
    { key: 'overview', title: 'Λίστα', icon: 'clipboard-list-outline' },
    { key: 'expenses', title: 'Έξοδα', icon: 'chart-line-stacked' },
    { key: 'add_event' },
    { key: 'service', title: 'Service', icon: 'car-info' },
    { key: 'settings', title: 'Ρυθμίσεις', icon: 'account-settings' }
  ])

  const renderScene = BottomNavigation.SceneMap({
    overview: OverViewRoute,
    expenses: ExpensesRoute,
    service: ServiceBookRoute,
    settings: SettingsRoute,
    add_event: OverViewRoute
  })

  const handleModalStatus = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    const backAction = () => {
      if (index === 0) {
        BackHandler.exitApp()
      } else {
        setIndex(0)
      }
      return true
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction)

    return () => backHandler.remove()
  }, [index])

  return (
    <>
      {modalVisible && (
        <AddEventModal
          modalVisible={modalVisible}
          handleModalStatus={handleModalStatus}
          carInfo={{}}
          navigation={props.navigation}
        />
      )}
      <FAB
        style={styles.fab}
        icon='clipboard-plus-outline'
        onPress={handleModalStatus}
        visible={!modalVisible}
        color='#f0f0f0'
      />
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
        barStyle={{ backgroundColor: '#1b2254' }}
      />
    </>
  )
}

export default Main

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    margin: 16,
    right: Dimensions.get('window').width / 2.6,
    bottom: 5,
    backgroundColor: '#273172',
    zIndex: 10
  }
})
