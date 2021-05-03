import React from 'react'

import { AreaChart, Grid, XAxis, YAxis } from 'react-native-svg-charts'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import * as shape from 'd3-shape'

export default function ExpensesTimeGraoh(props) {
  const data = [230, 210, 218, 350, 218, 210, 218, 230, 210, 218, 218, 210, 218]
  const labels = [1, 2]
  const contentInset = { top: 30, bottom: 20, left: 50, right: 35 }

  const handleValue = v => {
    if (v == 0) {
      return '01/01/2021'
    } else if (v == 1) {
      return '31/01/2021'
    }
  }

  return (
    <View
      style={{ backgroundColor: '#fff', padding: 10, borderRadius: 25, width: 320, marginTop: 50 }}
    >
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' }}>
          Έξοδα <Text style={{ fontSize: 15, color: '#7f7a7a' }}>(€ / xρόνο)</Text>
        </Text>
        <Text style={{ fontSize: 13, color: '#bf1e2d', alignSelf: 'center', fontWeight: 'bold' }}>
          * Διαθέσιμο στη Pro έκδοση
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          marginTop: 15
        }}
      >
        <Button
          title='Μήνας'
          buttonStyle={styles.typeButtons}
          disabledTitleStyle={{ fontSize: 14, color: '#7f7a7a' }}
          disabled={true}
        />
        <Button
          title='Χρόνος'
          buttonStyle={styles.typeButtons}
          disabledTitleStyle={{ fontSize: 14, color: '#7f7a7a' }}
          disabled={true}
        />
      </View>
      <View
        style={{
          fontSize: 18,
          fontWeight: 'bold',
          marginTop: 20,
          marginBottom: 5,
          alignSelf: 'center'
        }}
      >
        <Button
          title='Ιανουάριος 2021'
          buttonStyle={{ ...styles.typeButtons, width: 220 }}
          disabledTitleStyle={{ fontSize: 14, color: '#7f7a7a' }}
          disabled={true}
        />
      </View>
      <View style={{ height: 200, flexDirection: 'row', marginBottom: 10 }}>
        <YAxis
          data={data}
          contentInset={{ top: 30, bottom: 0 }}
          svg={{
            fill: 'grey',
            fontSize: 10
          }}
          formatLabel={value => `${value}`}
          numberOfTicks={3}
        />
        <AreaChart
          style={{ flex: 1, marginLeft: 16 }}
          data={data}
          contentInset={{ top: 30, bottom: 30 }}
          curve={shape.curveNatural}
          svg={{ fill: 'grey' }}
        >
          <Grid />
        </AreaChart>
      </View>
      <XAxis
        data={labels}
        contentInset={contentInset}
        svg={{
          fill: 'grey',
          fontSize: 12
        }}
        // numberOfTicks={5}

        formatLabel={value => `${handleValue(value)}`}
      />
      <Divider />
    </View>
  )
}

const styles = StyleSheet.create({
  typeButtonsActive: {
    backgroundColor: '#1b2254',
    width: 120,
    borderRadius: 25
  },
  typeButtons: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#d3d3d3',
    width: 120,
    borderRadius: 25
  }
})
