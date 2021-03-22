import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from '../views/Landing'
import RegistrationModal from '../views/RegistrationModal'
import AddCar from '../views/AddCar'

function Registration({ navigation }) {
  return <Landing navigation={navigation} />
}

function NewUser({ navigation }) {
  return <RegistrationModal navigation={navigation} />
}

function AddNewCar({ navigation }) {
  return <AddCar navigation={navigation} />
}

const Stack = createStackNavigator()

function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
