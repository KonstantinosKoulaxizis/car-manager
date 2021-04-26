import React, { useEffect, useState } from 'react'
import { Input } from 'react-native-elements'
import moment from 'moment'

import { StyleSheet, View } from 'react-native'

export default function DatePicker(props) {
  const [day, setDay] = useState('')
  const [month, setMonth] = useState('')
  const [year, setYear] = useState('')

  const handleDateFormat = () => {
    const dateString = `${day}-${month}-${year}`
    const momentObj = moment.utc(dateString, 'DD-MM-YYYY')
    props.handleDate(momentObj)
  }

  const handleDateUpdate = (value, type) => {
    if (type === 'day') {
      if (value <= 31) {
        setDay(value)
      }
    } else if (type === 'month') {
      if (value <= 12) {
        setMonth(value)
      }
    } else if (type === 'year') {
      if (value.length <= 4) {
        setYear(value)
      }
    }
  }

  // TODO handle max day for month

  const handleError = () => {
    if (!day.length || !month.length || year.length < 4) {
      props.handleDateError(true)
    } else props.handleDateError(false)
  }

  const dateError = type => {
    if (type === 'day') {
      if (!day.length) {
        return true
      } else return false
    } else if (type === 'month') {
      if (!month.length) {
        return true
      } else return false
    } else if (type === 'year') {
      if (year.length < 4) {
        return true
      } else return false
    }
  }

  useEffect(() => {
    const newDate = moment(new Date(), 'DD/MM/YYY')

    setDay(newDate.format('D'))
    setMonth(newDate.format('M'))
    setYear(newDate.format('YYYY'))
  }, [])

  useEffect(() => {
    handleDateFormat()
    handleError()
  }, [day, month, year])

  return (
    <View style={styles.container}>
      <View style={styles.inputStyle}>
        <Input
          label='Ημέρα'
          onChangeText={value => handleDateUpdate(value, 'day')}
          value={day}
          keyboardType={'numeric'}
          errorStyle={{ color: '#ee3e54' }}
          errorMessage={dateError('day') ? 'Please enter a valid year' : ''}
          disabled={!props.editItem}
          labelStyle={props.smallSize ? { fontSize: 14 } : {}}
        />
      </View>

      <View style={styles.inputStyle}>
        <Input
          label='Μήνας'
          onChangeText={value => handleDateUpdate(value, 'month')}
          value={month}
          keyboardType={'numeric'}
          errorStyle={{ color: '#ee3e54' }}
          errorMessage={dateError('month') ? 'Please enter a valid year' : ''}
          disabled={!props.editItem}
          labelStyle={props.smallSize ? { fontSize: 14 } : {}}
        />
      </View>

      <View style={styles.inputStyle}>
        <Input
          label='Χρονιά'
          onChangeText={value => handleDateUpdate(value, 'year')}
          value={year}
          keyboardType={'numeric'}
          errorStyle={{ color: '#ee3e54' }}
          errorMessage={dateError('year') ? 'Please enter a valid year' : ''}
          disabled={!props.editItem}
          labelStyle={props.smallSize ? { fontSize: 14 } : {}}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 60
  },
  inputStyle: {
    width: '33%',
    height: 40
  }
})
