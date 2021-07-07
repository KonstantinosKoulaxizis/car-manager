import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'
import * as Notifications from 'expo-notifications'

export default class EventUtils {
  static addEvent = async event => {
    try {
      let updated = []
      const existingEvents = await AsyncStorage.getItem('car_events')
      const carInfo = await AsyncStorage.getItem('carInfo')

      if (existingEvents) {
        updated = [event, ...JSON.parse(existingEvents)]
      } else {
        updated = [event]
      }

      if (carInfo) {
        const carObj = JSON.parse(carInfo)
        const oldKm = carObj.km.replace(/,/g, '')
        const newKm = event.km.replace(/,/g, '')

        if (parseFloat(oldKm) < parseFloat(newKm)) {
          carObj.km = event.km
          await AsyncStorage.setItem('carInfo', JSON.stringify(carObj))
        }
      }

      await AsyncStorage.setItem('car_events', JSON.stringify(updated))
    } catch (error) {
      return []
    }
  }

  static addNotification = async notification => {
    try {
      let notifications = []
      const existingNotifications = await AsyncStorage.getItem(
        `user_notifications_${notification.type}`
      )

      if (existingNotifications) {
        notifications = [notification, ...JSON.parse(existingNotifications)]
      } else {
        notifications = [notification]
      }

      await AsyncStorage.setItem(
        `user_notifications_${notification.type}`,
        JSON.stringify(notifications)
      )

      if (notification.type === 'date') {
        let timeToSeconds = 0
        const time = moment(notification.date).fromNow('ss')
        const splitTime = time.split(' ')
        if (splitTime[1] === 'hours' || splitTime[1] === 'day') {
          timeToSeconds = parseInt(splitTime[0]) * 60 * 60
        } else if (splitTime[1] === 'days' || splitTime[1] === 'day') {
          timeToSeconds = parseInt(splitTime[0]) * 60 * 60 * 24
        } else if (splitTime[1] === 'months' || splitTime[1] === 'month') {
          timeToSeconds = parseInt(splitTime[0]) * 60 * 60 * 24 * 28
        }

        const schedulingOptions = {
          content: {
            title: 'Auto manager',
            body: notification.note,
            sound: true,
            priority: Notifications.AndroidNotificationPriority.HIGH,
            color: 'white'
          },
          trigger: {
            seconds: timeToSeconds
          }
        }
        // Notifications show only when app is not active.
        // (ie. another app being used or device's screen is locked)
        Notifications.scheduleNotificationAsync(schedulingOptions)
      }
    } catch (error) {
      return []
    }
  }
}
