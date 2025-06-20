import { Stack } from 'expo-router';
import React from 'react';
import { ScrollView, } from 'react-native';
import NumbersTable from './table';


export default function index() {
  return (
     <ScrollView>
       <Stack.Screen options={{ title: 'French Numbers' }} />
       <NumbersTable/>
     </ScrollView>
  );
}
