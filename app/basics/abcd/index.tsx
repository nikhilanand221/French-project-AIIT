import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import AbcdTable from './table';


export default function index() {
  return (
     <ScrollView>
       <Stack.Screen options={{ title: 'French Alphabet' }} />
       <AbcdTable />
     </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    paddingHorizontal: 20, 
  },
});