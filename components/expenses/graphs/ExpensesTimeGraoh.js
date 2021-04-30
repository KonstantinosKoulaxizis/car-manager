import React, { useEffect, useState } from 'react'

import { LineChart, Grid, XAxis } from 'react-native-svg-charts'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

export default function ExpensesTimeGraoh(props) {
  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
  const labels = [1, 2, 3, 4]
  const contentInset = { top: 20, bottom: 20, left: 10, right: 10 }

  const handleValue = v => {
    if (v == 0) {
      return 'Ιαν'
    } else if (v == 1) {
      return 'Φεβ'
    } else if (v == 2) {
      return 'Μάρ'
    } else if (v == 3) {
      return 'Απρ'
    }
  }

  return (
    <View
      style={{ backgroundColor: '#fff', padding: 10, borderRadius: 25, width: 320, marginTop: 50 }}
    >
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 10, alignSelf: 'center' }}>
          Καταμερισμός Εξόδων
        </Text>
        <Text style={{ fontSize: 13, color: '#bf1e2d', alignSelf: 'center' }}>
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
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'grey' }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>
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
