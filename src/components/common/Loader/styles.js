
import {StyleSheet} from "react-native";
import {hp} from "../../../utils/CommonMethods";

const loaderStyles =( colors )=> StyleSheet.create(
    {
        container: {
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.4)",
            justifyContent:"center",
            alignItems:"center",
        },
        modalContainer:{
            backgroundColor:colors.WHITE,
            height:hp(12),
            width:hp(12),
            justifyContent:'center',
            alignItems:'center',
            borderRadius:hp(2)
        }
    }
)

export default loaderStyles;

