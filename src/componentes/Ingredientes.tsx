import { RouteProp, useRoute } from "@react-navigation/native";
import { TipoParametros } from "../App";
import { View } from "react-native";


type IngredientesProps= RouteProp<TipoParametros, "Receta">;


export default function Ingredientes() :JSX.Element {


    const route=useRoute<IngredientesProps>();

    return(
        <View>

        </View>
    )

}