import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { Modal, StyleSheet, Text, View, ScrollView } from 'react-native'
import { Button, PricingCard } from 'react-native-elements'
import { Snackbar } from 'react-native-paper'

const ProModal = props => {
  const [visible, setVisible] = useState(false)

  const onDismissSnackBar = () => setVisible(false)

  return (
    <Modal
      animationType='fade'
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.handleModalStatus}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            buttonStyle={styles.closeButton}
            containerStyle={{ borderRadius: 50, position: 'absolute', right: 15, top: 15 }}
            onPress={props.handleModalStatus}
            icon={<Icon name='close-thick' size={12} color='#f0f0f0' />}
          />
          <Text style={styles.modalText}>Σύντομα κοντά σας</Text>
          <ScrollView>
            <PricingCard
              color='#4d5bb7'
              title='Το χρόνο'
              price='2.99 €'
              info={[
                'Πολλαπλά οχήματα',
                'Πολλαπλοί χρήστες',
                'Aποκλειστικες προσφορές',
                'Έξυπνες ειδοποιήσεις',
                'Αναλυτικές αναφορές εξόδων',
                'Ανάλυση σέρβις',
                '24ωρη εξυπηρέτηση πελατών'
              ]}
              button={{ title: 'Σύντομα κοντά σας' }}
              onButtonPress={() => setVisible(true)}
            />
            <View>
              <Text style={styles.subText}>
                {'\u2022'} Προσθέστε όσα οχήματα και χρήστες επιθυμείται, δείτε το συνολικό κόστος
                των οχημάτων σας αλλα και του κάθε ενός ξεχωριστά.
              </Text>
              <Text style={styles.subText}>
                {'\u2022'} Απέκτησε πλήρη έλεγχο στα έξοδα των οχημάτων σου με την χρήση των φίλτρων
                αναζήτησης καθώς και των διαγραμμάτων κατανάλωσης και εργασιών.
              </Text>
              <Text style={styles.subText}>
                {'\u2022'} Δες αναλυτικά τα σέρβις των οχημάτων σου και το αναλυτικό κόστος αυτόν
                καθώς και τον αριθμό επισκέψεων για την ίδια εργασία.
              </Text>
              <Text style={styles.subText}>
                {'\u2022'} Απέκτησε πρόσβαση σε μοναδικές και αποκλειστικες προσφορές.
              </Text>
              <Text style={styles.subText}>
                {'\u2022'} Κανε χρήση των έξυπνων ειδοποιήσεων με βάση τα χιλιόμετρα ή την
                ημερομηνία.
              </Text>
              <Text style={styles.subText}>
                {'\u2022'} Τέλος οι κάτοχοι της Pro έκδοσης αποκτούν πρόσβαση στην 24ωρη εξυπηρέτηση
                πελατών μας.
              </Text>
            </View>
          </ScrollView>
        </View>
      </View>
      <Snackbar
        visible={visible}
        duration={2000}
        onDismiss={onDismissSnackBar}
        style={{ backgroundColor: '#7481db' }}
        theme={{ colors: { accent: '#bf1e2d' } }}
        action={{
          label: 'Κλεισιμο',
          onPress: () => {
            onDismissSnackBar
          }
        }}
      >
        Σύντομα κοντά σας
      </Snackbar>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)'
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  registerButton: {
    width: 240,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#1b2254'
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  },
  closeButton: {
    width: 28,
    height: 28,
    backgroundColor: '#bf1e2d'
  },
  subText: {
    fontSize: 15,
    marginBottom: 15,
    color: 'grey',
    fontWeight: 'bold'
  }
})

export default ProModal
