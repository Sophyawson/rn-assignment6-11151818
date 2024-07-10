import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

const Clothing = ({ route, navigation }) => {
  const [product, setProduct] = useState({
    image: require('../../assets/dress1.png'),
    name: 'Default Product',
    description: 'No description available',
    price: '0.00',
  });

  useEffect(() => {
    const fetchProduct = async () => {
      if (route?.params?.product?.id) {
        try {
          const response = await fetch(`https://fakestoreapi.com/products/${route.params.product.id}`);
          const data = await response.json();
          setProduct({
            ...data,
            image: { uri: data.image }, 
            name: data.title, 
          });
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      }
    };

    fetchProduct();
  }, [route?.params?.product?.id]);

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.substr(0, maxLength) + '...';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
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
      <Image source={typeof product.image === 'string' ? { uri: product.image } : product.image} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{product.name}</Text>
        <TouchableOpacity>
          <Image source={require('../../assets/Export.png')} style={styles.exportIcon} />
        </TouchableOpacity>
      </View>
      <Text style={styles.productDescription}>{truncateText(product.description, 40)}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.materialsHeader}>MATERIALS</Text>
      <Text style={styles.materialsText}>
        We work with monitoring programmes to  
      </Text>
      <Text style={styles.materialsText}>ensure compliance with safety, health and</Text>
      <Text style={styles.materialsText}>quality standards for our products.</Text>
      <View style={styles.materialIconsContainer}>
        <View style={styles.materialIcons}>
          <Image source={require('../../assets/Do Not Bleach.png')} style={styles.materialIcon} />
          <Text style={styles.materialText}>Do not use bleach</Text>
        </View>
        <View style={styles.materialIcons}>
          <Image source={require('../../assets/Do Not Tumble Dry.png')} style={styles.materialIcon} />
          <Text style={styles.materialText}>Do not tumble dry</Text>
        </View>
        <View style={styles.materialIcons}>
          <Image source={require('../../assets/Do Not Wash.png')} style={styles.materialIcon} />
          <Text style={styles.materialText}>Dry clean with tetrachloroethylene</Text>
        </View>
        <View style={styles.materialIcons}>
          <Image source={require('../../assets/Iron Low Temperature.png')} style={styles.materialIcon} />
          <Text style={styles.materialText}>Iron at a maximum of 110°C/230°F</Text>
        </View>
        <View style={styles.line} />
      </View>
      <View style={styles.materialIcons}>
        <Image source={require('../../assets/Shipping.png')} style={styles.materialIcon} />
        <Text style={styles.shippingInfo}>Free Flat Rate Shipping</Text>
        <Image source={require('../../assets/Up.png')} style={styles.upIcon} />
      </View>
      <Text style={styles.shippingDate}>Estimated to be delivered on </Text>
      <Text style={styles.shippingDate}>09/11/2021 - 12/11/2021.</Text>
      <TouchableOpacity style={styles.checkoutButton} >
        <Image
          source={require('../../assets/Plus.png')}
          style={[styles.plusIcon, { tintColor: '#fff' }]}
        />
        <Text style={styles.checkoutButtonText}>ADD TO BASKET</Text>
        <Image
          source={require('../../assets/Heart.png')}
          style={[styles.heartIcon, { tintColor: '#fff' }]}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  topRow: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  menu: {
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
  productImage: {
    width: 350,
    height: 450,
    marginTop: 10,
    marginBottom: 20,
  },
  productInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  exportIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  productDescription: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
  },
  productPrice: {
    fontSize:18,
    color: '#e99d7e',
    marginBottom: 20,
  },
  materialsHeader: {
    fontSize: 18,
    fontWeight: '400',
    marginBottom: 5,
  },
  materialsText: {
    fontSize: 14,
    color: '#555',
  },
  materialIconsContainer: {
    marginBottom: 20,
    marginTop: 10,
  },
  materialIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  materialIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  materialText: {
    fontSize: 14,
    color: '#555',
  },
  line: {
    width: '100%',
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 30,
  },
  shippingInfo: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 5,
  },
  upIcon: {
    width: 24,
    height: 24,
    position: 'absolute',
    right: 0,
  },
  shippingDate: {
    fontSize: 14,
    color: '#555',
    paddingLeft: 35,
  },
  checkoutButton: {
    flexDirection: 'row',
    marginTop: 170,
    marginHorizontal: -20,
    backgroundColor: 'black',
    padding: 20,
  },
  plusIcon: {
    width: 25,
    height: 30,
    marginRight: 20,
  },
  checkoutButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  heartIcon: {
    width: 30,
    height: 30,
    marginLeft: 130,
  },
});

export default Clothing;
