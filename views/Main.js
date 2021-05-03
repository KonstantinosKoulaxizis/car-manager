import React, { useState } from 'react'
import { BottomNavigation, Text } from 'react-native-paper'
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
  const [routes] = useState([
    { key: 'overview', title: 'Λίστα', icon: 'clipboard-list-outline' },
    { key: 'expenses', title: 'Έξοδα', icon: 'chart-line-stacked' },
    { key: 'service', title: 'Service', icon: 'car-info' },
    { key: 'settings', title: 'Ρυθμίσεις', icon: 'account-settings' }
  ])

  const renderScene = BottomNavigation.SceneMap({
    overview: OverViewRoute,
    expenses: ExpensesRoute,
    service: ServiceBookRoute,
    settings: SettingsRoute
  })

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      barStyle={{ backgroundColor: '#1b2254' }}
    />
  )
}

export default Main
