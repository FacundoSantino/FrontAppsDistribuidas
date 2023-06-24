import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width + 80
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7)

const CarouselCardItem = ({ item, index }) => {
  return (
    <View style={styles.container} key={index}>
      <Image
        source={{ uri: item.imgUrl }}
        style={(item.title != "" && item.body != "" ? styles.image : styles.image2)}
      />
      <View>
        <Text style={{fontSize:20,fontWeight:'bold',alignSelf:'center'}}>{item.title} </Text>
        <Text style={{alignSelf:'center',fontWeight:'bold'}}>
          {(item.body.length > 40) ? (item.body).substring(0,40) + "..." : item.body}
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop:20,
    backgroundColor: 'white',
    borderRadius: 8,
    width: 350,
    height:205,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  image: {
    width: 350,
    height: 150,
    borderRadius:8,
  },
  image2:{
    width: 350,
    height: 205,
    borderRadius:8,
  },
  header: {
    color: "#222",
    fontSize: 28,
    fontWeight: "bold",
  },
})

export default CarouselCardItem