import { View, Text, Pressable, StyleSheet } from 'react-native';

function PrimaryButton({ children, onPress }) {


  // Recieve props.onPress and then re-assign this function to Pressable's onPress
  return (
    <View style={styles.buttonOuterContainer}>  
      <Pressable 
        onPress={onPress}     
        android_ripple={{color:'#640233'}} 
        style={ ({pressed}) => 
          pressed 
            ? [styles.buttonInnerContainer, styles.pressed]
            : styles.buttonInnerContainer
          }
      >
        <Text style={styles.buttonText}>{children}</Text>
      </Pressable>
    </View>
  );
}

export default PrimaryButton;

const styles = StyleSheet.create({
  buttonOuterContainer: {
    borderRadius: 28,
    margin: 4,
    // Clip any styling, effect is clipped if go outside, suitable for round corner       
    overflow: 'hidden',  

  },

  buttonInnerContainer: {
    backgroundColor: '#72063c',
    paddingVertical: 8,
    paddingHorizontal: 16,
    elevation: 2,
  },

  buttonText: {
    color: 'white',
    // Adding textAlign to View will have no effect, must add to Text directly
    textAlign: 'center', 
  },

  pressed: { // Property for iOS only
    opacity: 0.75,
  }

});