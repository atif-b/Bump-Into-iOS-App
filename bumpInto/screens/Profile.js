import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';

const Profile = ({navigation}) => {
  return (
    <View
      style={{
        // Try setting `flexDirection` to `"row"`.
        flexDirection: 'column',
        flex: 1,
      }}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View style={{flex: 3, backgroundColor: 'red'}}>
          <Text>Background img</Text>
        </View>

        <View style={styles.headerTile}>
          <View style={{flexDirection: 'row'}}>
            <Text style={[styles.headerTileMain]}>Atif Butt</Text>
            <Text style={{color: '#efaffc'}}>3rd</Text>
            <View
              style={{
                flexDirection: 'row-reverse',
                textAlign: 'right',
                flex: 1,
                position: 'relative',
                marginTop: -10,
                marginBottom: -10,
              }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  alert('you clicked me');
                }}>
                <Image
                  style={{height: 37, width: 37}}
                  source={require('../assets/icons/bump.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={[styles.headerTileSub]}>BSc Computer Science</Text>
          <View style={styles.moduleTextRow}>
            <Text style={styles.moduleText}>Module1</Text>
            <Text style={styles.moduleText}>Module2</Text>
            <Text style={styles.moduleText}>Module3</Text>
          </View>
        </View>

        <View style={{flex: 10, backgroundColor: 'grey'}}>
          <Text>Test</Text>
        </View>
      </View>

      {/* <Container>
        <Text>Hi</Text>
      <Container> */}

      <View
        style={{
          flex: 1,
          width: 100,
          height: 100,
          borderRadius: 50,
          backgroundColor: 'orange',
          position: 'absolute',
          top: 70,
          left: 20,
        }}>
        <Image
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  headerTile: {
    backgroundColor: '#fff',
    paddingTop: 45,
    paddingLeft: 20,
    paddingBottom: 20,
    flex: 2,
  },

  headerTileMain: {
    fontSize: 24,
  },

  headerTileSub: {
    fontSize: 16,
  },

  moduleTextRow: {
    flexDirection: 'row',
  },

  moduleText: {
    backgroundColor: '#fafafa',
    padding: 5,
    marginRight: 5,
  },

  button: {
    // backgroundColor: '#859a9b',
    backgroundColor: '#fafafa',
    borderRadius: 18,
    padding: 5,
    marginBottom: 2,
    shadowColor: '#303838',
    shadowOffset: {width: 0, height: 5},
    shadowRadius: 10,
    shadowOpacity: 0.35,
  },
});
