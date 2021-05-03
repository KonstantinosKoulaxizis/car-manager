import React, { useState, useEffect } from 'react'
import { StyleSheet, View, ActivityIndicator } from 'react-native'

import MainFilter from '../components/expenses/MainFilter'
import TablesView from '../components/expenses/TablesView'
import GraphsView from '../components/expenses/GraphsView'

export default function MockService(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [tablesData, setTablesData] = useState([])
  const [total, setTotal] = useState({})

  const handleTablesData = () => {
    const formatedObj = {}
    const totalObject = {
      cost: 0,
      count: 0
    }

    data.forEach(i => {
      if (formatedObj[i.type]) {
        formatedObj[i.type].count = Number(formatedObj[i.type].count) + 1
        formatedObj[i.type].cost = Number(formatedObj[i.type].cost) + Number(i.cost)
      } else {
        formatedObj[i.type] = {
          count: 1,
          cost: i.cost,
          type: i.type
        }
      }

      totalObject.cost = Number(totalObject.cost) + Number(i.cost)
      totalObject.count = Number(totalObject.count) + 1
    })

    const formatedArray = Object.values(formatedObj)
    if (formatedArray) {
      setTablesData(formatedArray)
      setTotal(totalObject)
    }
  }
  const handleData = d => {
    setData(d)
  }

  const handleLoading = l => {
    setLoading(l)
  }

  const handleActiveTab = type => {
    setActiveTab(type)
  }

  const handleOpenModal = type => {
    setOpenModal(type)
  }

  useEffect(() => {
    if (data && data.length > 0) {
      handleTablesData()
    } else {
      setTablesData([])
    }
  }, [data])

  return (
    <View style={styles.container}>
      <MainFilter
        handleData={handleData}
        handleActiveTab={handleActiveTab}
        handleOpenModal={handleOpenModal}
        handleLoading={handleLoading}
        activeTab={activeTab}
      />
      {loading ? (
        <View style={{ marginTop: 300 }}>
          <ActivityIndicator size='large' color='#3c4689' />
        </View>
      ) : (
        <>
          {activeTab === 'table' && (
            <TablesView data={data} openModal={openModal} tablesData={tablesData} total={total} />
          )}
          {activeTab === 'graph' && <GraphsView data={tablesData} openModal={openModal} />}
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  }
})
