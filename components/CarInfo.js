import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NumberFormat from 'react-number-format'
import { StyleSheet, View, ScrollView } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { Snackbar } from 'react-native-paper'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

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
        model: carModel,
        year: carYear,
        cc: carCubics,
        km: carMeter,
        brand: selectedBrand.name,
        logo: selectedBrand.logo
      }
      try {
        await AsyncStorage.setItem('carInfo', JSON.stringify(carInfo))
        await AsyncStorage.setItem('starting_date', JSON.stringify(new Date()))
        navigation.navigate('main')
      } catch (error) {
        navigation.navigate('free_account')
      }
    } else {
      setVisible(true)
    }
  }

  const handleGoBack = () => {
    handleSelectedBrand({})
  }

  const getStoredData = async () => {
    const storedDataRaw = await AsyncStorage.getItem('carInfo')
    const storedData = JSON.parse(storedDataRaw)

    if (storedData && storedData.cc) {
      setCarCubics(storedData.cc)
    }

    if (storedData && storedData.km) {
      setCarMeter(storedData.km)
    }

    if (storedData && storedData.model) {
      setCarModel(storedData.model)
    }

    if (storedData && storedData.year) {
      setCarYear(storedData.year)
    }

    if (storedData && storedData.brand && storedData.logo) {
      const item = {
        name: storedData.brand,
        logo: storedData.logo
      }
      handleSelectedBrand(item)
    }
  }

  useEffect(() => {
    getStoredData()
  }, [])

  return (
    <ScrollView>
      <Input
        label='Μοντέλο'
        placeholder='π.χ. Golf'
        leftIcon={<Icon name='car-side' size={24} color='black' />}
        onChangeText={value => setCarModel(value)}
        value={carModel}
      />
      <Input
        label='Χρονολογία'
        placeholder='π.χ. 2021'
        leftIcon={<Icon name='calendar' size={24} color='black' />}
        onChangeText={value => setCarYear(value)}
        value={carYear}
        keyboardType={'numeric'}
      />
      <Input
        label='Κυβικά (cc)'
        placeholder='π.χ. 1.800'
        leftIcon={<Icon name='car' size={24} color='black' />}
        onChangeText={value => setCarCubics(value)}
        value={carCubics}
        keyboardType={'numeric'}
      />

      <NumberFormat
        value={carMeter}
        displayType={'text'}
        thousandSeparator={true}
        renderText={value => (
          <Input
            label='Χιλιόμετρα (km)'
            placeholder='π.χ. 12.000'
            leftIcon={<Icon name='speedometer' size={24} color='black' />}
            onChangeText={setCarMeter}
            value={value}
            keyboardType={'numeric'}
          />
        )}
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
        theme={{ colors: { accent: '#bf1e2d' } }}
        action={{
          label: 'close',
          onPress: () => {
            onDismissSnackBar
          }
        }}
      >
        Παρακαλώ συμπληρώστε όλα τα πεδία
      </Snackbar>
    </ScrollView>
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
    marginBottom: 30,
    backgroundColor: '#1b2254'
  },
  backButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30,
    backgroundColor: '#bf1e2d'
  }
})
