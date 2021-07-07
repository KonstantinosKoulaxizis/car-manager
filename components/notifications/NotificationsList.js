import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import moment from 'moment'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, FlatList, Text, ActivityIndicator, Alert } from 'react-native'
import { ListItem } from 'react-native-elements'

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
      console.log(error)
    }

    setLoading(false)
  }

  const handleTextType = item => {
    let text = ''

    if (item.type === 'km') {
      text = `Ειδοποίηση στα ${item.km.replace(/\B(?=(\d{3})+(?!\d))/g, ',')} χλμ`
    } else {
      text = `Ειδοποίηση στις ${moment(item.date).format('DD-MM-YYYY')}`
    }

    return text
  }

  const keyExtractor = (item, index) => index.toString()

  const handleDeleteModal = (index, type) => {
    Alert.alert('Διαγραφή ειδοποίησης;', '', [
      {
        text: 'OXI',
        onPress: () => null,
        style: 'cancel'
      },
      { text: 'Ναι', onPress: () => handleDeleteAlert(index, type) }
    ])
  }

  const handleDeleteAlert = async (i, type) => {
    const remaining = userNotifications.filter((n, index) => index != i)

    await AsyncStorage.setItem(`user_notifications_${type}`, JSON.stringify(remaining))
    setUserNotifications(remaining)
    props.handleRefresh()
  }

  const renderItem = ({ item, index }) => (
    <ListItem
      bottomDivider
      onPress={() => handleDeleteModal(index, item.type)}
      containerStyle={item.active ? styles.activeList : styles.notActiveList}
    >
      <ListItem.Content>
        <View style={styles.textView}>
          <Text style={item.active && styles.activeText}>
            Δημιουργία: {moment(item.created_at).format('DD-MM-YYYY')}
          </Text>
          {item.active && (
            <Icon name='bell-alert' size={35} color='#f0f0f0' style={{ marginTop: -10 }} />
          )}
        </View>
        <ListItem.Title style={(item.active && styles.activeText, { marginTop: 10 })}>
          {item.note}
        </ListItem.Title>

        <Text style={item.active && styles.activeText}>{handleTextType(item)}</Text>
      </ListItem.Content>
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
              <Text style={{fontSize: 18, fontWeight: 'bold'}}>Δε βρέθηκε κάποια ειδοποίηση</Text>
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
    borderRadius: 25,
    height: '100%'
  },
  activeList: {
    backgroundColor: '#dcb748',
    borderRadius: 15,
    marginBottom: 10
  },
  activeText: {
    color: '#f0f0f0',
    fontWeight: 'bold'
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 240
  },
  notActiveList: {
    borderRadius: 15,
    borderWidth: 2,
    marginBottom: 10,
    backgroundColor: '#d3d3d3'
  }
})
