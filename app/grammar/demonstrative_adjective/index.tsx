import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function DemonstrativeAdjectivesExplanationExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Stack.Screen options={{ title: 'Demonstrative Adjective' }} />
      
      <Text style={styles.paragraph}>
        Demonstrative adjectives in French, known as <Text style={styles.bold}>les adjectifs démonstratifs</Text>, are used to point out specific nouns. They are equivalent to "this," "that," "these," and "those" in English. Like all adjectives in French, they must agree in gender and number with the noun they modify.
      </Text>

      <Text style={styles.subHeading}>Forms of Demonstrative Adjectives:</Text>
      <Text style={styles.subHeadingDescription}>
        There are four main forms, which change based on the gender and number of the noun they precede:
      </Text>

      {/* Demonstrative Adjectives Table */}
      <View style={styles.tableContainer}>
        {/* Table Header Row */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableHeader]}> </Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Masculine Singular</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Feminine Singular</Text>
          <Text style={[styles.tableCell, styles.tableHeader]}>Plural (Masculine & Feminine)</Text>
        </View>
        {/* Table Row 1 */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableRowLabel]}>Before a consonant</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>ce</Text> (this/that)</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>cette</Text> (this/that)</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>ces</Text> (these/those)</Text>
        </View>
        {/* Table Row 2 */}
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.tableRowLabel]}>Before a vowel or silent 'h'</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>cet</Text> (this/that)</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>cette</Text> (this/that)</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>ces</Text> (these/those)</Text>
        </View>
      </View>

      <Text style={styles.subHeading}>Key Points and Usage:</Text>

      {/* Usage Section */}
      <View style={styles.bulletPointContainer}>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>1. Agreement in Gender and Number:</Text>
          {'\n'}  • <Text style={styles.bold}>Ce:</Text> Used before masculine singular nouns starting with a consonant.
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Ce</Text> livre (this/that book)</Text>
          {'\n'}  • <Text style={styles.bold}>Cet:</Text> Used before masculine singular nouns starting with a vowel (<Text style={styles.italic}>a, e, i, o, u</Text>) or a silent 'h' to avoid a hiatus.
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Cet</Text> arbre (this/that tree)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Cet</Text> homme (this/that man)</Text>
          {'\n'}  • <Text style={styles.bold}>Cette:</Text> Used before all feminine singular nouns.
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Cette</Text> maison (this/that house)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Cette</Text> amie (this/that friend - feminine)</Text>
          {'\n'}  • <Text style={styles.bold}>Ces:</Text> Used before all plural nouns (masculine and feminine).
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Ces</Text> voitures (these/those cars)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Ces</Text> enfants (these/those children)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>2. Placement:</Text>
          {'\n'}  Demonstrative adjectives are always placed directly <Text style={styles.italic}>before</Text> the noun they modify. They replace an article (like <Text style={styles.italic}>le, la, les, un, une, des</Text>).
          {'\n    '}<Text style={styles.exampleTextItalic}>Incorrect: <Text style={styles.italic}>Le ce livre</Text> (The this book)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Correct: <Text style={styles.bold}>Ce</Text> livre (This book)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>3. Distinguishing "This/These" vs. "That/Those":</Text>
          {'\n'}  French demonstrative adjectives do not inherently distinguish between "this/these" (near) and "that/those" (far).
          {'\n'}  To make the distinction explicit, add suffixes to the noun: <Text style={styles.italic}>-ci</Text> (for "here" / nearby) or <Text style={styles.italic}>-là</Text> (for "there" / farther away).
          {'\n'}  Structure: <Text style={styles.italic}>demonstrative adjective + noun + -ci / -là</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Cette</Text> chaise<Text style={styles.bold}>-ci</Text> (this chair here)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: <Text style={styles.bold}>Ces</Text> livres<Text style={styles.bold}>-là</Text> (those books there)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: Je préfère <Text style={styles.bold}>ce</Text> vin<Text style={styles.bold}>-ci</Text>. (I prefer this wine here.)</Text>
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: Tu aimes <Text style={styles.bold}>cet</Text> ordinateur<Text style={styles.bold}>-là</Text> ? (Do you like that computer there?)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>4. Used to Point Out:</Text>
          {'\n'}  Their primary function is to point out or specify a particular person, animal, or thing from a group.
          {'\n    '}<Text style={styles.exampleTextItalic}>Example: Regarde <Text style={styles.bold}>cette</Text> fleur ! (Look at this flower!)</Text>
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Mastering demonstrative adjectives is fundamental for precise communication in French, allowing you to clearly indicate which noun you are referring to.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
    color: '#555',
  },
  subHeadingDescription: {
    fontSize: 16,
    marginBottom: 10,
    color: '#444',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  tableContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 20,
    backgroundColor: '#fff',
    overflow: 'hidden', 
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tableCell: {
    flex: 1,
    padding: 10,
    fontSize: 15,
    textAlign: 'center',
  },
  tableHeader: {
    backgroundColor: '#e0f7fa',
    fontWeight: 'bold',
    color: '#00796b',
  },
  tableRowLabel: {
    textAlign: 'left',
    paddingLeft: 15,
    fontWeight: '600',
    color: '#555',
    flex: 1.5, 
  },
  bulletPointContainer: {
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  exampleTextItalic: {
    fontStyle: 'italic',
    color: '#2e7d32',
    marginTop: 5,
    marginLeft: 20,
  },
});
