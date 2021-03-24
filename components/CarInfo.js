import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Snackbar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/FontAwesome'

export default function CarInfo({ navigation, selectedBrand, handleSelectedBrand }) {
  const [carModel, setCarModel] = useState('')
  const [carYear, setCarYear] = useState('')
  const [carCubics, setCarCubics] = useState('')
  const [carMeter, setCarMeter] = useState('')
  const [visible, setVisible] = useState(false)

  const onDismissSnackBar = () => setVisible(false)

  const handleCarInfo = async () => {
    if (carModel.length && carYear.length && carCubics.length && carMeter.length) {
      const carInfo = {
        model: carMeter,
        year: carYear,
        cc: carCubics,
        km: carMeter,
        brand: selectedBrand.name,
        logo: selectedBrand.logo
      }
      try {
        await AsyncStorage.setItem('carInfo', JSON.stringify(carInfo))
      } catch (error) {
        console.log('🚀 ~ file: CarInfo.js ~ line 30 ~ handleCarInfo ~ error', error)
      }
    } else {
      setVisible(true)
    }
  }

  const handleGoBack = () => {
    handleSelectedBrand({})
  }
  // TODO load data form async storage
  // fix inputs to get numbers
  // 1.000 add dot
  // fix focus
  return (
    <View>
      <Input
        label='Μοντέλο'
        placeholder='π.χ. Golf'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setCarModel(value)}
        value={carModel}
      />
      <Input
        label='Χρονολογία'
        placeholder='π.χ. 2021'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setCarYear(value)}
        value={carYear}
      />
      <Input
        label='Κυβικά'
        placeholder='π.χ. 1.800'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setCarCubics(value)}
        value={carCubics}
      />
      <Input
        label='Χιλιόμετρα'
        placeholder='π.χ. 12.000'
        leftIcon={<Icon name='user' size={24} color='black' />}
        onChangeText={value => setCarMeter(value)}
        value={carMeter}
      />
      <View>
        <Button
          title='Συνέχεια'
          buttonStyle={styles.confirmationButton}
          containerStyle={{ marginTop: 30, borderRadius: 25 }}
          onPress={handleCarInfo}
        />

        <Button
          title='Πίσω'
          buttonStyle={styles.backButton}
          containerStyle={{ borderRadius: 25 }}
          onPress={handleGoBack}
        />
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        theme={{ colors: { accent: '#ee3e54' } }}
        action={{
          label: 'close',
          onPress: () => {
            onDismissSnackBar
          }
        }}
      >
        Παρακαλώ συμπληρώστε όλα τα πεδία
      </Snackbar>
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
  confirmationButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30
  },
  backButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#ee3e54'
  }
})
