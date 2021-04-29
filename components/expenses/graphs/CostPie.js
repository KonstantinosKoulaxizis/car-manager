import React, { useEffect, useState } from 'react'

import { PieChart } from 'react-native-svg-charts'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const LABELS = [
  {
    name: 'Ανεφοδιασμός',
    color: '#003f5c',
    icon: 'gas-station'
  },
  {
    name: 'Service',
    color: '#444e86',
    icon: 'wrench'
  },
  {
    name: 'Κ. Καυσαερίων',
    color: '#ffa600',
    icon: 'card-account-details-star'
  },
  {
    name: 'KTEO',
    color: '#955196',
    icon: 'car-settings'
  },
  {
    name: 'Ελαστικά',
    color: '#dd5182',
    icon: 'car-traction-control'
  },
  {
    name: 'Ασφάλεια',
    color: '#ff6e54',
    icon: 'card-account-details'
  }
]

export default function CostPie(props) {
  const [pieData, setPieData] = useState([])
  const [activeTab, setActiveTab] = useState('cost')

  const handleColor = type => {
    if (type === 'gas') {
      return '#003f5c'
    } else if (type === 'service') {
      return '#444e86'
    } else if (type === 'kteo') {
      return '#955196'
    } else if (type === 'tires') {
      return '#dd5182'
    } else if (type === 'insurance') {
      return '#ff6e54'
    } else if (type === 'fumes') {
      return '#ffa600'
    }
  }

  const handlePieData = () => {
    const data = props.data
      .filter(value => value.cost > 0)
      .map((value, index) => ({
        value: activeTab === 'cost' ? value.cost : value.count,
        svg: {
          fill: handleColor(value.type),
          onPress: () => console.log('press', value)
        },
        key: `pie-${index}`
      }))

    setPieData(data)
  }
  const handleActiveTab = type => {
    setActiveTab(type)
  }

  useEffect(() => {
    handlePieData()
  }, [activeTab])

  return (
    <View style={{ backgroundColor: '#dce0f2', padding: 10, borderRadius: 25, width: 320 }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>
          Καταμερισμός Εξόδων
        </Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
            marginBottom: 25
          }}
        >
          <Button
            title='Κόστος'
            buttonStyle={styles.typeButtons}
            titleStyle={{ fontSize: 14, color: '#1b2254' }}
            onPress={() => handleActiveTab('cost')}
            disabledStyle={styles.typeButtonsActive}
            disabledTitleStyle={{ color: '#fff' }}
            disabled={activeTab === 'cost'}
          />
          <Button
            title='Φορές'
            buttonStyle={styles.typeButtons}
            titleStyle={{ fontSize: 14, color: '#1b2254' }}
            onPress={() => handleActiveTab('visits')}
            disabledStyle={styles.typeButtonsActive}
            disabledTitleStyle={{ color: '#fff' }}
            disabled={activeTab === 'visits'}
          />
        </View>
        {/* TODO BUTTONS for type */}
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20 }}>
            {LABELS.map(label => (
              <View key={label.color} style={{ flexDirection: 'row' }}>
                <Icon
                  name='brightness-1'
                  size={20}
                  color={label.color}
                  style={{ marginRight: 10 }}
                />
                <Icon name={label.icon} size={20} color='#3c4743' style={{ marginRight: 10 }} />
                <Text style={{ fontWeight: 'bold', color: '#3c4743' }}>{label.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PieChart style={{ height: 200, width: 200, alignSelf: 'center' }} data={pieData} />
      <Divider style={{ marginTop: 20 }} />
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
    borderColor: '#1b2254',
    width: 120,
    borderRadius: 25
  }
})
