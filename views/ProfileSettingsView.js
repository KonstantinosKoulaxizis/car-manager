import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import NumberFormat from 'react-number-format'
import { Snackbar } from 'react-native-paper'
import {
  Modal,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TouchableOpacity,
  FlatList,
  Dimensions
} from 'react-native'
import { Input, Button, Avatar, ListItem, SearchBar } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import CarsAndBrands from '../utils/CarsAndBrands'

export default function ProfileSettingsView(props) {
  const windowHeight = Dimensions.get('window').height

  const [carModel, setCarModel] = useState('')
  const [carYear, setCarYear] = useState('')
  const [carCubics, setCarCubics] = useState('')
  const [carMeter, setCarMeter] = useState('')
  const [visible, setVisible] = useState(false)
  const [selectedBrand, setSelectedBrand] = useState({})
  const [usersName, setUsersName] = useState('')
  const [edit, setEdit] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState('')
  const [brandsModal, setBrandsModal] = useState(false)
  const [carsModel, selectCarModel] = useState(false)

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <>
      {carsModel ? (
        <ListItem bottomDivider onPress={() => handleSetCarModel(item)} style={{ width: 330 }}>
          <ListItem.Content>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
        </ListItem>
      ) : (
        <ListItem bottomDivider onPress={() => handleSelectedBrand(item)} style={{ width: 330 }}>
          <Avatar source={{ uri: item.logo }} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
    </>
  )

  const handleBrandsModal = () => {
    if (edit) {
      setBrandsModal(!brandsModal)
    }
  }

  const handleSelectedBrand = item => {
    setSelectedBrand(item)
    selectCarModel(true)
    // handleBrandsModal()
  }

  const handleSetCarModel = item => {
    setCarModel(item)
    handleBrandsModal()
    selectCarModel(false)
  }

  const onDismissSnackBar = () => setVisible(false)

  const handleEditItem = () => {
    setEdit(!edit)
  }

  const handleUpdateInfo = async () => {
    if (
      carModel.length &&
      carYear.length &&
      carCubics.length &&
      carMeter.length &&
      usersName.length &&
      (selectedBrand.name || selectedBrand.brand) &&
      selectedBrand.logo
    ) {
      const carInfo = {
        model: carModel,
        year: carYear,
        cc: carCubics,
        km: carMeter,
        brand: selectedBrand.name ? selectedBrand.name : selectedBrand.brand,
        logo: selectedBrand.logo
      }
      try {
        await AsyncStorage.setItem('carInfo', JSON.stringify(carInfo))
        await AsyncStorage.setItem('usersName', usersName)
        handleEditItem()
        props.navigation.goBack()
      } catch (error) {
        console.log(error)
      }
    } else {
      setVisible(true)
    }
  }

  const getStoredData = async () => {
    try {
      const username = await AsyncStorage.getItem('usersName')
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
          brand: storedData.brand,
          logo: storedData.logo
        }
        setSelectedBrand(item)
      }
      if (username && username.length && username.length > 0) {
        setUsersName(username)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleCancel = () => {
    getStoredData()
    handleEditItem()
  }
  useEffect(() => {
    if (searchValue && searchValue.length > 1) {
      const remaining = CarsAndBrands.filter(car =>
        car.name.toLocaleLowerCase().includes(searchValue.toLocaleLowerCase())
      )

      setSearchList(remaining)
    } else {
      setSearchList(CarsAndBrands)
    }
  }, [searchValue])

  useEffect(() => {
    getStoredData()
    setSearchList(CarsAndBrands)
  }, [])

  return (
    <>
      <ScrollView style={styles.container}>
        <Input
          label='Όνομα'
          leftIcon={<Icon name='account' size={24} color='black' />}
          onChangeText={value => setUsersName(value)}
          value={usersName}
          disabled={!edit}
        />

        <TouchableOpacity
          style={
            edit ? { ...styles.brandAndLogo } : { ...styles.brandAndLogo, borderColor: 'grey' }
          }
          onPress={handleBrandsModal}
        >
          <Avatar source={{ uri: selectedBrand.logo }} />
          <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>
            {selectedBrand.name ? selectedBrand.name : selectedBrand.brand}
          </Text>
        </TouchableOpacity>

        <Input
          label='Μοντέλο'
          placeholder='π.χ. Golf'
          leftIcon={<Icon name='car-side' size={24} color='black' />}
          onChangeText={value => setCarModel(value)}
          value={carModel}
          disabled
        />
        <Input
          label='Χρονολογία'
          placeholder='π.χ. 2021'
          leftIcon={<Icon name='calendar' size={24} color='black' />}
          onChangeText={value => setCarYear(value)}
          value={carYear}
          keyboardType={'numeric'}
          disabled={!edit}
        />
        <Input
          label='Κυβικά (cc)'
          placeholder='π.χ. 1.800'
          leftIcon={<Icon name='car' size={24} color='black' />}
          onChangeText={value => setCarCubics(value)}
          value={carCubics}
          keyboardType={'numeric'}
          disabled={!edit}
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
              disabled={!edit}
            />
          )}
        />
        <View style={{ marginBottom: 40 }}>
          {edit ? (
            <View>
              <Button
                title='Αποθήκευση'
                buttonStyle={styles.registerButton}
                containerStyle={{ borderRadius: 25, marginTop: 10 }}
                onPress={handleUpdateInfo}
                icon={
                  <Icon name='content-save' size={24} color='#f0f0f0' style={{ marginRight: 10 }} />
                }
              />
              <Button
                title='Ακύρωση'
                buttonStyle={styles.closeButtonBig}
                containerStyle={{ borderRadius: 25, marginTop: 10 }}
                icon={
                  <Icon name='close-circle' size={24} color='#f0f0f0' style={{ marginRight: 20 }} />
                }
                onPress={handleCancel}
              />
            </View>
          ) : (
            <View>
              <Button
                title='Επεξεργασία'
                buttonStyle={styles.registerButton}
                containerStyle={{ borderRadius: 25, marginTop: 10 }}
                onPress={handleEditItem}
                icon={
                  <Icon
                    name='square-edit-outline'
                    size={24}
                    color='#f0f0f0'
                    style={{ marginRight: 10 }}
                  />
                }
              />
            </View>
          )}
        </View>
        <Snackbar
          visible={visible}
          duration={2000}
          onDismiss={onDismissSnackBar}
          theme={{ colors: { accent: '#bf1e2d' } }}
          action={{
            label: 'Κλεισιμο',
            onPress: () => {
              onDismissSnackBar
            }
          }}
        >
          Παρακαλώ συμπληρώστε όλα τα πεδία
        </Snackbar>
      </ScrollView>
      {brandsModal && (
        <Modal
          animationType='fade'
          transparent={true}
          visible={brandsModal}
          onRequestClose={handleBrandsModal}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Button
                // title='X'
                buttonStyle={{ backgroundColor: '#bf1e2d' }}
                containerStyle={{
                  borderRadius: 50,
                  position: 'absolute',
                  right: 15,
                  top: 15
                }}
                onPress={handleBrandsModal}
                icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
              />
              {carsModel ? (
                <>
                  <View style={styles.brandAndLogoModal}>
                    <Avatar source={{ uri: selectedBrand.logo }} />
                    <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>
                      {selectedBrand.name}
                    </Text>
                  </View>
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={selectedBrand.cars}
                    renderItem={renderItem}
                    style={{ height: windowHeight * 0.75, marginTop: 30 }}
                  />
                </>
              ) : (
                <>
                  <SearchBar
                    lightTheme='true'
                    containerStyle={{ borderRadius: 25, width: 300, marginTop: 25 }}
                    inputContainerStyle={{ borderRadius: 25 }}
                    placeholder='...'
                    onChangeText={value => setSearchValue(value)}
                    value={searchValue}
                  />
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={searchList}
                    renderItem={renderItem}
                    style={{ height: windowHeight * 0.75 }}
                  />
                </>
              )}
            </View>
          </View>
        </Modal>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 20,
    marginTop: 40
  },
  textStyle: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    marginBottom: 40
  },
  textField: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  },

  brandAndLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
    marginBottom: 15,
    borderWidth: 5,
    borderColor: '#1b2254',
    borderRadius: 15
  },
  registerButton: {
    width: '100%',
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  closeButtonBig: {
    height: 60,
    borderRadius: 25,
    backgroundColor: '#bf1e2d'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  brandAndLogoModal: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  }
})
