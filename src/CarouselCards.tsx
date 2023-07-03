import React, { FC, useState, useRef } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import estiloApp from './estilos/estiloApp';
import { TipoPantalla, localip } from './App';
import { useNavigation } from '@react-navigation/native';

interface CarouselCardsProps {
  procesado: string[],
  clickeable:Boolean
}

const CarouselCards: FC<CarouselCardsProps> = ({ procesado,clickeable }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);
  const navigation=useNavigation();
  const [loaded, setLoaded] = useState(false);
  const urlBase="http://"+localip+":8080/api/rest/morfar";
  const irAReceta = async () => {
    try {
      if(procesado[index].idReceta!=undefined){
        const response = fetch(urlBase+"/getReceta/"+procesado[index].idReceta);
        const data= (await response).json();
        const responsePasos= fetch(urlBase+"/getPasos/"+procesado[index].idReceta);
        const dataPasos=(await responsePasos).json();
        console.log("ID RECETA: ");
        console.log((await data));
        navigation.navigate("Receta" as never,
            {
                tipoPantalla:TipoPantalla.NOMILISTA,
                titulo:(await data).nombre,
                contenido: (await data),
                borrable:false,
                local:false,
                pasos: (await dataPasos)
            } as never)
        ;
      }
      
    } catch (error) {
      console.log(error);
    }
  }

  if(clickeable){
    return (
      <View style={{display:"flex",height:320}}>
        
        <Carousel
          layout="stack"
          layoutCardOffset={-20}
          removeClippedSubviews={false}
          ref={carouselRef}
          data={procesado}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={setIndex}
          useScrollView={true}
        />
        <TouchableOpacity  onPress={() => {irAReceta()}} style={{borderRadius:15,borderColor:"black",borderWidth:1,width:70,alignContent:"center",justifyContent:"center",backgroundColor:"#F0AF23",alignSelf:"center"}}><Text style={{alignSelf:"center"}}>Ir a receta</Text></TouchableOpacity>
        <Pagination
          
          dotsLength={procesado.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
      </View>
    );
  }
  else{
    return(
      <View>
        
        <Carousel
          layout="stack"
          layoutCardOffset={-20}
          removeClippedSubviews={false}
          ref={carouselRef}
          data={procesado}
          renderItem={CarouselCardItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          onSnapToItem={setIndex}
          useScrollView={true}
        />
        <Pagination
          dotsLength={procesado.length}
          activeDotIndex={index}
          carouselRef={carouselRef}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
          tappableDots={true}
        />
        
      </View>
    )
  }
    
};

const styles=StyleSheet.create(estiloApp);

export default CarouselCards;
