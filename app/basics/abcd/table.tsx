import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const frenchAlphabetData = [
  { letter: 'A', pronunciation: 'ah' },
  { letter: 'B', pronunciation: 'bay' },
  { letter: 'C', pronunciation: 'say' },
  { letter: 'D', pronunciation: 'day' },
  { letter: 'E', pronunciation: 'uh' },
  { letter: 'F', pronunciation: 'eff' },
  { letter: 'G', pronunciation: 'zheh' },
  { letter: 'H', pronunciation: 'ahsh' },
  { letter: 'I', pronunciation: 'ee' },
  { letter: 'J', pronunciation: 'zhee' },
  { letter: 'K', pronunciation: 'ka' },
  { letter: 'L', pronunciation: 'ell' },
  { letter: 'M', pronunciation: 'em' },
  { letter: 'N', pronunciation: 'en' },
  { letter: 'O', pronunciation: 'oh' },
  { letter: 'P', pronunciation: 'pay' },
  { letter: 'Q', pronunciation: 'koo' },
  { letter: 'R', pronunciation: 'air' },
  { letter: 'S', pronunciation: 'ess' },
  { letter: 'T', pronunciation: 'tay' },
  { letter: 'U', pronunciation: 'ooh' },
  { letter: 'V', pronunciation: 'vay' },
  { letter: 'W', pronunciation: 'doo-bleh-vay' },
  { letter: 'X', pronunciation: 'eeks' },
  { letter: 'Y', pronunciation: 'ee-grek' },
  { letter: 'Z', pronunciation: 'zed' },
];

const AbcdTable = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Letter</DataTable.Title>
          <DataTable.Title>Pronunciation</DataTable.Title>
        </DataTable.Header>

        {frenchAlphabetData.map((item, index) => (
          <DataTable.Row
            key={item.letter}
            style={index % 2 !== 0 ? styles.alternateBox : null}
          >
            <DataTable.Cell>{item.letter}</DataTable.Cell>
            <DataTable.Cell>{item.pronunciation}</DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
   scrollView: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  alternateBox: {
    backgroundColor: '#ede8e8',
  },
});

export default AbcdTable;