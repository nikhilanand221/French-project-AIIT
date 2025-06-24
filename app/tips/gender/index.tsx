import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FrenchGenderRulesExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stack.Screen options={{ title: 'Genders of Words' }} />

      <Text style={styles.heading}>Figuring Out Noun Gender in French</Text>
      <Text style={styles.paragraph}>
        Determining whether a noun is masculine or feminine in French can be tricky, but there are some common patterns and endings that can help. Remember that exceptions always exist!
      </Text>

      {/* Section: Masculine Nouns */}
      <Text style={styles.subHeading}>Common Indicators for Masculine Nouns:</Text>
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>1. Nouns often ending in:</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-age:</Text> <Text style={styles.exampleText}>le voyage, le fromage</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ment:</Text> <Text style={styles.exampleText}>le gouvernement, le mouvement</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-il, -ail:</Text> <Text style={styles.exampleText}>le soleil, le travail</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-eau:</Text> <Text style={styles.exampleText}>le bateau, le bureau</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-isme:</Text> <Text style={styles.exampleText}>le tourisme, le socialisme</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-oir:</Text> <Text style={styles.exampleText}>le miroir, le couloir</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-eur</Text> (for inanimate objects/machines): <Text style={styles.exampleText}>le moteur, l'ordinateur</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-on</Text> (but beware of exceptions like <Text style={styles.italic}>la maison, la chanson</Text>): <Text style={styles.exampleText}>le poisson, le pantalon</Text></Text>
      </View>
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>2. Categories that are often masculine:</Text>
        <Text style={styles.bulletPoint}>• Days of the week, months, seasons: <Text style={styles.exampleText}>le lundi, le juillet, le printemps</Text></Text>
        <Text style={styles.bulletPoint}>• Colors (when used as nouns): <Text style={styles.exampleText}>le rouge, le bleu</Text></Text>
        <Text style={styles.bulletPoint}>• Languages: <Text style={styles.exampleText}>le français, l'anglais</Text></Text>
        <Text style={styles.bulletPoint}>• Trees: <Text style={styles.exampleText}>le chêne, le sapin</Text></Text>
        <Text style={styles.bulletPoint}>• Nouns derived from verbs (often infinitives): <Text style={styles.exampleText}>le dîner, le savoir</Text></Text>
      </View>

      {/* Section: Feminine Nouns */}
      <Text style={styles.subHeading}>Common Indicators for Feminine Nouns:</Text>
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>1. Nouns often ending in:</Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-tion, -sion:</Text> <Text style={styles.exampleText}>la question, la décision</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-té:</Text> <Text style={styles.exampleText}>la liberté, la beauté</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ette:</Text> <Text style={styles.exampleText}>la serviette, la bicyclette</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-euse:</Text> <Text style={styles.exampleText}>la danseuse, la vendeuse</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ice, -esse:</Text> <Text style={styles.exampleText}>la justice, la richesse</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ance, -ence:</Text> <Text style={styles.exampleText}>la chance, la différence</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ie:</Text> <Text style={styles.exampleText}>la boulangerie, la vie</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ure:</Text> <Text style={styles.exampleText}>la voiture, la culture</Text></Text>
        <Text style={styles.bulletPoint}>• <Text style={styles.bold}>-ade:</Text> <Text style={styles.exampleText}>la salade, la promenade</Text></Text>
      </View>
      <View style={styles.ruleSection}>
        <Text style={styles.ruleTitle}>2. Categories that are often feminine:</Text>
        <Text style={styles.bulletPoint}>• Names of sciences: <Text style={styles.exampleText}>la chimie, la physique</Text></Text>
        <Text style={styles.bulletPoint}>• Fruits (most, but with exceptions like <Text style={styles.italic}>le citron, le raisin</Text>): <Text style={styles.exampleText}>la pomme, la banane</Text></Text>
      </View>

      <Text style={styles.paragraph}>
        While these guidelines are helpful, the most reliable way to know a noun's gender is to learn it along with the noun itself (e.g., 'le livre' vs. 'la table') or to consult a dictionary.
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
  subHeading: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 25,
    marginBottom: 10,
    color: '#555',
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
    borderLeftColor: '#3498db', // Consistent blue accent
  },
  ruleTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  bulletPoint: {
    fontSize: 16,
    marginBottom: 5,
    marginLeft: 10, // Indent for bullet points
    color: '#444',
  },
  exampleText: {
    color: '#2e7d32', // Consistent green for examples
    fontStyle: 'italic',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
});
