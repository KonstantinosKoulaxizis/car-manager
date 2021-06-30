import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

import { StyleSheet, View, FlatList, Text, ActivityIndicator } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

export default function NotificationsList(props) {
  const [userNotifications, setUserNotifications] = useState([])
  const [loading, setLoading] = useState(true)

  const handleNotifications = async () => {
    try {
      const type = props.type === 'Ημερομηνία' ? 'date' : 'km'
      const notifications = await AsyncStorage.getItem(`user_notifications_${type}`)

      if (notifications) {
        setUserNotifications(JSON.parse(notifications))
      }
    } catch (error) {
      console.log('🚀 ~ file: NotificationsList.js ~ line 16 ~ handleNotifications ~ error', error)
    }

    setLoading(false)
  }

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item }) => (
    <ListItem bottomDivider onPress={() => console.log(item)}>
      {/* <Avatar source={{ uri: item.logo }} /> */}
      <ListItem.Content>
        {item.created_at && <Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text>}
        <ListItem.Title>{item.note}</ListItem.Title>
        <Text>
          {moment(new Date()).format('DD-MM-YYYY')} -{' '}
          <Text>{moment(new Date()).format('DD-MM-YYYY')}</Text>
        </Text>
      </ListItem.Content>
      <ListItem.Chevron />
    </ListItem>
  )

  useEffect(() => {
    setUserNotifications([])
    if (props.type) {
      setLoading(true)
      handleNotifications()
    }
  }, [props.type])

  return (
    <>
      {loading ? (
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size='large' color='#3c4689' />
        </View>
      ) : (
        <>
          {userNotifications && userNotifications.length > 0 ? (
            <View style={styles.container}>
              <FlatList
                keyExtractor={keyExtractor}
                data={userNotifications}
                renderItem={renderItem}
              />
            </View>
          ) : (
            <View>
              <Text>Test</Text>
            </View>
          )}
        </>
      )}
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  }
})
