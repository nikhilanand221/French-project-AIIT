import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FuturProcheExplanationExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stack.Screen options={{ title: 'Futur Proche' }} />
     
      <Text style={styles.paragraph}>
        The "futur proche" in French translates to the "near future" or "immediate future" in English. It's used to talk about events that are going to happen very soon.
      </Text>

      <Text style={styles.subHeading}>Formation:</Text>
      <Text style={styles.formula}>
        Subject + conjugated form of "aller" (to go) + infinitive verb
      </Text>

      <Text style={styles.subHeading}>"Aller" Conjugation (Present Tense):</Text>
      <View style={styles.conjugationContainer}>
        <Text style={styles.conjugationText}>je <Text style={styles.bold}>vais</Text> (I go)</Text>
        <Text style={styles.conjugationText}>tu <Text style={styles.bold}>vas</Text> (you go - informal singular)</Text>
        <Text style={styles.conjugationText}>il/elle/on <Text style={styles.bold}>va</Text> (he/she/one goes)</Text>
        <Text style={styles.conjugationText}>nous <Text style={styles.bold}>allons</Text> (we go)</Text>
        <Text style={styles.conjugationText}>vous <Text style={styles.bold}>allez</Text> (you go - formal singular or plural)</Text>
        <Text style={styles.conjugationText}>ils/elles <Text style={styles.bold}>vont</Text> (they go)</Text>
      </View>

      <Text style={styles.paragraph}>
        <Text style={styles.bold}>Infinitive verb:</Text> This is the base form of the verb (e.g., manger - to eat, parler - to speak, faire - to do/make).
      </Text>

      <Text style={styles.subHeading}>Examples:</Text>
      <View style={styles.exampleContainer}>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Je vais manger.</Text> (I am going to eat.)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Tu vas étudier.</Text> (You are going to study.)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Il va pleuvoir.</Text> (It is going to rain.)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Nous allons partir.</Text> (We are going to leave.)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Vous allez regarder un film.</Text> (You are going to watch a movie.)</Text>
        <Text style={styles.exampleText}>• <Text style={styles.bold}>Elles vont dormir.</Text> (They are going to sleep.)</Text>
      </View>

      <Text style={styles.subHeading}>When to use the futur proche:</Text>
      <View style={styles.bulletPointContainer}>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Actions happening very soon:</Text> As the name suggests, it's for things that are about to occur.
          {'\n  '}  - <Text style={styles.exampleTextItalic}>Je vais sortir dans cinq minutes. (I'm going to go out in five minutes.)</Text>
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Planned actions in the near future:</Text> Even if not immediate, it can be used for definite plans.
          {'\n  '}  - <Text style={styles.exampleTextItalic}>Nous allons voyager en France cet été. (We are going to travel to France this summer.)</Text>
        </Text>
        <Text style={styles.bulletPoint}>
          • <Text style={styles.bold}>Indicating a strong intention:</Text>
          {'\n  '}  - <Text style={styles.exampleTextItalic}>Je vais t'aider. (I am going to help you.)</Text>
        </Text>
      </View>

      <Text style={styles.paragraph}>
        It's a very common and useful tense in everyday French conversation!
      </Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
 scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
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
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 15,
    color: '#444',
  },
  formula: {
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
    backgroundColor: '#e0f7fa',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    textAlign: 'center',
    color: '#00796b',
  },
  conjugationContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15,
  },
  conjugationText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
  },
  exampleContainer: {
    backgroundColor: '#e8f5e9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  exampleText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 5,
    color: '#2e7d32',
  },
  exampleTextItalic: {
    fontStyle: 'italic',
    color: '#4caf50',
  },
  bulletPointContainer: {
    marginBottom: 15,
  },
  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    color: '#444',
  },
});
