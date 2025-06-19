import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Link } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function basics() {
  return (
    <View style={styles.container}> 
     <ScrollView style={{ paddingVertical: 10}}>
       <Link href="/basics/abcd">
         <View style={styles.box}>
           <MaterialIcons name="abc" size={40} color="black"/> 
           <Text>Learn French Alphabet & Pronunciation</Text>
         </View>
         </Link>
     </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor: '#fff',
  },
  box: {
    width: 350,
    height: 100,
    backgroundColor: 'antiquewhite',
    padding: 10,
  }
});