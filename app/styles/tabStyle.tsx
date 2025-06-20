import { StyleSheet } from "react-native";

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
    margin: 10,
    borderRadius: 10,
  },

  boxtext: {
    fontSize: 16,
  },

  icon: {
    flexDirection: 'row'
  }



});

export default styles;