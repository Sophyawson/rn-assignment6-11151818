import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadCart = async () => {
      const savedCart = await AsyncStorage.getItem('cart');
      if (savedCart) {
        const cartItems = JSON.parse(savedCart);
        setCart(cartItems);
        fetchProductDetails(cartItems);
      }
    };
    loadCart();
  }, []);

  const fetchProductDetails = async (cartItems) => {
    try {
      const productDetails = await Promise.all(
        cartItems.map(async (item) => {
          const response = await fetch(`https://fakestoreapi.com/products/${item.id}`);
          const data = await response.json();
          return { ...item, ...data };
        })
      );
      setProducts(productDetails);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const removeFromCart = async (productId) => {
    const newCart = cart.filter((item) => item.id !== productId);
    setCart(newCart);
    await AsyncStorage.setItem('cart', JSON.stringify(newCart));
    setProducts(products.filter((product) => product.id !== productId));
  };

  const getTotal = () => {
    return products.reduce((total, item) => total + item.price, 0);
  };

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  const renderItem = ({ item }) => (
    <View style={styles.productContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productName}>{item.title}</Text>
        <Text style={styles.productDescription}>{truncateText(item.description, 40)}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
        <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeButton}>
          <Image source={require('../../assets/remove.png')} style={styles.removeIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topRow}>
        <Image source={require('../../assets/Logo.png')} style={styles.logo} />
        <Image source={require('../../assets/Search.png')} style={styles.search} />
      </View>
      <Text style={styles.checkoutText}>C H E C K O U T</Text>
      <View style={styles.divider}>
        <View style={styles.line} />
        <View style={styles.diamond} />
        <View style={styles.line} />
      </View>
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={renderItem}
        contentContainerStyle={styles.flatList}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>E s t . To t a l</Text>
        <Text style={[styles.totalPrice, { color: '#e99d7e' }]}>${getTotal()}</Text>
      </View>
      <TouchableOpacity style={styles.checkoutButton}>
        <Image
          source={require('../../assets/shoppingBag.png')}
          style={[styles.bagIcon, { tintColor: '#fff' }]}
        />
        <Text style={styles.checkoutButtonText}>CHECKOUT</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  topRow: {
    padding: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 30,
  },
  logo: {
    marginLeft: 120,
  },
  search: {
    marginRight: 10,
  },
  checkoutText: {
    fontSize: 20,
    fontWeight: '300',
    marginLeft: 120,
  },
  divider: {
    marginLeft: 125,
    marginRight: 132,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#e4e4e5',
  },
  diamond: {
    width: 10,
    height: 10,
    backgroundColor: '#fff',
    borderColor: '#e4e4e5',
    borderWidth: 1,
    transform: [{ rotate: '45deg' }],
  },
  flatList: {
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingLeft: 20,
    paddingRight: 50,
  },
  productImage: {
    width: 90,
    height: 110,
    marginRight: 10,
  },
  productDetails: {
    flex: 1,
  },
  productName: {
    fontSize: 12,
    fontWeight: '400',
  },
  productDescription: {
    fontSize: 16,
    color: '#666',
  },
  productPrice: {
    fontSize: 16,
    color: '#e99d7e',
  },
  removeButton: {
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  removeIcon: {
    width: 20,
    height: 20,
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  totalText: {
    fontSize: 16,
    color: '#666',
    paddingLeft: 20,
  },
  totalPrice: {
    paddingRight: 30,
    fontSize: 16,
    color: 'black',
  },
  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    marginBottom: 1,
    padding: 20,
  },
  bagIcon: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CartScreen;
