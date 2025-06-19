import React from 'react';
import { StyleSheet } from 'react-native';
import { DataTable } from 'react-native-paper';

const AbcdTable = () => {
  return (
<DataTable>
      <DataTable.Header>
        <DataTable.Title>Letter</DataTable.Title>
        <DataTable.Title>Pronunciation</DataTable.Title>
      </DataTable.Header>

      <DataTable.Row>
        <DataTable.Cell>A</DataTable.Cell>
        <DataTable.Cell>ah</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>B</DataTable.Cell>
        <DataTable.Cell>bay</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>C</DataTable.Cell>
        <DataTable.Cell>say</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>D</DataTable.Cell>
        <DataTable.Cell>day</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>E</DataTable.Cell>
        <DataTable.Cell>uh</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>F</DataTable.Cell>
        <DataTable.Cell>eff</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>G</DataTable.Cell>
        <DataTable.Cell>zheh</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>H</DataTable.Cell>
        <DataTable.Cell>ahsh</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>I</DataTable.Cell>
        <DataTable.Cell>ee</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>J</DataTable.Cell>
        <DataTable.Cell>zhee</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>K</DataTable.Cell>
        <DataTable.Cell>ka</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>L</DataTable.Cell>
        <DataTable.Cell>ell</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>M</DataTable.Cell>
        <DataTable.Cell>em</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>N</DataTable.Cell>
        <DataTable.Cell>en</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>O</DataTable.Cell>
        <DataTable.Cell>oh</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>P</DataTable.Cell>
        <DataTable.Cell>pay</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Q</DataTable.Cell>
        <DataTable.Cell>koo</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>R</DataTable.Cell>
        <DataTable.Cell>air</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>S</DataTable.Cell>
        <DataTable.Cell>ess</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>T</DataTable.Cell>
        <DataTable.Cell>tay</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>U</DataTable.Cell>
        <DataTable.Cell>ooh</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>V</DataTable.Cell>
        <DataTable.Cell>vay</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>W</DataTable.Cell>
        <DataTable.Cell>doo-bleh-vay</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>X</DataTable.Cell>
        <DataTable.Cell>eeks</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>Y</DataTable.Cell>
        <DataTable.Cell>ee-grek</DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row style={styles.alternateBox}>
        <DataTable.Cell>Z</DataTable.Cell>
        <DataTable.Cell>zed</DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

export default AbcdTable;



const styles = StyleSheet.create({
  alternateBox: {
    backgroundColor: '#ede8e8',
  }
})