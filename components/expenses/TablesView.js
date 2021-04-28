import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import {  Divider } from 'react-native-elements'

export default function TablesView(props) {
  const [tablesData, setTablesData] = useState([])

  const handleTablesData = () => {
    const formatedObj = {}

    props.data.forEach(i => {
      if (formatedObj[i.type]) {
        formatedObj[i.type].count = formatedObj[i.type].count + 1
        formatedObj[i.type].cost = formatedObj[i.type].cost + i.cost
      } else {
        formatedObj[i.type] = {
          count: 1,
          cost: i.cost,
          type: i.type
        }
      }
    })
    if (formatedObj && formatedObj.length > 0) {
      setTablesData(Object.values(formatedObj))
    }
  }

  useEffect(() => {
    handleTablesData()
  }, [props.data])
  return (
    <View style={props.openModal ? styles.container : styles.containerModal}>
      <ScrollView>
        {tablesData && tablesData.length > 0 ? (
          <View>
            <Text style={styles.textTitle}>Αποτελέσματα Aναζήτησης</Text>
            <Divider style={{marginBottom: 15}}/>
            {tablesData.map((d, index) => (
              <Text key={index}>{d.type}</Text>
            ))}
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
      </ScrollView>
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 5
  }
})
