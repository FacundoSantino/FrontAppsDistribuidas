import React from 'react'
import { View ,ScrollView} from "react-native"
import Carousel, { Pagination } from 'react-native-snap-carousel'
import CarouselCardItem, { SLIDER_WIDTH, ITEM_WIDTH } from './CarouselCardItem'
import data from './assets/data'

const CarouselCards = () => {
  const [index, setIndex] = React.useState(0)
  const isCarousel = React.useRef(null)
  const [dato,setDato] = React.useState([]);
  const [loaded, setLoaded] = React.useState(false);
  const [procesado,setProcesado] = React.useState([]);
  /**
   * try {
    fetch("http://localhost:8080/api/rest/morfar/getHomeCommonInfo").then(r => r.json()).then(r => setDato(r))},[]);
    console.log(dato);
    }
    catch (error){
    console.log(error)
   */
    const getHomeData = async () => {
      try{
        const response = await fetch("http://192.168.0.9:8080/api/rest/morfar/getHomeCommonInfo");
        const json = await response.json();
        return json;
      }catch(err){
        console.log(err);
      }
      
    }
    React.useEffect(()=>{
      getHomeData().then(data => setDato(data)).catch(error => console.error(error))
      datoProcesado()
    },[])

    const datoProcesado = async () =>{
      if(dato != []){
        var p = [];
        dato.forEach(d =>{
          p.push({
            "title" : d.nombre,
            "body" : d.descripcion,
            "imgUrl" : d.fotos[0].urlFoto
          })
        });
        setProcesado(p);
      }
    }
    
  

  /*
  {
      title: "Aenean leo",
      body: "Ut tincidunt tincidunt erat. Sed cursus turpis vitae tortor. Quisque malesuada placerat nisl. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.",
      imgUrl: "https://assets.unileversolutions.com/recipes-v2/93240.jpg",
    }
  */
  return (

    <View>
      <Carousel 
        layout="stack"
        layoutCardOffset={-20}
        ref={isCarousel}
        data={procesado}
        renderItem={CarouselCardItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        useScrollView={true}
      />
      <Pagination
        dotsLength={procesado.length}
        activeDotIndex={index}
        carouselRef={isCarousel}
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


export default CarouselCards