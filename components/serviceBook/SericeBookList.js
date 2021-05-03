import React, { useEffect, useState } from 'react'
import moment from 'moment'

import { StyleSheet, Text, View, FlatList } from 'react-native'
import { CheckBox } from 'react-native-elements'

export default function SericeBookList(props) {
  const [carEvents, setCarEvents] = useState([])

  const keyExtractor = (item, index) => index.toString()

  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: 20, backgroundColor: '#fff', padding: 10, borderRadius: 25 }}>
      <Text style={{ ...styles.titleText, alignSelf: 'flex-end', marginRight: 5, fontSize: 12 }}>
        # {props.data.length - index}
      </Text>
      <Text style={styles.titleText}>Ημερομηνία: {moment(item.date).format('DD-MM-YYYY')}</Text>
      <Text style={{ ...styles.titleText, color: '#a3a3a3' }}>Χιλιόμετρα: {item.km}</Text>
      <Text style={{ ...styles.titleText, color: '#a3a3a3', fontSize: 12 }}>
        Συνεργείο: <Text style={{ color: '#bf1e2d' }}> * Διαθέσιμο στη Pro έκδοση</Text>
      </Text>
      <Text style={{ ...styles.titleText, color: '#a3a3a3', fontSize: 12, marginBottom: 7 }}>
        Διεύθυνση: <Text style={{ color: '#bf1e2d' }}>* Διαθέσιμο στη Pro έκδοση</Text>
      </Text>
      {item.services &&
        item.services.map((item, index) => (
          <CheckBox title={item} checked={true} key={index} disabled checkedColor='#1b2254' />
        ))}
    </View>
  )

  useEffect(() => {
    setCarEvents(props.data)
  }, [props.data])

  return (
    <View style={styles.container}>
      {carEvents && carEvents.length > 0 ? (
        <FlatList keyExtractor={keyExtractor} data={carEvents} renderItem={renderItem} />
      ) : (
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
            marginTop: 150,
            paddingBottom: 30,
            paddingTop: 30,
            borderRadius: 15
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#3c4743' }}>
            Δε βρέθηκε κάποια καταχώριση
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 330,
    // backgroundColor: 'transparent',
    // padding: 10,
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
    fontSize: 15
    // marginBottom: 7
  }
})
