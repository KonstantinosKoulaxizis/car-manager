import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, ImageBackground, FlatList, Dimensions } from 'react-native'
import { ListItem, Avatar, SearchBar, Button } from 'react-native-elements'

import CarsAndBrands from '../utils/CarsAndBrands'
import CarInfo from '../components/CarInfo'

const image = '../assets/app_cover.jpg'

export default function AddCar({ navigation }) {
  const windowHeight = Dimensions.get('window').height

  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState('')
  const [selectedBrand, setSelectedBrand] = useState({})
  const [carModel, setCarModel] = useState('')

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <>
      {item.logo && item.name ? (
        <ListItem bottomDivider onPress={() => handleSelectedBrand(item)}>
          <Avatar source={{ uri: item.logo }} />
          <ListItem.Content>
            <ListItem.Title>{item.name}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      ) : (
        <ListItem bottomDivider onPress={() => handleSelectedCarModel(item)}>
          <ListItem.Content>
            <ListItem.Title>{item}</ListItem.Title>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
    </>
  )

  const handleSelectedCarModel = model => {
    setCarModel(model)
  }

  const handleSelectedBrand = item => {
    setSelectedBrand(item)
  }

  const handleRemoveSelectedBrand = ()=> {
    setSelectedBrand({})
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
    setSearchList(CarsAndBrands)
  }, [])

  return (
    <View style={styles.container}>
      <ImageBackground source={require(image)} style={styles.image}>
        <View style={styles.textField}>
          {selectedBrand && selectedBrand.name && carModel.length > 0 ? (
            <CarInfo
              selectedModel={carModel}
              selectedBrand={selectedBrand}
              handleSelectedBrand={handleSelectedBrand}
              navigation={navigation}
            />
          ) : (
            <View>
              {selectedBrand && selectedBrand.cars ? (
                <>
                  <ListItem bottomDivider style={styles.textStyle}>
                    <Avatar source={{ uri: selectedBrand.logo }} />
                    <ListItem.Content>
                      <ListItem.Title>{selectedBrand.name}</ListItem.Title>
                    </ListItem.Content>
                    <Button
                      buttonStyle={styles.closeButton}
                      containerStyle={{
                        borderRadius: 50,
                        position: 'absolute',
                        right: 15,
                        top: 15
                      }}
                      onPress={handleRemoveSelectedBrand}
                      icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
                    />
                  </ListItem>

                  <FlatList
                    keyExtractor={keyExtractor}
                    data={selectedBrand.cars}
                    renderItem={renderItem}
                    style={{ height: windowHeight * 0.6 }}
                  />
                </>
              ) : (
                <>
                  <SearchBar
                    lightTheme='true'
                    containerStyle={{ borderRadius: 25, marginTop: 50 }}
                    inputContainerStyle={{ borderRadius: 25 }}
                    placeholder='...'
                    onChangeText={value => setSearchValue(value)}
                    value={searchValue}
                  />
                  <FlatList
                    keyExtractor={keyExtractor}
                    data={searchList}
                    renderItem={renderItem}
                    style={{ height: windowHeight * 0.6 }}
                  />
                </>
              )}
            </View>
          )}
        </View>
      </ImageBackground>
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
    fontSize: 26,
    fontWeight: '800',
    marginTop: 40
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center'
  },
  confirmationButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  }
})
