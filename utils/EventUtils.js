import AsyncStorage from '@react-native-async-storage/async-storage'

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
        const oldKm = carObj.km.replace(/,/g, '.')
        const newKm = event.km.replace(/,/g, '.')

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
    } catch (error) {
      return []
    }
  }
}
