import React, { useEffect, useState } from 'react'

import { StyleSheet, Text, View, ImageBackground, FlatList } from 'react-native'
import { ListItem, Avatar, SearchBar } from 'react-native-elements'

import CarsAndBrands from '../utils/CarsAndBrands'
import CarInfo from '../components/CarInfo'

const image = '../assets/app_cover.jpg'

export default function AddCar({ navigation }) {
  const [searchValue, setSearchValue] = useState('')
  const [searchList, setSearchList] = useState('')
  const [selectedBrand, setSelectedBrand] = useState({})

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => handleSelectedBrand(item)}>
      <Avatar source={{ uri: item.logo }} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  const handleSelectedBrand = item => {
    setSelectedBrand(item)
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
          {selectedBrand && selectedBrand.name ? (
            <CarInfo
              selectedBrand={selectedBrand}
              handleSelectedBrand={handleSelectedBrand}
              navigation={navigation}
            />
          ) : (
            <View>
              <Text style={styles.textStyle}>Choose your car's brand</Text>
              <SearchBar
                lightTheme='true'
                containerStyle={{ borderRadius: 25 }}
                inputContainerStyle={{ borderRadius: 25 }}
                placeholder='...'
                onChangeText={value => setSearchValue(value)}
                value={searchValue}
              />
              <FlatList keyExtractor={keyExtractor} data={searchList} renderItem={renderItem} />
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
    marginBottom: 40
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmationButton: {
    width: 140,
    height: 60,
    borderRadius: 25,
    alignSelf: 'center',
    marginBottom: 30
  }
})
