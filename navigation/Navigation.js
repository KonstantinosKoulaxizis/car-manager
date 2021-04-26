import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../views/Landing'
import RegistrationModal from '../views/RegistrationModal'
import AddCar from '../views/AddCar'
import Main from '../views/Main'
import GasEvent from '../views/GasEvent'
import ServiceEvent from '../views/ServiceEvent'
import KteoEvent from '../views/KteoEvent'
import TireEvent from '../views/TireEvent'

function App() {
  const [refresh, setRefresh] = React.useState(false)

  const handleRefresh = () => {
    setRefresh(!refresh)
  }

  function Registration({ navigation }) {
    return <Landing navigation={navigation} />
  }

  function NewUser({ navigation }) {
    return <RegistrationModal navigation={navigation} />
  }

  function AddNewCar({ navigation }) {
    return <AddCar navigation={navigation} />
  }

  function MainView({ navigation }) {
    return <Main navigation={navigation} refresh={refresh} handleRefresh={handleRefresh} />
  }

  function GoToGasEvent({ navigation }) {
    return <GasEvent navigation={navigation} handleRefresh={handleRefresh} />
  }

  function GoToServiceEvent({ navigation }) {
    return <ServiceEvent navigation={navigation} handleRefresh={handleRefresh} />
  }

  function GoToKteoEvent({ navigation }) {
    return <KteoEvent navigation={navigation} handleRefresh={handleRefresh} />
  }

  function GoToTireEvent({ navigation }) {
    return <TireEvent navigation={navigation} handleRefresh={handleRefresh} />
  }

  const Stack = createStackNavigator()

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Back'>
        <Stack.Screen options={{ headerShown: false }} name='Back' component={Registration} />

        <Stack.Screen name='free_account' options={{ title: 'Νέος Xρήστης' }} component={NewUser} />

        <Stack.Screen
          name='add_car'
          options={{ title: 'Προσθήκη Οχήματος' }}
          component={AddNewCar}
        />

        <Stack.Screen options={{ headerShown: false }} name='main' component={MainView} />
        <Stack.Screen
          options={{ title: 'Ανεφοδιασμός' }}
          name='gas_event'
          component={GoToGasEvent}
        />
        <Stack.Screen
          options={{ title: 'Service' }}
          name='service_event'
          component={GoToServiceEvent}
        />
        <Stack.Screen options={{ title: 'KTEO' }} name='kteo_event' component={GoToKteoEvent} />
        <Stack.Screen options={{ title: 'Ελαστικά' }} name='tire_event' component={GoToTireEvent} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
