import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: 'white'
  },

  box: {
    width: 350,
    height: 100,
    backgroundColor: 'antiquewhite',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },

  boxTitle: {
    fontSize: 20,
    fontWeight: 'bold',
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