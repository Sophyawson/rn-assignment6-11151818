
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';

const DrawerScreen = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => props.navigation.closeDrawer()}>
          <Image source={require('../../assets/Close.png')} style={styles.closeImage} />
        </TouchableOpacity>
        <Text style={styles.title}>ERIC ATSU</Text>
        <View style={styles.underline} />
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  closeButton: {
    justifyContent: 'left',
    marginLeft: 15,

  },
  closeImage: {
    width: 24,
    height: 24,
    
  },
  title: {
    fontSize: 28,
    fontWeight: '300',
    marginVertical: 16,
    marginLeft: 15,
  },
  underline: {
    height: 2,
    backgroundColor: '#dd8560',
    marginBottom: 16,
    marginLeft:25,
   marginRight: 115,
  },
});

export default DrawerScreen;
