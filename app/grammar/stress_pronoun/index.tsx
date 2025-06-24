import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function StressPronounsExplanationExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Stack.Screen options={{ title: 'Stress Pronouns' }} />

      <Text style={styles.paragraph}>
        Stress pronouns in French, also known as <Text style={styles.bold}>pronoms toniques</Text>, <Text style={styles.bold}>disjunctive pronouns</Text>, or <Text style={styles.bold}>emphatic pronouns</Text>, are used for emphasis and in specific grammatical contexts where regular subject or object pronouns cannot be used. They generally refer to people or animals, not objects or ideas.
      </Text>

      <Text style={styles.subHeading}>List of Stress Pronouns:</Text>
      <View style={styles.pronounTable}>
        {/* Table Header */}
        <View style={styles.tableRowHeader}>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Subject Pronoun</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>Stress Pronoun</Text>
          <Text style={[styles.tableCell, styles.tableHeaderCell]}>English Equivalent</Text>
        </View>
        {/* Table Rows */}
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>je</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>moi</Text></Text>
          <Text style={styles.tableCell}>me</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>tu</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>toi</Text></Text>
          <Text style={styles.tableCell}>you (singular, informal)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>il</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>lui</Text></Text>
          <Text style={styles.tableCell}>him</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>elle</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>elle</Text></Text>
          <Text style={styles.tableCell}>her</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>on</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>soi</Text></Text>
          <Text style={styles.tableCell}>oneself, one, everyone</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>nous</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>nous</Text></Text>
          <Text style={styles.tableCell}>us</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>vous</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>vous</Text></Text>
          <Text style={styles.tableCell}>you (plural, or formal singular)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>ils</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>eux</Text></Text>
          <Text style={styles.tableCell}>them (masculine or mixed group)</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableCell}>elles</Text>
          <Text style={styles.tableCell}><Text style={styles.bold}>elles</Text></Text>
          <Text style={styles.tableCell}>them (feminine)</Text>
        </View>
      </View>
      <Text style={styles.noteParagraph}>
        (Note: <Text style={styles.bold}>elle</Text>, <Text style={styles.bold}>nous</Text>, and <Text style={styles.bold}>vous</Text> are the same for both subject and stress pronouns.)
      </Text>

      <Text style={styles.subHeading}>When to use Stress Pronouns:</Text>

      <View style={styles.bulletPointContainer}>
        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>1. For Emphasis (Accent Tonique):</Text>
          {'\n'}  To stress who is performing an action or who something refers to.
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: <Text style={styles.bold}>Moi</Text>, je suis toujours à l'heure. (Me, I'm always on time.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>2. After Prepositions:</Text>
          {'\n'}  Stress pronouns always follow prepositions (e.g., <Text style={styles.italic}>à, de, chez, avec, pour, sans, entre, contre</Text>).
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: C'est pour <Text style={styles.bold}>moi</Text> ? (Is this for me?)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Je veux aller avec <Text style={styles.bold}>toi</Text>. (I want to go with you.)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Nous pensons à <Text style={styles.bold}>eux</Text>. (We're thinking about them.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>3. In Short Answers or Single-Word Responses:</Text>
          {'\n'}  When answering a question without repeating the verb.
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Qui veut un café ? - <Text style={styles.bold}>Moi</Text> ! (Who wants a coffee? - Me!)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Qui est à la porte ? - <Text style={styles.bold}>Lui</Text> ! (Who's at the door? - Him!)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>4. After "C'est" and "Ce sont":</Text>
          {'\n'}  To emphasize who "it is" or "it is they."
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: C'est <Text style={styles.bold}>moi</Text> qui l'ai fait. (It's me who did it.)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Ce sont <Text style={styles.bold}>elles</Text> qui ont gagné. (It's them who won.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>5. In Compound Subjects or Objects (with Conjunctions):</Text>
          {'\n'}  When two pronouns or a pronoun and a noun are connected by conjunctions like <Text style={styles.italic}>et</Text> (and), <Text style={styles.italic}>ou</Text> (or), <Text style={styles.italic}>ni</Text> (neither/nor).
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: <Text style={styles.bold}>Elle et moi</Text> étudions le français. (She and I are studying French.)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Ni <Text style={styles.bold}>toi ni lui</Text> ne peuvent venir. (Neither you nor he can come.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>6. In Comparisons (after <Text style={styles.italic}>que</Text>):</Text>
          {'\n'}  Used after comparison words like <Text style={styles.italic}>plus...que, moins...que, aussi...que</Text>.
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Je suis plus grand que <Text style={styles.bold}>lui</Text>. (I am taller than him.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>7. With <Text style={styles.italic}>-même(s)</Text> for Added Emphasis:</Text>
          {'\n'}  To express "myself," "yourself," "himself," etc.
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: J'ai fait le gâteau <Text style={styles.bold}>moi-même</Text>. (I made the cake myself.)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Ils ont construit la maison <Text style={styles.bold}>eux-mêmes</Text>. (They built the house themselves.)</Text>
        </Text>

        <Text style={styles.bulletPoint}>
          <Text style={styles.bold}>8. In Affirmative Commands (Imperative Mood):</Text>
          {'\n'}  <Text style={styles.italic}>Moi</Text> and <Text style={styles.bold}>toi</Text> replace direct/indirect object pronouns <Text style={styles.italic}>me</Text> and <Text style={styles.italic}>te</Text> in affirmative commands.
          {'\n  '}<Text style={styles.exampleTextItalic}>• Example: Donne-<Text style={styles.bold}>moi</Text> le livre. (Give me the book.)</Text>
          {'\n  '}<Text style={styles.exampleTextItalic}>(Compare to <Text style={styles.italic}>Ne me donne pas le livre</Text> - Don't give me the book, where <Text style={styles.italic}>me</Text> is used for negative commands).</Text>
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Understanding stress pronouns is crucial for speaking French naturally and correctly, as they are used extensively in everyday conversation.
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
  pronounTable: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#fff',
    overflow: 'hidden', 
  },
  tableRowHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    backgroundColor: '#e0f7fa',
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
  tableHeaderCell: {
    fontWeight: 'bold',
    color: '#00796b',
  },
  noteParagraph: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
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
