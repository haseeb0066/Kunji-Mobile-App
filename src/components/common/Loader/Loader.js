import React, {useState, useEffect, useRef} from 'react';
import {SafeAreaView, Text, View, TouchableOpacity, Modal, Image, ActivityIndicator} from 'react-native';
import {useTheme} from "@react-navigation/native";
import loaderStyles from "./styles";

const Loader =(props)=>{

    const {colors} = useTheme();
    const styles = loaderStyles(colors);
    const [isloading , setIsLoading] = useState(props.isloading);
    useEffect(()=>{
        setIsLoading(props.isloading)
    },[props.isloading]);
    return (
        <Modal
            visible={isloading}
            animationType={"fade"}
            transparent={true}
            onRequestClose={()=>{setIsLoading(false)}}>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <ActivityIndicator color={colors.DEEP_PURPLE} size={"large"}/>
                </View>
            </View>
        </Modal>
    );
}


export default Loader;










