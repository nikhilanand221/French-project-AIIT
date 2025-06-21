import Foundation from '@expo/vector-icons/Foundation';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View, } from 'react-native';
import styles from '../styles/tabStyle';

export default function basics() {
  return (
    <View style={styles.container}> 
     <ScrollView style={{ paddingVertical: 10}}>
       <Link href="/basics/abcd" style={styles.box}>
         <View >
           <MaterialIcons name="abc" size={40} color="black"/> 
           <Text style={styles.boxtext}>French Alphabet & Pronunciation</Text>
         </View>
        </Link>

         <Link href="/basics/numbers" style={styles.box}>
         <View >
           <MaterialIcons name="123" size={40} color="black"/> 
           <Text style={styles.boxtext}>French Numbers and Pronunciation</Text>
         </View>
        </Link>

         <Link href="/basics/pronouns" style={styles.box}>
         <View >
            <View style={styles.icon}>
             <MaterialCommunityIcons name="gender-male" size={30} color="black" />
             <MaterialCommunityIcons name="gender-female" size={30} color="black" />
            </View>
           <Text style={[styles.boxtext,{ paddingTop: 10}]}>French Pronouns</Text>
         </View>
        </Link>

        <Text style={styles.subTitle}>Pronounciation Basics:</Text>

          <Link href="/basics/nasal" style={styles.box}>
         <View >
          <Foundation name="sound" size={40} color="black" />
           <Text style={[styles.boxtext,{ paddingTop: 10}]}>Nasal Sounds</Text>
         </View>
        </Link>


         <Link href="/basics/syllable" style={styles.box}>
         <View >
            <MaterialCommunityIcons name="division" size={40} color="black" />
           <Text style={styles.boxtext}>Syllable Division</Text>
         </View>
        </Link>

     </ScrollView>
    </View>
  )
}
