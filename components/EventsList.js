import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { StyleSheet, Text, View, FlatList } from 'react-native'
import { ListItem } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import EventModal from './EventModal'

export default function EventsList(props) {
  const [carEvents, setCarEvents] = useState([])
  const [selectedEvent, setSelectedEvent] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [itemsIndex, setItemsIndex] = useState(0)

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item, i }) => (
    <View>
      {item.start && (
        <ListItem
          bottomDivider
          containerStyle={{ backgroundColor: '#edeff7', borderRadius: 25, marginTop: 10 }}
        >
          <Icon name='star-circle' size={24} color='#e8b500' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Ημέρα δημιουργίας λογαριασμού</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
          </ListItem.Content>
        </ListItem>
      )}
      {item.type === 'gas' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='gas-station' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Ανεφοδιασμός</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      {item.type === 'service' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='wrench' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Service</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      {item.type === 'kteo' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='car-settings' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>KTEO</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      {item.type === 'tires' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='car-traction-control' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Ελαστικά</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      {item.type === 'insurance' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='card-account-details' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Ασφάλεια</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
            <Text style={styles.subText}>Διάρκεια: {item.duration} Μήνες</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
      {item.type === 'fumes' && (
        <ListItem key={i} bottomDivider onPress={() => handleEventModal(item)}>
          <Icon name='card-account-details-star' size={24} color='#6d75a8' />
          <ListItem.Content>
            <ListItem.Title style={styles.titleText}>Κάρτα Καυσαερίων</ListItem.Title>
            <Text style={styles.subText}>{moment(item.date).format('DD - MM - YYYY')}</Text>
            <Text style={styles.subText}>Κόστος: {item.cost} €</Text>
          </ListItem.Content>
          <ListItem.Chevron />
        </ListItem>
      )}
    </View>
  )

  const handleEventModal = item => {
    setItemsIndex(carEvents.indexOf(item))
    setSelectedEvent(item)
    setModalVisible(!modalVisible)
  }
  const handleModalStatus = () => {
    setModalVisible(!modalVisible)
  }
  useEffect(() => {
    setCarEvents(props.data)
  }, [props.data])

  return (
    <View style={styles.container}>
      <FlatList keyExtractor={keyExtractor} data={carEvents} renderItem={renderItem} />
      {modalVisible && (
        <EventModal
          modalVisible={modalVisible}
          handleModalStatus={handleModalStatus}
          item={selectedEvent}
          itemsIndex={itemsIndex}
          handleRefresh={props.handleRefresh}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 25
  },
  subText: {
    fontWeight: 'bold',
    color: '#3c4743',
    fontSize: 13,
    fontStyle: 'italic'
  },
  titleText: {
    fontWeight: 'bold',
    color: '#3c4743',
    fontSize: 16,
    marginBottom: 7
  }
})
