import React from 'react'

import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { Divider } from 'react-native-elements'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function MockStatsTable(props) {
  const isOdd = num => {
    return num % 2
  }
  return (
    <View style={styles.container}>
      <View>
        <Divider style={{ marginBottom: 15, marginTop: 5 }} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 15,
            width: 320
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 3, color: '#3c4743' }}>Είδος</Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 2, color: '#3c4743' }}>
            Κόστος
          </Text>
          <Text style={{ fontSize: 16, fontWeight: 'bold', flex: 1, color: '#3c4743' }}>Φορές</Text>
        </View>
        <Divider style={{ marginBottom: 5 }} />
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 320,
              height: 40,
              backgroundColor: '#1b2254'
            }}
          >
            <Text
              style={{
                fontSize: 17,
                fontWeight: 'bold',
                color: '#fafafa',
                flex: 3,
                marginLeft: 5
              }}
            >
              Σύνολο
            </Text>
            <Text style={{ fontSize: 17, fontWeight: 'bold', flex: 2, color: '#fafafa' }}>
              € 1325
            </Text>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 17,
                  fontWeight: 'bold',
                  alignSelf: 'center',
                  color: '#fafafa'
                }}
              >
                17
              </Text>
            </View>
          </View>
          {/* Service Arr */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 320,
              height: 40,
              backgroundColor: '#424a7f'
            }}
          >
            <View
              style={{
                flex: 3,
                marginLeft: 5,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Icon
                name={'wrench'}
                size={22}
                // color='#d2d6ef'
                color='#d3d3d3'
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#d3d3d3'
                }}
              >
                Service
              </Text>
            </View>
          </View>
          {props.MOCK_DATA_SERVICE.map((d, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 320,
                height: 40,
                backgroundColor: isOdd(index) ? '#9ca3d3' : '#fafafa'
              }}
            >
              <View
                style={{
                  flex: 3,
                  marginLeft: 5,
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#3f4845'
                  }}
                >
                  {/* {handleTypeName(d.type)} */}
                  {d.name}
                </Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 2, color: '#3f4845' }}>
                € {d.cost}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: '#3f4845'
                  }}
                >
                  {d.count}
                </Text>
              </View>
            </View>
          ))}
          {/* Tire Types*/}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: 320,
              height: 40,
              backgroundColor: '#424a7f'
            }}
          >
            <View
              style={{
                flex: 3,
                marginLeft: 5,
                flexDirection: 'row',
                justifyContent: 'center'
              }}
            >
              <Icon
                name={'car-traction-control'}
                size={22}
                // color='#d2d6ef'
                color='#d3d3d3'
                style={{ marginRight: 10 }}
              />
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#d3d3d3'
                }}
              >
                Ελαστικά
              </Text>
            </View>
          </View>
          {props.MOCK_DATA_TIRES.map((d, index) => (
            <View
              key={index}
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: 320,
                height: 40,
                backgroundColor: isOdd(index) ? '#9ca3d3' : '#fafafa'
              }}
            >
              <View
                style={{
                  flex: 3,
                  marginLeft: 5,
                  flexDirection: 'row'
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    color: '#3f4845'
                  }}
                >
                  {/* {handleTypeName(d.type)} */}
                  {d.name}
                </Text>
              </View>
              <Text style={{ fontSize: 15, fontWeight: 'bold', flex: 2, color: '#3f4845' }}>
                € {d.cost}
              </Text>
              <View style={{ flex: 1 }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                    alignSelf: 'center',
                    color: '#3f4845'
                  }}
                >
                  {d.count}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: 'flex-start',
    // alignContent: 'flex-start',
    // alignSelf: 'center'
  },
  containerModal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    alignSelf: 'center',
    marginTop: -230
  },
  textTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center'
  }
})
