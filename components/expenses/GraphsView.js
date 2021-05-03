import React from 'react'

import { StyleSheet, View, Dimensions, ScrollView } from 'react-native'
import CostPie from './graphs/CostPie'
import ExpensesTimeGraoh from './graphs/ExpensesTimeGraoh'
import ConsumptionGraph from './graphs/ConsumptionGraph'

export default function GraphsView(props) {
    const windowHeight = Dimensions.get('window').height

  return (
    <View style={windowHeight > 740 ? {...styles.containerModal}: {...styles.containerModal, marginTop: -150}}>
      <ScrollView>
        <CostPie data={props.data} />
        <ExpensesTimeGraoh />
        <ConsumptionGraph />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  containerModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: -320
  }
})
