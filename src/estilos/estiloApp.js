import React from "react";
import { StyleSheet } from "react-native";


const estiloApp = StyleSheet.create({

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
        height:500,
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
        borderWidth:1,
        marginTop:20,

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
      }

    

})



export default estiloApp;