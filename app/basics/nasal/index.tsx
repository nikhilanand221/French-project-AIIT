import { Stack } from 'expo-router'
import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

export default function NasalVowelsScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <Stack.Screen options={{ title: 'Nasal Sounds' }} />

      <Text style={styles.title}>Nasal Vowels in French</Text>

      <Text style={styles.paragraph}>
        Nasal vowels are a distinctive feature of French pronunciation. Unlike oral vowels, where air passes only through the mouth, nasal vowels are produced by allowing air to escape through both the nose and the mouth. This gives them a characteristic "nasal" quality.
      </Text>

      <Text style={styles.paragraph}>
        While historically there were four, in modern standard/Parisian French, there are generally considered to be three distinct nasal vowels. However, some regions and older speakers may still distinguish four.
      </Text>

      <Text style={styles.sectionTitle}>Here are the French nasal vowels, their common spellings, and examples:</Text>

      <Text style={styles.subSectionTitle}>/ɑ̃/ (nasal "a")</Text>
      <Text style={styles.bulletPoint}>• Common spellings: an, am, en, em, aon</Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>chant</Text> (song), <Text style={styles.exampleWord}>blanc</Text> (white), <Text style={styles.exampleWord}>enfant</Text> (child), <Text style={styles.exampleWord}>temps</Text> (time), <Text style={styles.exampleWord}>chambre</Text> (room)</Text>
      <Text style={styles.bulletPoint}>• Pronunciation tip: Similar to the "ahn" sound in English, but without pronouncing the "n" as a distinct consonant.</Text>

      <Text style={styles.subSectionTitle}>/ɛ̃/ (nasal "i" or "e")</Text>
      <Text style={styles.bulletPoint}>• Common spellings: in, im, ain, aim, ein, eim, yn, ym, en, em (when preceded by i or y, e.g., <Text style={styles.exampleWord}>chien</Text>, <Text style={styles.exampleWord}>lycéen</Text>)</Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>vin</Text> (wine), <Text style={styles.exampleWord}>pain</Text> (bread), <Text style={styles.exampleWord}>faim</Text> (hunger), <Text style={styles.exampleWord}>bien</Text> (well), <Text style={styles.exampleWord}>important</Text> (important)</Text>
      <Text style={styles.bulletPoint}>• Pronunciation tip: Similar to the "ang" in "fang" in English, but again, without a distinct "g" sound. In many regions, this has merged with the /œ̃/ sound.</Text>

      <Text style={styles.subSectionTitle}>/ɔ̃/ (nasal "o")</Text>
      <Text style={styles.bulletPoint}>• Common spellings: on, om</Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>bon</Text> (good), <Text style={styles.exampleWord}>monde</Text> (world), <Text style={styles.exampleWord}>ombre</Text> (shadow), <Text style={styles.exampleWord}>long</Text> (long)</Text>
      <Text style={styles.bulletPoint}>• Pronunciation tip: Similar to the "ong" in "song" in English, but without a distinct "g" sound, and with rounded lips.</Text>

      <Text style={styles.paragraph}>
        <Text style={styles.italicText}>(Historically/Regionally) /œ̃/ (nasal "u")</Text>
      </Text>
      <Text style={styles.bulletPoint}>• Common spellings: un, um</Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>un</Text> (a/one), <Text style={styles.exampleWord}>brun</Text> (brown), <Text style={styles.exampleWord}>parfum</Text> (perfume), <Text style={styles.exampleWord}>humble</Text> (humble)</Text>
      <Text style={styles.bulletPoint}>• Note: In much of France, especially Paris, this sound has merged with /ɛ̃/. So <Text style={styles.exampleWord}>un</Text> is often pronounced the same as <Text style={styles.exampleWord}>in</Text>. However, it's still distinguished in some regions and by some speakers.</Text>

      <Text style={styles.sectionTitle}>Key Rules and Tips for Nasal Vowels:</Text>

      <Text style={styles.subSectionTitle}>• Vowel + M or N:</Text>
      <Text style={styles.paragraph}>
        A vowel becomes nasalized when it is followed by an <Text style={styles.boldText}>m</Text> or <Text style={styles.boldText}>n</Text> <Text style={styles.italicText}>in the same syllable</Text>, and that <Text style={styles.boldText}>m</Text> or <Text style={styles.boldText}>n</Text> is <Text style={styles.italicText}>not followed by another vowel</Text>.
      </Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>bon</Text> (nasal <Text style={styles.boldText}>on</Text>), <Text style={styles.exampleWord}>an</Text> (nasal <Text style={styles.boldText}>an</Text>)</Text>

      <Text style={styles.subSectionTitle}>• No Nasalization if M or N is Followed by a Vowel:</Text>
      <Text style={styles.paragraph}>
        If the <Text style={styles.boldText}>m</Text> or <Text style={styles.boldText}>n</Text> is followed by a vowel, it will generally <Text style={styles.boldText}>not</Text> be a nasal vowel. Instead, the <Text style={styles.boldText}>m</Text> or <Text style={styles.boldText}>n</Text> will be pronounced as a regular consonant.
      </Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>bonne</Text> (bon-nuh), <Text style={styles.exampleWord}>ami</Text> (ah-mee), <Text style={styles.exampleWord}>une</Text> (oon)</Text>

      <Text style={styles.subSectionTitle}>• Double M or N:</Text>
      <Text style={styles.paragraph}>
        A double <Text style={styles.boldText}>m</Text> or <Text style={styles.boldText}>n</Text> also typically denasalizes the vowel.
      </Text>
      <Text style={styles.bulletPoint}>• Examples: <Text style={styles.exampleWord}>année</Text> (ah-nay), <Text style={styles.exampleWord}>femme</Text> (fam)</Text>

      <Text style={styles.subSectionTitle}>• "Ent" ending:</Text>
      <Text style={styles.bulletPoint}>
        The "ent" ending of verbs (e.g., <Text style={styles.exampleWord}>ils chantent</Text>) is typically silent and does <Text style={styles.boldText}>not</Text> create a nasal sound.
      </Text>

      <Text style={styles.subSectionTitle}>• Practice:</Text>
      <Text style={styles.bulletPoint}>
        The best way to master French nasal vowels is to listen carefully to native speakers and imitate them. Pay attention to minimal pairs (words that differ only by one sound, like <Text style={styles.exampleWord}>beau</Text> (oral) vs. <Text style={styles.exampleWord}>bon</Text> (nasal)) to distinguish them.
      </Text>

      <Text style={styles.paragraph}>
        Learning to pronounce these sounds correctly is crucial for both speaking and understanding French, as nasalization can change the meaning of words.
      </Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  scrollViewContent: {
     flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 8,
  },
  
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },

  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },

  bulletPoint: {
    fontSize: 16,
    lineHeight: 24,
    marginLeft: 10,
    marginBottom: 5,
  },

  exampleWord: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },

  boldText: {
    fontWeight: 'bold',
  },

  italicText: {
    fontStyle: 'italic',
  },

})