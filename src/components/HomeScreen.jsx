import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  
  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
    };
    loadCart();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const addToCart = async (product) => {
    const newCart = [...cart, product];
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
  };
  
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigation.navigate('Clothing', { product: item })}>
      <View style={styles.productContainer}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
          <Image source={require('../../assets/add_circle.png')} style={styles.addCircle} />
        </TouchableOpacity>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productDescription}>{truncateText(item.description, 40)}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require('../../assets/Menu.png')} style={styles.menu} />
        </TouchableOpacity>
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Image source={require('../../assets/Search.png')} style={styles.search} />
        <TouchableOpacity onPress={() => navigation.navigate('Location')}>
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
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
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
    width: 24,
    height: 24,
  },
  logo: {
    marginLeft: 90,
  },
  search: {
    marginLeft: 70,
    marginRight: 10,
  },
  bag: {
    width: 24,
    height: 24,
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
    width: 175,
  },
  productImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  productName: {
    fontSize: 16,
    fontWeight: '400',
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
    top: 80,
    right: 10,
  },
  addCircle: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;
