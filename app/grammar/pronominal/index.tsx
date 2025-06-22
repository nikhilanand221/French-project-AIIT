import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';

export default function PronominalVerbsScreen() {
  const reflexivePronouns = [
    { subject: 'Je', pronoun: 'me' },
    { subject: 'Tu', pronoun: 'te' },
    { subject: 'Il/Elle', pronoun: 'se' },
    { subject: 'Nous', pronoun: 'nous' },
    { subject: 'Vous', pronoun: 'vous' },
    { subject: 'Ils/Elles', pronoun: 'se' },
  ];

  const sappelerConjugation = [
    { subject: 'Je', conjugated: 'm’appelle' },
    { subject: 'Tu', conjugated: 't’appelles' },
    { subject: 'Il/elle', conjugated: 's’appelle' },
    { subject: 'Nous', conjugated: 'nous appelons' },
    { subject: 'Vous', conjugated: 'vous appelez' },
    { subject: 'Ils/elles', conjugated: 's’appellent' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Stack.Screen options={{ title: 'Pronominal Verb' }} />

      <Text style={styles.paragraph}>
        A <Text style={styles.boldText}>pronominal verb</Text> is a verb that is accompanied by a{' '}
        <Text style={styles.boldText}>reflexive pronoun</Text>. For example, in{' '}
        <Text style={styles.boldText}>S'appeler</Text> ('to be called'), 'se' is a reflexive pronoun.
      </Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>Pronominal verbs</Text> often express{' '}
        <Text style={styles.boldText}>reflexive actions</Text>, meaning the subject performs the action on itself. If the subject performs the action on someone else, the verb is not reflexive.
      </Text>

      <Text style={styles.subHeader}>Reflexive Pronouns:</Text>
      {reflexivePronouns.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          <Text style={styles.boldText}>{item.subject}</Text> - {item.pronoun}
        </Text>
      ))}

      <Text style={styles.subHeader}>Example: S'appeler (to be called)</Text>
      <Text style={styles.paragraph}>
        <Text style={styles.boldText}>Always subjects will be followed by reflexive pronouns in Pronominal verbs.</Text>
      </Text>
      {sappelerConjugation.map((item, index) => (
        <Text key={index} style={styles.listItem}>
          <Text style={styles.boldText}>{item.subject}</Text> {item.conjugated}
        </Text>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  subHeader: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#555',
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#444',
  },
  listItem: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#444',
  },
  boldText: {
    fontWeight: 'bold',
  },
});