import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FrenchPluralizationRulesExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
         <Stack.Screen options={{ title: 'Plurals' }} />

      <Text style={styles.heading}>French Pluralization Rules</Text>
      <Text style={styles.paragraph}>
        Generally, to form plurals in French, you can follow these rules:
      </Text>

      {/* Rule 1: Add 's' */}
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>
          1. Add an <Text style={styles.bold}>-s</Text> to the end of the word.
        </Text>
        <Text style={styles.exampleText}>
          <Text style={styles.italic}>Example:</Text> la chaise / les <Text style={styles.bold}>chaises</Text> (the chair / the chairs)
        </Text>
      </View>

      {/* Rule 2: Nouns ending in s, x, or z */}
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>
          2. Nouns ending in <Text style={styles.bold}>-s, -x,</Text> or <Text style={styles.bold}>-z</Text> do not change in the plural.
        </Text>
        <Text style={styles.exampleText}>
          <Text style={styles.italic}>Example:</Text> la souris / les <Text style={styles.bold}>souris</Text> (the mouse / the mice)
        </Text>
      </View>

      {/* Rule 3: Nouns ending in al, ail, or au */}
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>
          3. Nouns ending in <Text style={styles.bold}>-al, -ail,</Text> or <Text style={styles.bold}>-au</Text> in the singular generally end in <Text style={styles.bold}>-aux</Text> in the plural.
        </Text>
        <Text style={styles.exampleText}>
          <Text style={styles.italic}>Example:</Text> l’animal / les <Text style={styles.bold}>animaux</Text> (the animal / the animals)
        </Text>
      </View>

      {/* Rule 4: Nouns ending in eu, eau or ou */}
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>
          4. Nouns ending in <Text style={styles.bold}>-eu, -eau</Text> or <Text style={styles.bold}>-ou</Text> in the singular generally add <Text style={styles.bold}>-x</Text> in the plural.
        </Text>
        <Text style={styles.exampleText}>
          <Text style={styles.italic}>Example:</Text> le bijou / les <Text style={styles.bold}>bijoux</Text> (the jewel / the jewels)
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Note that there are exceptions to these rules, but these cover most common cases.
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
   scrollViewContent: {
    flexGrow: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  ruleSection: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#3498db', 
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  exampleText: {
    fontSize: 16,
    color: '#2e7d32', 
    marginLeft: 10,
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});
