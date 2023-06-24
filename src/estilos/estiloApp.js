import React from "react";
import { StyleSheet, View } from "react-native";


const estiloApp = StyleSheet.create({

    titulo:{
        fontSize:32,
        color:"#000000",
        alignSelf:"center"
    },

    bgHeaderPrincipal:{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#F0AF23',
        height: 90,
    },

    bgPrincipal: {
        backgroundColor: 'white',
        borderRadius: 30,
        height:800,
        paddingVertical: 20,
        paddingHorizontal: 16,
        marginTop: 70,
    },

    flexRow: {
        display:"flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    flexColumn:{
        display:"flex",
        flexDirection:"column",
        height: "auto",
        alignItems: "center",
        justifyContent: "center"
    },

    morfar:{
        alignContent:"center",
        justifyContent:"center",
    },

    cajaBusqueda:{
        paddingLeft:20,
        paddingRight:20,
        borderRadius:45,
        borderColor:'#D0D0D0',
        borderWidth:1.5,
        marginTop:20,
        borderColor:'black'
    },

    elemento:{
        
    },

    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20

      },
      carouselContainer: {
        display:'flex',
        height:300,
        width:360,
        bottom: 0,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },
      centrar:{
        display:'flex',
        flexDirection:'column',
        width:300,
        height:700,
        alignItems:'center',
        justifyContent:'space-around'
      },
    
      flexColumnCat:{
            display:"flex",
            flexDirection:"column",
            height:700,
            alignItems: "center",
            justifyContent: "center"
        },

        recetas:{
            display:'flex',
            height:900,
            alignItems:'center',
            justifyContent:'space-around'
        },
        filtros:{
            display:'flex',
            flexColumn:'row',
            justifyContent:'space-around'
        },
        chef:{
            marginTop:10,
            display:'flex',
            flexDirection:'column',
            width:400,
            height:'auto',
        }
    
})



export default estiloApp;