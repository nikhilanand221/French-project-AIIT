import { Stack } from 'expo-router'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

export default function SyllableDivisionScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Stack.Screen options={{ title: 'Syllable Division' }} />

      <View style={styles.syllableIntention}>
        <Text style={styles.syllableIntentionTitle}>Why Syllable Division Matters:</Text>
        <Text style={styles.syllableIntentionText}>
          Syllable division is crucial for correct pronunciation. It defines the natural "beats" or "chunks" of sound in words, aiding in rhythm, word stress, decoding unfamiliar words, and clear enunciation.
        </Text>
      </View>

      <Text style={styles.ruleTitle}>Rule 1: Single Consonant Between Vowels</Text>
      <Text style={styles.ruleText}>
        When a single consonant appears between two vowels, that consonant typically begins the new syllable.
      </Text>
      <Text style={styles.exampleText}>
        Example: A-vion (A/vion)
      </Text>

      <Text style={styles.ruleTitle}>Rule 2: Two Consonants Between Vowels</Text>
      <Text style={styles.ruleText}>
        When two consonants appear between two vowels, the first consonant usually ends the preceding syllable, and the second consonant begins the new syllable.
      </Text>
      <Text style={styles.exampleText}>
        Example: Ter-re (Ter/re)
      </Text>

      <Text style={styles.ruleTitle}>Rule 3: Consonant Blends (Non-L/R First Consonant)</Text>
      <Text style={styles.ruleText}>
        If two consonants appear together, and the second consonant is 'L' or 'R' while the first consonant is not 'L' or 'R', both consonants typically begin the new syllable.
      </Text>
      <Text style={styles.exampleText}>
        Example: pro-prié-té (pro/prié/té)
      </Text>

      <Text style={styles.ruleTitle}>Rule 4: Three Consonants (L/R Third Consonant)</Text>
      <Text style={styles.ruleText}>
        When three consonants appear together, and the third consonant is 'L' or 'R' while the second consonant is not 'L' or 'R', the second and third consonants typically begin the new syllable.
      </Text>
      <Text style={styles.exampleText}>
        Example: Ap-pren-dre (Ap/pren/dre)
      </Text>

      <Text style={styles.ruleTitle}>Rule 5: Continuous Vowels (Diphthongs/Triphthongs)</Text>
      <Text style={styles.ruleText}>
        A sequence of two or more continuous vowels forms a single sound and therefore remains within the same syllable; they are not separated.
      </Text>
      <Text style={styles.exampleText}>
        Example: A-vion (A/vion - note: 'io' forms a single sound here)
      </Text>

      <Text style={styles.ruleTitle}>Rule 6: Digraphs (Consonant Combinations Forming Single Sounds)</Text>
      <Text style={styles.ruleText}>
        When a group of two consonants forms a single phonetic sound (e.g., CH, PH, TH, GN), these consonants are treated as an inseparable unit and will begin the next syllable.
      </Text>
      <Text style={styles.exampleText}>
        Example: Mar-cher (Mar/cher)
      </Text>

      <Text style={styles.ruleTitle}>Rule 7: Three or Four Consonants (General Rule)</Text>
      <Text style={styles.ruleText}>
        If a group of three or four continuous consonants does not fall under Rule 3 or Rule 4 (i.e., the 'L' or 'R' rule is not applicable), a new syllable will generally begin after the second consonant.
      </Text>
      <Text style={styles.exampleText}>
        Example: Comp-ter (Com/pter)
      </Text>

      <Text style={styles.noteText}>
        Note on Usage: These rules provide a general framework for syllabification. Specific linguistic contexts or exceptions may apply.
      </Text>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
  },

  infoHeader: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },

  infoText: {
    fontSize: 16,
    color: '#888',
  },

  syllableIntention: {
    width: '100%',
    backgroundColor: '#e6f7ff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 20,
    borderColor: '#91d5ff',
    borderWidth: 1,
  },

  syllableIntentionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
    color: '#0056b3',
  },

  syllableIntentionText: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
    color: '#333',
  },

  ruleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
    width: '100%',
  },

  ruleText: {
    fontSize: 16,
    marginBottom: 5,
    width: '100%',
  },

  exampleText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    marginLeft: 10,
    width: '100%',
  },

  noteText: {
    fontSize: 16,
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    width: '100%',
  },
})