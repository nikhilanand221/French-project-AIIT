import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { DataTable, Text } from 'react-native-paper';

const categorizedFrenchPronounsData = [
  {
    category: 'First Person',
    pronouns: [
      { english: 'I', french: 'je' },
      { english: 'We', french: 'nous' },
    ],
  },
  {
    category: 'Second Person',
    pronouns: [
      { english: 'You (singular informal)', french: 'tu' },
      { english: 'You (plural/formal)', french: 'vous' },
    ],
  },
  {
    category: 'Third Person',
    pronouns: [
      { english: 'He', french: 'il' },
      { english: 'She', french: 'elle' },
      { english: 'They (masculine)', french: 'ils' },
      { english: 'They (feminine)', french: 'elles' },
      
    ],
  },
];

const FrenchPronounsTable = () => {
  let globalRowIndex = 0;

  return (
    <ScrollView>
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>English Pronoun</DataTable.Title>
          <DataTable.Title>French</DataTable.Title>
        </DataTable.Header>

        {categorizedFrenchPronounsData.map((categoryData, categoryIndex) => (
          <React.Fragment key={categoryData.category}>
            {categoryIndex > 0 && <View style={styles.categoryGap} />}

            <DataTable.Row style={styles.categoryHeaderRow}>
              <DataTable.Cell style={styles.categoryHeaderText}>
                <Text style={styles.categoryHeaderTextContent}>
                  {categoryData.category}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>

            {categoryData.pronouns.map((item, itemIndex) => {
              const isAlternate = (globalRowIndex % 2 !== 0);
              globalRowIndex++;
              return (
                <DataTable.Row
                  key={item.english}
                  style={isAlternate ? styles.alternateBox : null}
                >
                  <DataTable.Cell>{item.english}</DataTable.Cell>
                  <DataTable.Cell>{item.french}</DataTable.Cell>
                </DataTable.Row>
              );
            })}
          </React.Fragment>
        ))}
      </DataTable>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  alternateBox: {
    backgroundColor: '#ede8e8',
  },
  categoryHeaderRow: {
    backgroundColor: '#e0e0e0',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  categoryHeaderText: {
    flex: 2,
    justifyContent: 'center',
    paddingLeft: 10,
    paddingVertical: 8,
  },
  categoryHeaderTextContent: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  categoryGap: {
    height: 40, 
    backgroundColor: 'transparent', 
  },
});

export default FrenchPronounsTable;