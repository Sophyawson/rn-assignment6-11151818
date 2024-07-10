import { View, Text,StyleSheet } from 'react-native'
import React from 'react'

const BlogScreen = () => {
  return (
    <View style={styles.container}>
      <Text>BlogScreen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    }
  });

export default BlogScreen