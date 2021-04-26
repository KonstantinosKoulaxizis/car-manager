import React, { useState } from 'react'

import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, Divider } from 'react-native-elements'
import DatePicker from '../components/DatePicker'
import Expenses from './mockCharts/Expenses'

export default function MockService(props) {
  const [selectedType, setSelectedType] = useState('book')
  const [reportType, setReportType] = useState('tables')

  const handleDate = date => {
    console.log(date)
  }

  const handleDateError = error => {
    console.log(error)
  }
  return (
    <View style={styles.container}>
      <View style={{ marginBottom: 30, flexDirection: 'row', justifyContent: 'center' }}>
        <Button
          title='Biblio service'
          buttonStyle={{ width: 150 }}
          disabled={selectedType === 'book'}
          onPress={() => setSelectedType('book')}
        />
        <Button
          title='Statistika'
          buttonStyle={{ width: 150 }}
          disabled={selectedType === 'stats'}
          onPress={() => setSelectedType('stats')}
        />
      </View>

      {selectedType === 'stats' && (
        <>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            <Button
              title='Pinakes'
              disabled={reportType === 'tables'}
              onPress={() => setReportType('tables')}
            />
            <Button
              title='Grafimata'
              disabled={reportType === 'graphs'}
              onPress={() => setReportType('graphs')}
            />
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
            <Button title='Minas' containerStyle={{ flex: 1, padding: 2 }} disabled />
            <Button title='Xronos' containerStyle={{ flex: 1, padding: 2 }} disabled />
            <Button title='Arxi' containerStyle={{ flex: 1, padding: 2 }} />
          </View>

          <View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <Text style={{ width: 100, marginTop: 20 }}>Arxi</Text>
              <DatePicker
                handleDate={handleDate}
                handleDateError={handleDateError}
                editItem={false}
                smallSize={true}
              />
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ width: 100, marginTop: 20 }}>Telos</Text>
              <DatePicker
                handleDate={handleDate}
                handleDateError={handleDateError}
                editItem={false}
                smallSize={true}
              />
            </View>
          </View>

          <Divider />
          {reportType === 'tables' && (
            <ScrollView>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}
              >
                <Text> </Text>
                <Text> </Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>€</Text>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>fores</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Sinolo</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>katanalosi</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Litra</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Kostos</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Anefodiasmoi</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Service</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>KTEO</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Elastika</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Asfaleia</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Karta</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Asfaleia</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Karta</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Asfaleia</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>

              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontSize: 17, width: 100, fontWeight: 'bold' }}>Karta</Text>
                <Text style={{ fontSize: 17 }}>2500 €</Text>
                <Text style={{ fontSize: 17 }}>17</Text>
              </View>
            </ScrollView>
          )}
          {reportType === 'graphs' && (
            <ScrollView>
              <Expenses />
            </ScrollView>
          )}
        </>
      )}

      {selectedType === 'book' && (
        <ScrollView>
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 25, marginBottom: 15 , marginBottom: 15 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imerominia: 15/07/2019</Text>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Erasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 25, marginBottom: 15  }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imerominia: 15/07/2019</Text>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 25, marginBottom: 15  }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imerominia: 15/07/2019</Text>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 25, marginBottom: 15  }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imerominia: 15/07/2019</Text>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
          </View>
          <View style={{ backgroundColor: '#f0f0f0', padding: 10, borderRadius: 25, marginBottom: 15  }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Imerominia: 15/07/2019</Text>
            <Divider />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
              <Text style={{ fontSize: 15, width: 100, fontWeight: 'bold' }}>Ergasia</Text>
              <Text style={{ fontSize: 17 }}>150 €</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    marginTop: 20,
    padding: 20
    // alignItems: 'center'
    // justifyContent: 'space-between'
    // justifyContent: 'center'
  }
})