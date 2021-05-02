import React, { useEffect, useState } from 'react'

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import { PieChart } from 'react-native-svg-charts'
import { Text, View, StyleSheet } from 'react-native'
import { Button, Divider } from 'react-native-elements'

import PieClick from '../expenses/graphs/PieClick'


export default function MockCostGraph(props) {
  const [pieData, setPieData] = useState([])
  const [activeTab, setActiveTab] = useState('cost')
  const [openModal, setOpenModal] = useState(false)
  const [selected, setSelected] = useState({})

  const handleOpenModal = () => {
    setOpenModal(!openModal)
  }

    const handleModalData = value => {
      const result = {
        name: value.name,
        cost: value.cost,
        count: value.count
      }

      setSelected(result)
      handleOpenModal()
    }

  const handlePieData = () => {
    const data = props.data
      .filter(value => value.cost > 0)
      .map((value, index) => ({
        value: activeTab === 'cost' ? Number(value.cost) : Number(value.count),
        svg: {
          fill: value.color,
          onPress: () => handleModalData(value)
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
    <View style={{ backgroundColor: '#fff', padding: 10, borderRadius: 25, width: 320,marginBottom: 20, marginTop: 20 }}>
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 22, fontWeight: 'bold', marginBottom: 20, alignSelf: 'center' }}>
          {props.title}
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
            title='Επισκέψεις'
            buttonStyle={styles.typeButtons}
            titleStyle={{ fontSize: 14, color: '#1b2254' }}
            onPress={() => handleActiveTab('visits')}
            disabledStyle={styles.typeButtonsActive}
            disabledTitleStyle={{ color: '#fff' }}
            disabled={activeTab === 'visits'}
          />
        </View>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ justifyContent: 'center', alignItems: 'flex-start', marginBottom: 20 }}>
            {props.data.map(label => (
              <View key={label.color} style={{ flexDirection: 'row' }}>
                <Icon
                  name='brightness-1'
                  size={20}
                  color={label.color}
                  style={{ marginRight: 10 }}
                />
                <Text style={{ fontWeight: 'bold', color: '#3c4743' }}>{label.name}</Text>
              </View>
            ))}
          </View>
        </View>
      </View>
      <PieChart style={{ height: 200, width: 200, alignSelf: 'center' }} data={pieData} />
      <Divider style={{ marginTop: 20 }} />
      {openModal && (
        <PieClick
          modalVisible={openModal}
          handleModalStatus={handleOpenModal}
          selected={selected}
        />
      )}
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
