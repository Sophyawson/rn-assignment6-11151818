import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PRODUCTS = [
  { id: '1', name: 'Office Wear', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress1.png') },
  { id: '2', name: 'Black', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress2.png') },
  { id: '3', name: 'Church Wear', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress3.png') },
  { id: '4', name: 'Lamerei', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress4.png') },
  { id: '5', name: '21WN', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress5.png') },
  { id: '6', name: 'Lopo', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress6.png') },
  { id: '7', name: '21WN', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress7.png') },
  { id: '8', name: 'Lame', description: 'reversible angora cardigan', price: 120, image: require('../../assets/dress1.png') },
];

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription}>{item.description}</Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
        <Image source={require('../../assets/add_circle.png')} style={styles.addCircle} />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../../assets/Menu.png')} style={styles.menu} />
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Image source={require('../../assets/Search.png')} style={styles.search} />
        <TouchableOpacity onPress={() => navigation.navigate('CartScreen')}>
          <Image source={require('../../assets/shoppingBag.png')} style={styles.bag} />
        </TouchableOpacity>
      </View>
      <View style={styles.secondRow}>
        <Text style={styles.ourStoryText}>OUR STORY</Text>
        <TouchableOpacity style={styles.wrapper}>
          <Image source={require('../../assets/Listview.png')} style={styles.listView} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.wrapper}>
          <Image source={require('../../assets/Filter.png')} style={styles.filter} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={2}
        contentContainerStyle={styles.flatList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  secondRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menu: {
    marginLeft: 5,
  },
  logo: {
    marginLeft: 90,
  },
  search: {
    marginLeft: 70,
    marginRight: 10,
  },
  ourStoryText: {
    fontSize: 25,
    fontWeight: '400',
    marginLeft: 5,
    marginRight: 130,
  },
  wrapper: {
    backgroundColor: '#f9f8f8',
    borderRadius: 55,
    padding: 6,
  },
  productContainer: {
    padding: 5,
    position: 'relative',
  },
  productImage: {
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: '500',
    marginVertical: 5,
  },
  productDescription: {
    fontSize: 13,
    color: '#555',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 16,
    color: '#e99d7e',
    marginBottom: 5,
  },
  addButton: {
    position: 'absolute',
    bottom: 95,
    right: 12,
  },
  addCircle: {},
});

export default HomeScreen;
