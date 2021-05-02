import React from 'react'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import CostPie from './graphs/CostPie'
import ExpensesTimeGraoh from './graphs/ExpensesTimeGraoh'
import ConsumptionGraph from './graphs/ConsumptionGraph'

export default function GraphsView(props) {
  return (
    <View style={props.openModal ? styles.container : styles.containerModal}>
      <ScrollView>
        <CostPie data={props.data} />
        <ExpensesTimeGraoh />
        <ConsumptionGraph />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: -320
  },
  containerModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: -320
  },
  textTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center'
  }
})
