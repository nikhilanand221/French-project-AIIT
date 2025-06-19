import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AbcdTable from './table';


export default function index() {
  return (
     <View style={styles.container}>
      <Stack.Screen options={{ title: 'French Alphabet' }} />
       <ScrollView>
         <AbcdTable />
      </ScrollView>
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 20, 
  },
});