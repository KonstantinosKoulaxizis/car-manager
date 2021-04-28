import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import MainFilter from '../components/expenses/MainFilter'
import TablesView from '../components/expenses/TablesView'

export default function MockService(props) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('')
  const [openModal, setOpenModal] = useState(false)

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

  return (
    <View style={styles.container}>
      <MainFilter
        handleData={handleData}
        handleActiveTab={handleActiveTab}
        handleOpenModal={handleOpenModal}
      />

      {activeTab === 'table' && <TablesView data={data} openModal={openModal} />}
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
