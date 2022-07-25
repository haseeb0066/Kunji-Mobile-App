import React, {Component} from 'react';
import {
  Image,
  ImageBackground,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import images from '../../assets/images/images';
import Header from '../../components/common/Header/Header';

import {hp, wp} from '../../utils/CommonMethods';
import CommonText from '../../utils/CommonText';

import {useNavigation} from '@react-navigation/native';
import DashBoardCard from '../../components/common/DashBoardCard/DashBoardCard';

import AsyncStorage from '@react-native-async-storage/async-storage';

const ResidentServicesHome = ({navigation}) => {
  const {navigate} = useNavigation();

  const Submit = () => {
    AsyncStorage.clear();
    navigate('Splash');
  };

  return (
    <ImageBackground
      resizeMode={'stretch'}
      source={images.home_Scr_Backgrd_Img}
      style={styles.container}>
      <View style={styles.headerView}>
        <Header
          rightIconOnePath={images.header_Right_Icon}
          onPress={() => {
            navigation.goBack();
          }}
          leftIconPath={images.backIcon}
          tintColor={'#6E3F7C'}
        />
      </View>

      <View style={styles.welcomeTextView}>
        <View style={styles.mainView}>
          <View style={styles.textView}>
            <Text style={styles.headingStyle}>{CommonText.WELCOME_STUK}</Text>
          </View>

          <View style={styles.dropDowView}>
            <HomeDropDown />
          </View>

          <View style={styles.FlatListMainView}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingLeft: Platform.OS == 'android' ? wp(2) : wp(0),
              }}>
              <TouchableOpacity onPress={() => navigate('UtilityPayment')}>
                <DashBoardCard name={'Utility Bill Payment'} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: wp(1)}}>
                <DashBoardCard name={'Rent Payment'} />
              </TouchableOpacity>

              <TouchableOpacity style={{paddingLeft: wp(1)}}>
                <DashBoardCard name={'Society Charges'} />
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'flex-end',
                flexDirection: 'row',
                alignSelf: 'flex-end',
                position: 'absolute',
                top: hp(10),
                paddingRight: Platform.OS == 'android' ? wp(2.5) : wp(0),
              }}>
              <TouchableOpacity>
                <DashBoardCard name={'Digital'} />
              </TouchableOpacity>
              <TouchableOpacity style={{paddingLeft: wp(1)}}>
                <DashBoardCard name={'Payment History'} />
              </TouchableOpacity>
              <TouchableOpacity
                //   onPress={()=>{navigate('ResidentServicesHome')}}
                style={{paddingLeft: wp(1)}}>
                <DashBoardCard name={'View Bills'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.muldropDowView}>
        <View style={styles.drdwn1}>
          <HomeDropDown />
        </View>
        <View style={styles.drdwn2}>
          <HomeDropDown />
        </View>
        {/* <View style={styles.drdwn3}>
          <HomeDropDown />
        </View> */}
      </View>
    </ImageBackground>
  );
};
export default ResidentServicesHome;
