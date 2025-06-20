import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const frenchNumbersData = [
  { num: 0, french: 'zéro' },
  { num: 1, french: 'un' },
  { num: 2, french: 'deux' },
  { num: 3, french: 'trois' },
  { num: 4, french: 'quatre' },
  { num: 5, french: 'cinq' },
  { num: 6, french: 'six' },
  { num: 7, french: 'sept' },
  { num: 8, french: 'huit' },
  { num: 9, french: 'neuf' },
  { num: 10, french: 'dix' },
  { num: 11, french: 'onze' },
  { num: 12, french: 'douze' },
  { num: 13, french: 'treize' },
  { num: 14, french: 'quatorze' },
  { num: 15, french: 'quinze' },
  { num: 16, french: 'seize' },
  { num: 17, french: 'dix-sept' },
  { num: 18, french: 'dix-huit' },
  { num: 19, french: 'dix-neuf' },
  { num: 20, french: 'vingt' },
  { num: 21, french: 'vingt et un' },
  { num: 22, french: 'vingt-deux' },
  { num: 23, french: 'vingt-trois' },
  { num: 24, french: 'vingt-quatre' },
  { num: 25, french: 'vingt-cinq' },
  { num: 26, french: 'vingt-six' },
  { num: 27, french: 'vingt-sept' },
  { num: 28, french: 'vingt-huit' },
  { num: 29, french: 'vingt-neuf' },
  { num: 30, french: 'trente' },
  { num: 31, french: 'trente et un' },
  { num: 32, french: 'trente-deux' },
  { num: 33, french: 'trente-trois' },
  { num: 34, french: 'trente-quatre' },
  { num: 35, french: 'trente-cinq' },
  { num: 36, french: 'trente-six' },
  { num: 37, french: 'trente-sept' },
  { num: 38, french: 'trente-huit' },
  { num: 39, french: 'trente-neuf' },
  { num: 40, french: 'quarante' },
  { num: 41, french: 'quarante et un' },
  { num: 42, french: 'quarante-deux' },
  { num: 43, french: 'quarante-trois' },
  { num: 44, french: 'quarante-quatre' },
  { num: 45, french: 'quarante-cinq' },
  { num: 46, french: 'quarante-six' },
  { num: 47, french: 'quarante-sept' },
  { num: 48, french: 'quarante-huit' },
  { num: 49, french: 'quarante-neuf' },
  { num: 50, french: 'cinquante' },
  { num: 51, french: 'cinquante et un' },
  { num: 52, french: 'cinquante-deux' },
  { num: 53, french: 'cinquante-trois' },
  { num: 54, french: 'cinquante-quatre' },
  { num: 55, french: 'cinquante-cinq' },
  { num: 56, french: 'cinquante-six' },
  { num: 57, french: 'cinquante-sept' },
  { num: 58, french: 'cinquante-huit' },
  { num: 59, french: 'cinquante-neuf' },
  { num: 60, french: 'soixante' },
  { num: 61, french: 'soixante et un' },
  { num: 62, french: 'soixante-deux' },
  { num: 63, french: 'soixante-trois' },
  { num: 64, french: 'soixante-quatre' },
  { num: 65, french: 'soixante-cinq' },
  { num: 66, french: 'soixante-six' },
  { num: 67, french: 'soixante-sept' },
  { num: 68, french: 'soixante-huit' },
  { num: 69, french: 'soixante-neuf' },
  { num: 70, french: 'soixante-dix' },
  { num: 71, french: 'soixante et onze' },
  { num: 72, french: 'soixante-douze' },
  { num: 73, french: 'soixante-treize' },
  { num: 74, french: 'soixante-quatorze' },
  { num: 75, french: 'soixante-quinze' },
  { num: 76, french: 'soixante-seize' },
  { num: 77, french: 'soixante-dix-sept' },
  { num: 78, french: 'soixante-dix-huit' },
  { num: 79, french: 'soixante-dix-neuf' },
  { num: 80, french: 'quatre-vingts' },
  { num: 81, french: 'quatre-vingt-un' },
  { num: 82, french: 'quatre-vingt-deux' },
  { num: 83, french: 'quatre-vingt-trois' },
  { num: 84, french: 'quatre-vingt-quatre' },
  { num: 85, french: 'quatre-vingt-cinq' },
  { num: 86, french: 'quatre-vingt-six' },
  { num: 87, french: 'quatre-vingt-sept' },
  { num: 88, french: 'quatre-vingt-huit' },
  { num: 89, french: 'quatre-vingt-neuf' },
  { num: 90, french: 'quatre-vingt-dix' },
  { num: 91, french: 'quatre-vingt-onze' },
  { num: 92, french: 'quatre-vingt-douze' },
  { num: 93, french: 'quatre-vingt-treize' },
  { num: 94, french: 'quatre-vingt-quatorze' },
  { num: 95, french: 'quatre-vingt-quinze' },
  { num: 96, french: 'quatre-vingt-seize' },
  { num: 97, french: 'quatre-vingt-dix-sept' },
  { num: 98, french: 'quatre-vingt-dix-huit' },
  { num: 99, french: 'quatre-vingt-dix-neuf' },
  { num: 100, french: 'cent' },
];

const NumbersTable = () => {
  return (
    <ScrollView style={styles.scrollView}>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>Number</DataTable.Title>
          <DataTable.Title>French Pronunciation</DataTable.Title>
        </DataTable.Header>

        {frenchNumbersData.map((item, index) => (
          <DataTable.Row
            key={item.num}
            style={index % 2 !== 0 ? styles.alternateBox : null}
          >
            <DataTable.Cell>{item.num}</DataTable.Cell>
            <DataTable.Cell>{item.french}</DataTable.Cell>
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
  }
})

export default NumbersTable;