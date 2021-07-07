import React, { useEffect, useState } from 'react'
import moment from 'moment'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import NumberFormat from 'react-number-format'
import { StyleSheet, Text, View, ActivityIndicator, Alert } from 'react-native'
import { Button, Avatar, Badge } from 'react-native-elements'

import EventsList from '../components/EventsList'
import AddEventModal from '../components/AddEventModal'

export default function OverView(props) {
  const [userName, setUserName] = useState('')
  const [carInfo, setCarInfo] = useState({})
  const [cardata, setCarData] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [loading, seLoading] = useState(true)
  const [notificationsCout, setNotificationsCount] = useState(0)

  const handleStoredData = async () => {
    const username = await AsyncStorage.getItem('usersName')
    const carInfoRaw = await AsyncStorage.getItem('carInfo')
    const startDate = await AsyncStorage.getItem('starting_date')
    const carEventsRaw = await AsyncStorage.getItem('car_events')
    const kmNotifications = await AsyncStorage.getItem('user_notifications_km')
    const dateNotifications = await AsyncStorage.getItem('user_notifications_date')
    const carInfoObj = JSON.parse(carInfoRaw)

    if (startDate && startDate.length) {
      const startObj = {
        start: true,
        data: JSON.parse(startDate)
      }
      if (carEventsRaw) {
        const carEvents = JSON.parse(carEventsRaw)
        const carEventsFormated = carEvents.sort(
          (a, b) => new moment(b.date).format('YYYYMMDD') - new moment(a.date).format('YYYYMMDD')
        )
        setCarData([...carEventsFormated, startObj])
      } else {
        setCarData([startObj])
      }
    }

    handleNotifications(kmNotifications, dateNotifications, carInfoObj)

    setUserName(username)
    setCarInfo(carInfoObj)
    seLoading(false)
  }

  const handleModalStatus = () => {
    setModalVisible(!modalVisible)
  }

  const handleNotifications = async (km, date, info) => {
    let count = 0
    let newNotifications = 0
    const kmArray = []
    const dateArray = []

    if (km) {
      JSON.parse(km).forEach(notification => {
        if (notification.active) {
          count = count + 1
        } else if (
          parseFloat(notification.km.replace(/,/g, '')) < parseFloat(info.km.replace(/,/g, ''))
        ) {
          count = count + 1
          newNotifications = newNotifications + 1
          notification.active = true
        }
        kmArray.push(notification)
      })
      await AsyncStorage.setItem('user_notifications_km', JSON.stringify(kmArray))
    }

    if (date) {
      JSON.parse(date).forEach(notification => {
        if (notification.active) {
          count = count + 1
        } else if (moment(notification.date, 'YYYY/MM/DD').isBefore(moment())) {
          count = count + 1
          newNotifications = newNotifications + 1
          notification.active = true
        }
        dateArray.push(notification)
      })
      await AsyncStorage.setItem('user_notifications_date', JSON.stringify(dateArray))
    }
    setNotificationsCount(count)

    if (newNotifications > 0) {
      Alert.alert(
        'Νέες ειδοποιήσεις !',
        `Έχεις ${newNotifications} ${
          newNotifications > 1 ? 'νέες  ειδοποιήσεις' : 'νέα  ειδοποίηση'
        }`,
        [
          {
            text: 'Κλείσιμο',
            onPress: () => null,
            style: 'cancel'
          }
        ]
      )
    }
  }


  useEffect(() => {
    handleStoredData()
  }, [props.refresh])

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <ActivityIndicator size='large' color='#3c4689' />
        </View>
      ) : (
        <>
          <View style={styles.carInfo}>
            <Text style={styles.usernameStyle}>{userName}</Text>
            <View style={styles.roundContainer}>
              <View style={styles.brandAndLogo}>
                <Avatar source={{ uri: carInfo.logo }} />
                <Text style={{ marginLeft: 15, fontSize: 18, fontWeight: 'bold' }}>
                  {carInfo.brand}
                </Text>
              </View>
              <Text style={styles.subText}>Μοντέλο: {carInfo.model}</Text>
              <Text style={styles.subText}>Χρονολογία: {carInfo.year}</Text>
              <NumberFormat
                value={carInfo.cc ? carInfo.cc : ''}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => <Text style={styles.subText}>Κυβικά: {value} cc</Text>}
              />
              <NumberFormat
                value={carInfo.km ? carInfo.km : ''}
                displayType={'text'}
                thousandSeparator={true}
                renderText={value => <Text style={styles.subText}>Χιλιόμετρα: {value} km</Text>}
              />
            </View>
            <View>
              {notificationsCout > 0 && (
                <Badge
                  value={notificationsCout}
                  status='error'
                  containerStyle={{ position: 'absolute', top: -4, right: -4, zIndex: 20 }}
                />
              )}
              <Button
                title='Ειδοποιήσεις'
                buttonStyle={styles.registerButton}
                containerStyle={{ borderRadius: 25, marginTop: 10 }}
                icon={
                  <Icon
                    name={notificationsCout > 0 ? 'bell-alert' : 'bell'}
                    size={25}
                    color='#edc919'
                    style={{ marginRight: 10 }}
                  />
                }
                onPress={() => props.navigation.navigate('notifications_view')}
              />
            </View>
          </View>
          <View style={styles.listStyle}>
            <EventsList data={cardata} handleRefresh={props.handleRefresh} />
          </View>
          {modalVisible && (
            <AddEventModal
              modalVisible={modalVisible}
              handleModalStatus={handleModalStatus}
              carInfo={carInfo}
              navigation={props.navigation}
            />
          )}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
    // justifyContent: 'space-between'
    // justifyContent: 'center'
  },
  carInfo: {
    width: '100%',
    alignContent: 'center',
    alignItems: 'center',
    height: 80,
    marginTop: 140
  },
  usernameStyle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10
  },
  roundContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subText: {
    fontWeight: 'bold',
    color: '#3c4743'
  },
  brandAndLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  registerButton: {
    width: 300,
    backgroundColor: '#1b2254',
    borderRadius: 25
  },
  listStyle: {
    marginTop: 150,
    height: 'auto',
    marginBottom: 120
  }
})
