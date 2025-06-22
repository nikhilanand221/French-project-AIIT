import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import styles from '../styles/tabStyle';

export default function grammer() {
  return (
    <View style={styles.container}>
      <ScrollView style={{ paddingVertical: 10}}>

        <Link href="/grammar/pronominal" style={styles.box}>
         <View >
          <FontAwesome name="undo" size={35} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Pronominal Verb</Text>
         </View>
        </Link>

        <Link href="/grammar/conjugation" style={styles.box}>
         <View >
          <MaterialCommunityIcons name="connection" size={35} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Verb Conjugation</Text>
         </View>
        </Link>
        
      </ScrollView>
    </View>
  )
}

const grammarStyle = StyleSheet.create({

  boxPadding: {
    paddingVertical: 10
  }

})