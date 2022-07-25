import React, {useState} from 'react'
import { StyleSheet, Text, TouchableOpacity, View , ScrollView, ImageBackground} from 'react-native'
import Header from '../../../components/common/Header/Header'
import images from '../../../assets/images/images'
import colors from '../../../assets/colors/colors'
import { hp, wp } from '../../../utils/CommonMethods'
import HomeOptionCard from '../../../components/common/HomeOptionCard/HomeOptionCard'
import {VisitorManagementIcon,
  delevieryBookingIcon, 
  backArrow,
  CreditDebitCard,
  JazzCashIcon,
  wallerIcon
} from '../../../assets/images/svg/SvgImages';
import Wallet from '../../Wallet/Wallet'


const SocietyPaymentScreen = ({navigation}) => {
  return (
    // <Screen style={{flex:1,alignItems:'center',backgroundColor: 'white'}}>
       <ImageBackground
        resizeMode={'stretch'}
        source={images.appBackgroundLight}
        style={styles.container}>

      <View style={{width: '100%', 
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)}}>
           <Header
                title={'Society Payment'}
                textColor={'#2F5351'}
                fontSize={hp(2.5)}
                //  leftIconPath={images.arrow_back}
              leftSvgIcon={backArrow(colors.primaryTextColor)}
                rightIconSize={hp(3)}
                tintColor={colors.primaryTextColor}
                onLeftIconPress={() => {
                    navigation.goBack();
                }}
              />
           </View>

     
              <View>
                <View style={styles.mainViewField}>
                    <View style={{}}>
                        <Text style={styles.textLabelStyle}>{'Due'}</Text>
                    </View>
                    <View style={styles.View2}>
                    <Text style={styles.textstyle}>{'33241'}</Text>
                    </View>
                </View>
              
                <View style={styles.mainViewField}>
                    <View style={{}}>
                        <Text style={styles.textLabelStyle}>{'Advance'}</Text>
                    </View>
                    <View style={styles.View2}>
                    <Text style={styles.textstyle}>{'5450'}</Text>
                    </View>
                </View>

                <View style={styles.mainViewField}>
                    <View style={{}}>
                        <Text style={styles.textLabelStyle}>{'Total Payment'}</Text>
                    </View>
                    <View style={styles.View2}>
                    <Text style={styles.textstyle}>{'3658'}</Text>
                    </View>
                </View>
          </View>

          <View style={{height:hp(40), width:wp('90%')}}>

          <View style={{borderBottomWidth:1.5, marginTop:hp(3), opacity:0.1}}/>
          
          <View style={{marginTop:hp(2),paddingLeft:wp(3)}}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>{'Payment Method'}</Text>
          </View>
           
       <View style={{alignItems:'center', justifyContent:'space-around',flexDirection:'row',marginTop:hp(2) }}>
       <HomeOptionCard
       onPress={()=>{navigation.navigate('SocietyCreditDebitCardScreen')}}
        title={'Cradit/Dabit Card'} 
        svgIcon={CreditDebitCard}
        />
        <HomeOptionCard
        onPress={()=>{navigation.navigate('SocietyJazzCashPaymentScreen')}}
        title={'Jazz Cash'} 
        svgIcon={JazzCashIcon}
        />
         <HomeOptionCard
       onPress={()=>{navigation.navigate('SocietyWallet')}}
        title={'Wallet'} 
        svgIcon={wallerIcon}
        />
       </View>
          </View>
          </ImageBackground>
  )
}

export default SocietyPaymentScreen

const styles = StyleSheet.create({
  mainViewField:{
    width:wp('90%'), 
    marginTop:hp(2)
  },
  textLabelStyle:{
    fontSize:16,
    paddingLeft:wp(3),
    fontWeight:'800', 
    color:colors.primaryTextColor
  },
  View2:{
    borderWidth:1,
    height:hp(6), 
    borderRadius:hp(1.2), 
    justifyContent:"center", 
    marginTop:hp(1), 
  },
  textstyle:{
    fontSize:14, 
    fontWeight:'600', 
    color:colors.primaryTextColor, 
    paddingLeft:wp(3)
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
})