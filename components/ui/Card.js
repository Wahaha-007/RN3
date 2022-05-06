import { View, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';


function Card({children}) {

  return (
    <View style={styles.card}>
      {children}
    </View>
  );
}

export default Card;

const styles = StyleSheet.create({

  card: {
    marginTop: 36,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: Colors.primary800,
    borderRadius: 8,
    elevation: 4,         // Shadow for Android
    shadowColor: 'white', // Shadow Color on Android & iOS  
    shadowOffset: { width: 0, height: 2}, // Shadow for iOS, very detailed
    shadowRadius: 8,
    shadowOpacity: 0.25,
    alignItems: 'center',
  },

});