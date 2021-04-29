import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'

import CostPie from './graphs/CostPie'

export default function TablesView(props) {
  return (
    <View style={props.openModal ? styles.container : styles.containerModal}>
      <ScrollView>
        <CostPie data={props.data} />
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
    marginBottom: 5,
    alignSelf: 'center'
  }
})
