import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import styles from '../styles/tabStyle';

export default function tipsAndTricks() {
  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>

       <Link href="/tips/plurals" style={styles.box}>
         <View >
            <MaterialCommunityIcons name="plus" size={40} color="black" />
           <Text style={styles.boxtext}>Plurals</Text>
         </View>
        </Link>

        <Link href="/tips/gender" style={styles.box}>
         <View >
           <View style={styles.icon}>
             <MaterialCommunityIcons name="gender-male" size={30} color="black" />
             <MaterialCommunityIcons name="gender-female" size={30} color="black" />
           </View> 
           <Text style={[styles.boxtext,{ paddingTop: 10}]}>Gender in French</Text>
         </View>
        </Link>


    </ScrollView>
    
   
  )
}

