import React, { useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'

const image = { uri: 'https://www.modirent.gr/images/modirent-slider1.jpg' }

export default function CarInfo({ navigation, selectedBrand, handleSelectedBrand }) {
  const [usersName, setUsersName] = useState('')

  const handleUsersName = async () => {
    if (usersName && usersName.length > 0) {
      try {
        await AsyncStorage.setItem('usersName', usersName)
        navigation.navigate('add_car')
      } catch (error) {
        console.log('🚀 ~ file: CarInfo.js ~ line 19 ~ handleUsersName ~ error', error)
      }
    }
  }

  const handleGoBack = () => {
    handleSelectedBrand({})
  }
  return (
    <View>
      {/* <Text style={styles.textStyle}>Παρακαλώ συμπληρώστε τα παρακάτω στοιχεία</Text> */}
      <Input
        label='Μοντέλο'
        placeholder='π.χ. Golf'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setUsersName(value)}
      />
      <Input
        label='Χρονολογία'
        placeholder='π.χ. 2021'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setUsersName(value)}
      />
      <Input
        label='Κυβικά'
        placeholder='π.χ. 1.800'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setUsersName(value)}
      />
      <Input
        label='Χιλιόμετρα'
        placeholder='π.χ. 12.000'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setUsersName(value)}
      />
      <View>
      <Button
        title='Συνέχεια'
        buttonStyle={styles.confirmationButton}
        containerStyle={{ marginTop: 30, borderRadius: 25 }}
        onPress={handleUsersName}
      />

      <Button
        title='Piso'
        buttonStyle={styles.confirmationButton}
        containerStyle={{ borderRadius: 25 }}
        onPress={handleGoBack}
      />

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'

    // alignItems: 'center',
    // justifyContent: 'center'
  },
  textField: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 40
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  confirmationButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30
  }
})
