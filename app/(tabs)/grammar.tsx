import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
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
         
        <Link href="/grammar/demonstrative_adjective" style={styles.box}>
         <View >
          <MaterialCommunityIcons name="vector-point" size={35} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Demonstrative Adjective</Text>
         </View>
        </Link>

        <Link href="/grammar/stress_pronoun" style={styles.box}>
         <View >
          <FontAwesome5 name="hand-point-down" size={35} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Stress Pronouns</Text>
         </View>
        </Link>

        <Link href="/grammar/conjugation" style={styles.box}>
         <View >
          <MaterialCommunityIcons name="connection" size={35} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Verb Conjugation</Text>
         </View>
        </Link>

        <Link href="/grammar/future" style={styles.box}>
         <View >
          <AntDesign name="arrowright" size={40} color="black" />
          <Text style={[styles.boxtext, grammarStyle.boxPadding]}>Future Proche (Near Future)</Text>
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