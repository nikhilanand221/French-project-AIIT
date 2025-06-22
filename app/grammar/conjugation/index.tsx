import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const erVerbConjugationData = [
  { pronoun: 'Je', ending: 'e' },
  { pronoun: 'Tu', ending: 'es' },
  { pronoun: 'Il/Elle/On', ending: 'e' },
  { pronoun: 'Nous', ending: 'ons' },
  { pronoun: 'Vous', ending: 'ez' },
  { pronoun: 'Ils/Elles', ending: 'ent' },
];

const irVerbConjugationData = [
  { pronoun: 'Je', ending: 'is' },
  { pronoun: 'Tu', ending: 'is' },
  { pronoun: 'Il/Elle/On', ending: 'it' },
  { pronoun: 'Nous', ending: 'issons' },
  { pronoun: 'Vous', ending: 'issez' },
  { pronoun: 'Ils/Elles', ending: 'issent' },
];

const reVerbConjugationData = [
  { pronoun: 'Je', ending: 's' },
  { pronoun: 'Tu', ending: 's' },
  { pronoun: 'Il/Elle/On', ending: '-' },
  { pronoun: 'Nous', ending: 'ons' },
  { pronoun: 'Vous', ending: 'ez' },
  { pronoun: 'Ils/Elles', ending: 'ent' },
];

export default function conjugation() {
  return (
    <ScrollView style={styles.scrollView}>
       <Stack.Screen options={{ title: 'Verb Conjugation' }} />
       
      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>ER Ending Verbs</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Pronoun</DataTable.Title>
            <DataTable.Title>Ending</DataTable.Title>
          </DataTable.Header>
          {erVerbConjugationData.map((item, index) => (
            <DataTable.Row
              key={item.pronoun}
              style={index % 2 !== 0 ? styles.alternateBox : null}
            >
              <DataTable.Cell>{item.pronoun}</DataTable.Cell>
              <DataTable.Cell>{item.ending}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
        <Text style={styles.exampleTitle}>Example: Parler- To speak</Text>
        <View style={styles.exampleText}>
           <Text>Je parl<Text style={styles.exampleHighlight}>e</Text></Text>
           <Text>Tu  parl<Text style={styles.exampleHighlight}>es</Text></Text>     
           <Text>Il  parl<Text style={styles.exampleHighlight}>e</Text></Text>      
           <Text>Elle parl<Text style={styles.exampleHighlight}>e</Text></Text>      
           <Text>Nous parl<Text style={styles.exampleHighlight}>ons</Text></Text>      
           <Text>Vous parl<Text style={styles.exampleHighlight}>ez</Text></Text>      
           <Text>Ils parl<Text style={styles.exampleHighlight}>ent</Text></Text>      
           <Text>Elles parl<Text style={styles.exampleHighlight}>ent</Text></Text>      
         </View>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>IR Ending Verbs</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Pronoun</DataTable.Title>
            <DataTable.Title>Ending</DataTable.Title>
          </DataTable.Header>
          {irVerbConjugationData.map((item, index) => (
            <DataTable.Row
              key={item.pronoun}
              style={index % 2 !== 0 ? styles.alternateBox : null}
            >
              <DataTable.Cell>{item.pronoun}</DataTable.Cell>
              <DataTable.Cell>{item.ending}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
         <Text style={styles.exampleTitle}>Example: Finir- To finish</Text>
        <View style={styles.exampleText}>
           <Text>Je fin<Text style={styles.exampleHighlight}>is</Text></Text>
           <Text>Tu fin<Text style={styles.exampleHighlight}>is</Text></Text>     
           <Text>Il fin<Text style={styles.exampleHighlight}>it</Text></Text>      
           <Text>Elle fin<Text style={styles.exampleHighlight}>it</Text></Text>      
           <Text>Nous fin<Text style={styles.exampleHighlight}>issons</Text></Text>      
           <Text>Vous fin<Text style={styles.exampleHighlight}>issez</Text></Text>      
           <Text>Ils fin<Text style={styles.exampleHighlight}>issent</Text></Text>      
           <Text>Elles fin<Text style={styles.exampleHighlight}>issent</Text></Text>      
         </View>
      </View>

      <View style={styles.tableContainer}>
        <Text style={styles.tableTitle}>RE Ending Verbs</Text>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Pronoun</DataTable.Title>
            <DataTable.Title>Ending</DataTable.Title>
          </DataTable.Header>
          {reVerbConjugationData.map((item, index) => (
            <DataTable.Row
              key={item.pronoun}
              style={index % 2 !== 0 ? styles.alternateBox : null}
            >
              <DataTable.Cell>{item.pronoun}</DataTable.Cell>
              <DataTable.Cell>{item.ending}</DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
         <Text style={styles.exampleTitle}>Example: Répondre- to answer</Text>
        <View style={styles.exampleText}>
           <Text>Je répond<Text style={styles.exampleHighlight}>s</Text></Text>
           <Text>Tu répond<Text style={styles.exampleHighlight}>s</Text></Text>     
           <Text>Il répond</Text>      
           <Text>Elle répond</Text>      
           <Text>Nous répondon<Text style={styles.exampleHighlight}>s</Text></Text>      
           <Text>Vous répond<Text style={styles.exampleHighlight}>ez</Text></Text>      
           <Text>Ils répond<Text style={styles.exampleHighlight}>ent</Text></Text>      
           <Text>Elles répond<Text style={styles.exampleHighlight}>ent</Text></Text>      
         </View>
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  scrollView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },

  tableContainer: {
    marginBottom: 20, 
  },

  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },

  alternateBox: {
    backgroundColor: '#ede8e8',
  },

  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  
  exampleText: {
    fontSize: 16,
    paddingHorizontal: 10
  },

  exampleHighlight: {
    color: 'red',
  }
});

