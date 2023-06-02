import React, { FC, useState, useRef } from 'react';
import { View, ActivityIndicator, TouchableOpacity, StyleSheet } from 'react-native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem';
import estiloApp from './estilos/estiloApp';

interface CarouselCardsProps {
  procesado: String[];
}

const CarouselCards: FC<CarouselCardsProps> = ({ procesado }) => {
  const [index, setIndex] = useState(0);
  const carouselRef = useRef<Carousel<any>>(null);
  const [loaded, setLoaded] = useState(false);

    return (
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
    );
};

const styles=StyleSheet.create(estiloApp);

export default CarouselCards;
