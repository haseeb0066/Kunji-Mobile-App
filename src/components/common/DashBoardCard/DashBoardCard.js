import React from 'react'
import {ImageBackground, Text, View} from "react-native";
import images from "../../../assets/images/images";
import styles from "./styles";

const DashBoardCard =(props)=>{
    return(
            <ImageBackground
                source={images.flatlsit_Card_Img}
                style={styles.FlateMainViewStyle}>
                <View>
                    <Text style={styles.textStyle}>{props.name}</Text>
                </View>
            </ImageBackground>
    )
}
export default  DashBoardCard;
