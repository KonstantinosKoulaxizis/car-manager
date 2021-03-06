import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ModalButtons(props) {
  const handleUpdateItem = async () => {
    try {
      const rawList = await AsyncStorage.getItem('car_events')
      const list = JSON.parse(rawList)

      const carInfoRaw = await AsyncStorage.getItem('carInfo')
      const carInfoObj = JSON.parse(carInfoRaw)

      const itemKm = props.item.km.replace(/[, ]+/g, '').trim()
      const storedKm = carInfoObj.km.replace(/[, ]+/g, '').trim()

      if (Number(itemKm) > Number(storedKm)) {
        carInfoObj.km = props.item.km
        await AsyncStorage.setItem('carInfo', JSON.stringify(carInfoObj))
      }

      list[props.itemsIndex] = props.item
      await AsyncStorage.setItem('car_events', JSON.stringify(list))
      props.handleModalStatus()
      props.handleRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  const handleDeleteItem = async () => {
    try {
      const rawList = await AsyncStorage.getItem('car_events')
      const list = JSON.parse(rawList)

      list.splice(props.itemsIndex, 1)
      await AsyncStorage.setItem('car_events', JSON.stringify(list))
      props.handleModalStatus()
      props.handleRefresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {props.editItem ? (
        <View>
          <Button
            title='Αποθήκευση'
            buttonStyle={styles.registerButton}
            containerStyle={{ borderRadius: 25, marginTop: 10 }}
            onPress={handleUpdateItem}
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
            onPress={props.handleEditItem}
          />
        </View>
      ) : (
        <View>
          <Button
            title='Επεξεργασία'
            buttonStyle={styles.registerButton}
            containerStyle={{ borderRadius: 25, marginTop: 10 }}
            onPress={props.handleEditItem}
            icon={
              <Icon
                name='square-edit-outline'
                size={24}
                color='#f0f0f0'
                style={{ marginRight: 10 }}
              />
            }
          />
          <Button
            title='Διαγραφή'
            buttonStyle={styles.closeButtonBig}
            containerStyle={{ borderRadius: 25, marginTop: 10 }}
            icon={<Icon name='trash-can' size={24} color='#f0f0f0' style={{ marginRight: 20 }} />}
            onPress={handleDeleteItem}
          />
        </View>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  registerButton: {
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  closeButtonBig: {
    height: 60,
    borderRadius: 25,
    backgroundColor: '#bf1e2d'
  }
})
