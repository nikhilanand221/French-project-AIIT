import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../styles/tabStyle';

export default function basics() {
  return (
    <View style={styles.container}> 
     <ScrollView style={{ paddingVertical: 10}}>
       <Link href="/basics/abcd" style={styles.box}>
         <View >
           <MaterialIcons name="abc" size={40} color="black"/> 
           <Text>Learn French Alphabet & Pronunciation</Text>
         </View>
        </Link>

         <Link href="/basics/numbers" style={styles.box}>
         <View >
           <MaterialIcons name="123" size={40} color="black"/> 
           <Text>Learn French Numbers and Pronunciation</Text>
         </View>
        </Link>
     </ScrollView>
    </View>
  )
}

