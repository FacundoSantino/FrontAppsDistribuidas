import React from 'react'
import {Image} from 'react-native-elements'
import { ActivityIndicator, StyleSheet, View} from 'react-native'
import Carousel from 'react-native-snap-carousel'
import { Pagination } from 'react-native-snap-carousel'
import { ScrollView } from 'react-native'
import {size} from 'lodash'

export default function SliderFotos ({ images, height, width, activeSlide, setActiveSlide }){
    const renderItem = ({item}) =>{
        return(
            <Image
                style={{ width, height}}
                PlaceholderContent={<ActivityIndicator color="#fff" />}
                source={{uri:item}}
            />
        )
    }

    return(

        <ScrollView style={{backgroundColor:"#FFFDFD",paddingTop:5,
            paddingBottom:10,borderColor:"#000000", borderWidth:1,
            paddingHorizontal:27, borderRadius:20, width:380,
            marginTop:20, paddingBottom:30}}>
            
                <Carousel
                    layout={"default"}
                    data={images}
                    sliderWidth={width}
                    itemWidth={width}
                    itemHeight={height}
                    renderItem={renderItem}
                    onSnapToItem={ (index) => setActiveSlide(index)}
                
                />
               
               <MyPagination data={images} activeSlide={activeSlide}/>
        </ScrollView>
    )
}

function MyPagination({data, activeSlide}) {
    return(
        <Pagination
            dotsLength={size(data)}
            activeDotIndex={activeSlide}
            containerStyle={styles.containerPagination}
            dotStyle={styles.dotActive}
            inactiveDotStyle={styles.dotInactive}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}

        />
    )
}

const styles= StyleSheet.create({
    containerPagination:{
        backgroundColor: "transparent",
        zIndex:1,
        position: "absolute",
        bottom:0,
        alignSelf:'center',
    },

    dotActive:{
        width: 20,
        height: 20,
        borderRadius: 10,
        marginHorizontal: 2,
        backgroundColor: "#F0AF23"
    },

    dotInactive:{
        width: 14,
        height: 14,
        borderRadius: 7,
        marginHorizontal: 2,
        backgroundColor: "#F0AF23"
    },

});