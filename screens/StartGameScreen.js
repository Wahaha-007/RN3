import { useState } from 'react';
import { TextInput, View, StyleSheet, Alert } from 'react-native';
import { shadowColor } from 'react-native/Libraries/Components/View/ReactNativeStyleAttributes';
import PrimaryButton from '../components/PrimaryButton';

const StartGameScreen = () => {

  const [enteredNumber, setEnteredNumber] = useState('');

  function numberInputHandler(enteredText) {
    setEnteredNumber(enteredText);
  }

  function resetInputHandler() {
    setEnteredNumber('');
  }
  
  // Validate data HERE !
  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredNumber);    

    // isNaN = is Not a Number
    if (isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99 ) {
      
      // Show Alert
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99',
        [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler}],
      ); // Will compile to Native Alert API 

      return;
    }

    console.log('Valid Number');
  }

  return (
    <View style={styles.inputContainer}>
      <TextInput 
        style={styles.numberInput} 
        maxLength={2} 
        keyboardType='number-pad'   // The input is still 'String' type
        autoCapitalize='none'
        autoCorrect={false}
        onChangeText={numberInputHandler}
        value={enteredNumber}
      
      />
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}> 
          <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
        </View>
        <View style={styles.buttonContainer}> 
          <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
        </View>
      </View>
    </View>
  );
}

export default StartGameScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 100,
    marginHorizontal: 24,
    padding: 16,
    backgroundColor: '#3b021f',
    borderRadius: 8,
    elevation: 4,         // Shadow for Android
    shadowColor: 'white', // Shadow Color on Android & iOS  
    shadowOffset: { width: 0, height: 2}, // Shadow for iOS, very detailed
    shadowRadius: 8,
    shadowOpacity: 0.25,
    alignItems: 'center',
  },

  numberInput: {
    height: 50,
    width: 50,
    fontSize: 32,
    borderBottomColor: '#ddb52f',
    borderBottomWidth: 2,
    color: '#ddb52f',
    marginVertical: 8,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flex :1,
  },

});