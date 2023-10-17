import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const CustomHeader = ({ title, onRightPress, rightIcon }) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.headerContainer, { paddingTop: insets.top }]}>
      <Image source={require('../assets/SYB_Logo.jpeg')} style={styles.logo} />

      <Text style={styles.title}>{title}</Text>

      {rightIcon ? (
        <TouchableOpacity onPress={onRightPress} style={styles.button}>
          <Image source={rightIcon} style={styles.icon} />
        </TouchableOpacity>
      ) : (
        <View style={styles.logo}><></></View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#000',
    padding: 10,
    height: 100,
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
    left: 10,
  },
  title: {
    color: '#000',
    fontSize: 32,
    textAlign: 'center',
    alignSelf: 'center',
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'California',
    flexGrow: 1
  },
  button: {
    padding: 8,
    position: 'absolute',
    right: 10,
  },
  icon: {
    width: 20,
    height: 20,
    resizeMode: 'contain',
  },
  buttonPlaceholder: {
    width: 28, 
    height: 28, 
  },
});
