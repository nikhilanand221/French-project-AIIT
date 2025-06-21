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
  },

  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
  }



});

export default styles;