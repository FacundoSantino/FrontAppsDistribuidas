import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native';
import CarouselCards from '../CarouselCards';
import estiloApp from "../estilos/estiloApp";

function Carousel(): JSX.Element{
    return(
    <SafeAreaView style={style.container}>
      <CarouselCards clickeable={false} procesado={[]} />
    </SafeAreaView>
    );
    
}
const style=StyleSheet.create(estiloApp);

export default Carousel;