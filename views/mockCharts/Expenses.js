import React from 'react'

import { LineChart, Grid, PieChart, StackedAreaChart } from 'react-native-svg-charts'
import { StyleSheet, Text, View, ScrollView } from 'react-native'
import * as shape from 'd3-shape'

export default function MockGraphs(props) {
  const dataExp = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const dataGas = [10, 11, 11, 12, 10, 10, 11, 11, 10, 10, 12, 10, 11, 10, 10, 11]

  const data = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]

  const dataTest = [
    {
      month: new Date(2015, 0, 1),
      apples: 3840,
      bananas: 1920,
      cherries: 960,
      dates: 400
    },
    {
      month: new Date(2015, 1, 1),
      apples: 1600,
      bananas: 1440,
      cherries: 960,
      dates: 400
    },
    {
      month: new Date(2015, 2, 1),
      apples: 640,
      bananas: 960,
      cherries: 3640,
      dates: 400
    },
    {
      month: new Date(2015, 3, 1),
      apples: 3320,
      bananas: 480,
      cherries: 640,
      dates: 400
    }
  ]

  const colors = ['#8800cc', '#aa00ff', '#cc66ff', '#eeccff']
  const keys = ['apples', 'bananas', 'cherries', 'dates']
  const svgs = [
    { onPress: () => console.log('apples') },
    { onPress: () => console.log('bananas') },
    { onPress: () => console.log('cherries') },
    { onPress: () => console.log('dates') }
  ]

  const randomColor = () =>
    ('#' + ((Math.random() * 0xffffff) << 0).toString(16) + '000000').slice(0, 7)

  const pieData = data
    .filter(value => value > 0)
    .map((value, index) => ({
      value,
      svg: {
        fill: randomColor(),
        onPress: () => console.log('press', index)
      },
      key: `pie-${index}`
    }))

  return (
    <View>
      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Eksoda</Text>
      </View>
      <LineChart
        style={{ height: 200 }}
        data={dataExp}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}
      >
        <Grid />
      </LineChart>

      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Kostos</Text>
      </View>
      <PieChart style={{ height: 200 }} data={pieData} />

      <View>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Katanalosi</Text>
      </View>
      <StackedAreaChart
        style={{ height: 200, paddingVertical: 16 }}
        data={dataTest}
        keys={keys}
        colors={colors}
        curve={shape.curveNatural}
        showGrid={false}
        svgs={svgs}
      />
    </View>
  )
}
