import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'

export default function TablesView(props) {
  const isOdd = num => {
    return num % 2
  }

  const handleTypeName = type => {
    if (type === 'gas') {
      return 'Ανεφοδιασμός'
    } else if (type === 'service') {
      return 'Service'
    } else if (type === 'kteo') {
      return 'KTEO'
    } else if (type === 'tires') {
      return 'Ελαστικά'
    } else if (type === 'insurance') {
      return 'Ασφάλεια'
    } else if (type === 'fumes') {
      return 'Κ. Καυσαερίων'
    }
  }

  const handleTypeIcon = type => {
    if (type === 'gas') {
      return 'gas-station'
    } else if (type === 'service') {
      return 'wrench'
    } else if (type === 'kteo') {
      return 'car-settings'
    } else if (type === 'tires') {
      return 'car-traction-control'
    } else if (type === 'insurance') {
      return 'card-account-details'
    } else if (type === 'fumes') {
      return 'card-account-details-star'
    }
  }

  return (
    <View style={props.openModal ? styles.container : styles.containerModal}>
      <Divider style={{marginBottom: 5}}/>
      {props.tablesData && props.tablesData.length > 0 && (
        <Text style={styles.textTitle}>Αποτελέσματα Aναζήτησης</Text>
      )}
      {props.tablesData && props.tablesData.length > 0 ? (
        <View>
          <Divider style={{ marginBottom: 15, marginTop: 5 }} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginBottom: 15,
              width: 320
            }}
          >
            <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 3, color: '#3c4743' }}>
              Είδος
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 2, color: '#3c4743' }}>
              Κόστος
            </Text>
            <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, color: '#3c4743' }}>
              Φορές
            </Text>
          </View>
          <Divider style={{ marginBottom: 5 }} />

          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 320,
                height: 40,
                backgroundColor: '#9ca3d3'
              }}
            >
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: '#000',
                  flex: 3,
                  marginLeft: 5
                }}
              >
                Σύνολο
              </Text>
              <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 2, color: '#000' }}>
                € {props.total.cost}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: '#000'
                  }}
                >
                  {props.total.count}
                </Text>
              </View>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 320,
                height: 40,
                backgroundColor: '#fafafa'
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#3f4845',
                  flex: 3,
                  marginLeft: 5
                }}
              >
                Κατανάλωση
              </Text>
              <Text style={{ fontSize: 13, marginRight: 15, color: '#bf1e2d' }}>
                * Διαθέσιμο στη Pro έκδοση
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 320,
                height: 40,
                backgroundColor: '#9ca3d3'
              }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 'bold',
                  color: '#3f4845',
                  flex: 3,
                  marginLeft: 5
                }}
              >
                Εργασίες
              </Text>
              <Text style={{ fontSize: 13, marginRight: 15, color: '#bf1e2d' }}>
                * Διαθέσιμο στη Pro έκδοση
              </Text>
            </View>
            {props.tablesData.map((d, index) => (
              <View
                key={index}
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: 320,
                  height: 40,
                  backgroundColor: isOdd(index) ? '#9ca3d3' : '#fafafa'
                }}
              >
                <View
                  style={{
                    flex: 3,
                    marginLeft: 5,
                    flexDirection: 'row'
                  }}
                >
                  <Icon
                    name={handleTypeIcon(d.type)}
                    size={15}
                    color='#3f4845'
                    style={{ marginRight: 5, marginTop: 4 }}
                  />
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#3f4845'
                    }}
                  >
                    {handleTypeName(d.type)}
                  </Text>
                </View>
                <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 2, color: '#3f4845' }}>
                  € {d.cost}
                </Text>
                <View style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      alignSelf: 'center',
                      color: '#3f4845'
                    }}
                  >
                    {d.count}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>
      ) : (
        <View style={{ justifyContent: 'center', padding: 30, alignSelf: 'center' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 18, color: '#bf1e2d' }}>
            * Δυστυχώς δεν υπάρχουν διαθέσιμα δεδομένα
          </Text>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#858585', marginTop: 15 }}>
            Δοκιμάστε να αλλάξετε τα φίλτρα σας η κάντε τη πρώτη σας καταχώριση.
          </Text>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center'
  },
  containerModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: -230
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center'
  }
})
