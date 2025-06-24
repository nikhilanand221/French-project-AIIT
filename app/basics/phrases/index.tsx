import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function FrenchIntroductionsExpo() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <Text style={styles.heading}>Basic Introductions in French</Text>
      <Text style={styles.paragraph}>
        Learning basic introductions in French is a great way to start conversing! Here are some common phrases you can use:
      </Text>

      {/* I. Greetings */}
      <Text style={styles.subHeading}>I. Greetings (<Text style={styles.italic}>Les Salutations</Text>)</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Bonjour !</Text> (Bohn-zhoor) - Hello! / Good day! (Used broadly during the day)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Bonsoir !</Text> (Bohn-swahr) - Good evening! (Used in the evening)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Bonne nuit !</Text> (Buhn nwee) - Good night! (Used when going to bed or leaving late at night)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Salut !</Text> (Sah-loo) - Hi! / Bye! (Informal, used with friends and family)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Comment ça va ?</Text> (Koh-mahn sah vah?) - How are you? / How's it going? (Informal)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Ça va ?</Text> (Sah vah?) - How's it going? (Even more informal)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Comment allez-vous ?</Text> (Koh-mahn tah-lay voo?) - How are you? (Formal or plural)
        </Text>
      </View>

      {/* II. Responding to "How are you?" */}
      <Text style={styles.subHeading}>II. Responding to "How are you?"</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Ça va bien, merci.</Text> (Sah vah byan, mer-see) - I'm doing well, thank you.
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Très bien, merci.</Text> (Trey byan, mer-see) - Very well, thank you.
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Ça va.</Text> (Sah vah) - I'm fine. / It's going. (Neutral)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Pas mal.</Text> (Pah mahl) - Not bad.
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Comme ci, comme ça.</Text> (Kohm see, kohm sah) - So-so.
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Ça ne va pas (très bien).</Text> (Sah nuh vah pah (trey byan)) - I'm not doing (very well).
        </Text>
      </View>

      {/* III. Introducing Yourself */}
      <Text style={styles.subHeading}>III. Introducing Yourself (<Text style={styles.italic}>Se Présenter</Text>)</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Comment vous appelez-vous ?</Text> (Koh-mahn voo zah-play voo?) - What is your name? (Formal or plural)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Comment t'appelles-tu ?</Text> (Koh-mahn tah-pell too?) - What is your name? (Informal)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Je m'appelle [Your Name].</Text> (Zhuh mah-pell [Your Name]) - My name is [Your Name].
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Enchanté(e) !</Text> (Ahn-shahn-tay) - Nice to meet you! (Masculine: Enchanté, Feminine: Enchantée)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Moi, c'est [Your Name].</Text> (Mwah, say [Your Name]) - I'm [Your Name]. (Informal)
        </Text>
      </View>

      {/* IV. Asking About Origin */}
      <Text style={styles.subHeading}>IV. Asking About Origin (<Text style={styles.italic}>Demander l'Origine</Text>)</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>D'où venez-vous ?</Text> (Doo vuh-nay voo?) - Where are you from? (Formal or plural)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>D'où viens-tu ?</Text> (Doo vyan too?) - Where are you from? (Informal)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Je viens de [Country/City].</Text> (Zhuh vyan duh [Country/City]) - I come from [Country/City].
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Je suis de [Country/City].</Text> (Zhuh swee duh [Country/City]) - I am from [Country/City].
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Quelle est votre nationalité ?</Text> (Kell eh voh-truh nah-syon-nah-lee-tay?) - What is your nationality? (Formal)
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Je suis [nationality].</Text> (Zhuh swee [nationality]) - I am [nationality].
        </Text>
        <Text style={styles.exampleTextItalic}>
          Examples: Je suis français/française (French), Je suis américain/américaine (American), Je suis indien/indienne (Indian). (Remember agreement!)
        </Text>
      </View>

      {/* V. Saying Goodbye */}
      <Text style={styles.subHeading}>V. Saying Goodbye (<Text style={styles.italic}>Prendre Congé</Text>)</Text>
      <View style={styles.sectionContent}>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Au revoir !</Text> (Oh ruh-vwahr) - Goodbye!
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>À bientôt !</Text> (Ah byan-toh!) - See you soon!
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>À demain !</Text> (Ah duh-man!) - See you tomorrow!
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Bonne journée !</Text> (Buhn zhoor-nay!) - Have a good day!
        </Text>
        <Text style={styles.phrase}>
          <Text style={styles.bold}>Bonne soirée !</Text> (Buhn swah-ray!) - Have a good evening!
        </Text>
      </View>

      <Text style={styles.paragraph}>
        Practicing these phrases aloud will help you become more comfortable with French pronunciation and rhythm!
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
  sectionContent: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 20,
  },
  phrase: {
    fontSize: 16,
    marginBottom: 8,
    color: '#444',
  },
  bold: {
    fontWeight: 'bold',
  },
  italic: {
    fontStyle: 'italic',
  },
  exampleTextItalic: {
    fontStyle: 'italic',
    color: '#2e7d32',
    marginTop: 5,
    marginLeft: 10,
  },
});
