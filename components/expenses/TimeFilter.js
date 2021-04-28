import React from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { StyleSheet, Text, View } from 'react-native'
import { Button, Divider } from 'react-native-elements'

export default function TimeFilter(props) {
  return (
    <View style={styles.container}>
      <View style={styles.buttonsView}>
        <Button
          title='Μήνας'
          buttonStyle={styles.typeButtonsLeft}
          titleStyle={{ fontSize: 14, color: '#1b2254' }}
          disabled
        />
        <Button
          title='Χρόνος'
          buttonStyle={styles.typeButtons}
          titleStyle={{ fontSize: 14, color: '#1b2254' }}
          disabled
        />
        <Button
          title='Συνολικά'
          buttonStyle={styles.typeButtonsRight}
          titleStyle={{ fontSize: 14, color: '#1b2254' }}
          disabled
        />
      </View>
      <Button
        title='Συγκεκριμένες ημερομηνίες'
        buttonStyle={styles.typeButtonCustom}
        titleStyle={{ fontSize: 14 }}
        disabled
      />

      <Text style={{ padding: 5, color: '#c44e4e', padding: 10 }}>
        * Όλες οι παραπάνω επιλογές για φιλτράρισμα με βάση την ημερομηνία είναι διαθέσιμες στη Pro
        έκδοση.
      </Text>
      <Button
        title='Κλείσιμο'
        onPress={props.handleOpenFilters}
        buttonStyle={{
          width: 150,
          alignSelf: 'center',
          backgroundColor: '#bf1e2d',
          borderRadius: 25
        }}
        icon={<Icon name='close-circle' size={25} color='#fff' style={{ marginRight: 10 }} />}
      />
      <Text> </Text>
      <Divider style={{ marginTop: 10 }} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignContent: 'flex-start'
  },
  buttonsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },
  typeButtons: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#858585',
    width: 115
  },
  typeButtonsLeft: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#858585',
    width: 115,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25
  },
  typeButtonsRight: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#858585',
    width: 112,
    borderTopRightRadius: 25,
    borderBottomRightRadius: 25
  },
  typeButtonCustom: {
    backgroundColor: '#f0f0f0',
    borderWidth: 5,
    borderColor: '#858585',
    marginTop: 30,
    borderRadius: 25
  }
})
