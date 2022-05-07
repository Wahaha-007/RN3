import { useState } from 'react'; 
import { View, StyleSheet, Alert, Text,  FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton'
import Title from '../components/ui/Title';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

// Place pure function here (outside the Main function)
// => This is internal, not display/interaction related

// A little recursive function from Maximilian :)
function generateRandomBetween(min, max, exclude) { 
  const rndNum = Math.floor(Math.random() * (max - min)) + min;

  if (rndNum === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver }) {
  
  const initialGuess = generateRandomBetween(1, 100, userNumber);
  const [currentGuess, setCurrentGuess] = useState(initialGuess);  // Computer Guess
  const [guessRounds, setGuessRounds] = useState([initialGuess]); // Log all numbers


  /*useEffect(()=>{                 // Decide condition before new loop of Rendering
    if (currentGuess === userNumber ) {
      onGameOver();
    }
  },[currentGuess, userNumber, onGameOver]); // Add "TRIGGER" 
  */

  function nextGuessHandler(direction) { // direction => 'lower' / 'greater'
    
    // Check if someone lying
    if (
      (direction === 'lower' && currentGuess < userNumber )||
      (direction === 'greater' && currentGuess > userNumber ) 
    ) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [{ text:'Sorry!', style:'cancel'}]);
      return; 
    }  

    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }

    console.log(minBoundary, maxBoundary);

    // exclude number not use anymore, just put any number in
    const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);

    if (newRndNumber === userNumber ) {
      minBoundary = 1;
      maxBoundary = 100;
      onGameOver(guessRounds.length + 1);
    } else {
      setGuessRounds( prev =>  [newRndNumber,...prev] );
      setCurrentGuess(newRndNumber); // Update State == Update GUI and begin the new round
    } 
  }

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        
        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>

        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'greater')}>
              <Ionicons name='md-add' size={24} color='white'/>
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this,'lower')}>
              <Ionicons name='md-remove' size={24} color='white'/>
            </PrimaryButton>
          </View>  
        </View>
        
      </Card>

      {/*<View>
        {guessRounds.map( (guessRound,index) => <Text key={index}>{guessRound}</Text>)}
      </View>*/}

      <View style={styles.listContainer}>
        <FlatList
          data={guessRounds}
          renderItem={itemData => 
            <GuessLogItem 
              roundNumber={ guessRounds.length - itemData.index } 
              guess={ itemData.item } 
            />}
          keyExtractor={item => item}  
        />
      </View>

    </View>
  );
}

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 24
  },

  instructionText: {
    marginBottom: 12,
  },

  buttonsContainer: {
    flexDirection: 'row',
  },

  buttonContainer: {
    flex :1,
  },

  listContainer: {
    flex: 1,
    padding: 16,
  },
});