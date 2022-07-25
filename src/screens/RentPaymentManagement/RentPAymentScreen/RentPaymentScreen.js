import React, {useState} from 'react';
import {StyleSheet, Text, View, ImageBackground} from 'react-native';
import Header from '../../../components/common/Header/Header';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import RadioGroup from 'react-native-radio-buttons-group';
import {useSelector} from 'react-redux';
import HomeOptionCard from '../../../components/common/HomeOptionCard/HomeOptionCard';
import {
  VisitorManagementIcon,
  delevieryBookingIcon,
  backArrow,
  CreditDebitCard,
  JazzCashIcon,
  wallerIcon,
  jazzCashIcon
} from '../../../assets/images/svg/SvgImages';

const RentPaymentScreen = ({navigation}) => {
  const [cncImages, setCncImages] = useState([]);
  const [UploadedFiles, setUploadedFiles] = useState([]);
  const user = useSelector(state => state.getData);
  const radioButtonsData = [
    {
      id: '1',
      label: 'Rent',
      value: 'Owner Agreement ',
      selected: true,
      labelStyle: {color: colors.primary, fontWeight: 'bold'},
      color: colors.primary,
      borderColor: colors.primary,
    },
    {
      id: '2',
      label: 'Advance',
      value: 'Landlord Agreement',
      labelStyle: {color: colors.primary, fontWeight: 'bold'},
      color: colors.primary,
      borderColor: colors.primary,
    },
    {
      id: '3',
      label: 'Security Deposit',
      value: 'Tenancy Agreement',
      labelStyle: {color: colors.primary, fontWeight: 'bold'},
      color: colors.primary,
      borderColor: colors.primary,
    },
  ];

  const [radioButtons, setRadioButtons] = useState(radioButtonsData);
  const [selectedradioButton, setSelectedradioButton] = useState(
    radioButtonsData[0],
  );

  function onPressRadioButton(radioButtonsArray) {
    console.log('asd', radioButtonsArray);
    setSelectedradioButton(
      radioButtonsArray.filter(btn => btn.selected === true)[0],
    );
    setRadioButtons(radioButtonsArray);
    setCncImages([]);
  }
  return (
    // <Screen style={{flex:1,alignItems:'center',backgroundColor: 'white'}}>
    <ImageBackground
      resizeMode={'stretch'}
      source={images.appBackgroundLight}
      style={styles.container}>
      <View style={{
        width: '100%', 
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)}}>
        <Header
          title={'Rent Payment'}
          textColor={'#2F5351'}
          fontSize={hp(2.5)}
          leftSvgIcon={backArrow(colors.primary)}
          rightIconSize={hp(3)}
          tintColor={colors.primaryTextColor}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
        />
      </View>

      <View style={{marginTop: hp(2)}}>
        <RadioGroup
          radioButtons={radioButtons}
          onPress={onPressRadioButton}
          layout="row"
          containerStyle={styles.RadioButtonContainer}
        />
      </View>

      <View>
        <View style={styles.mainViewField}>
          <View style={{}}>
            <Text style={styles.textLabelStyle}>{'Landlord Name'}</Text>
          </View>
          <View style={styles.View2}>
            <Text style={styles.textstyle}>{'Ahmed'}</Text>
          </View>
        </View>

        <View style={styles.mainViewField}>
          <View style={{}}>
            <Text style={styles.textLabelStyle}>{'Property Adress'}</Text>
          </View>
          <View style={styles.View2}>
            <Text style={styles.textstyle}>{'545, Jasmin Mall'}</Text>
          </View>
        </View>

        <View style={styles.mainViewField}>
          <View style={{}}>
            <Text style={styles.textLabelStyle}>{'Narration'}</Text>
          </View>
          <View style={styles.View2}>
            <Text style={styles.textstyle}>{'********'}</Text>
          </View>
        </View>

        <View style={styles.mainViewField}>
          <View>
            <Text style={styles.textLabelStyle}>{'Amount'}</Text>
          </View>
          <View style={styles.View2}>
            <Text style={styles.textstyle}>{'5874'}</Text>
          </View>
        </View>
      </View>

      <View style={{height: hp(40), width: wp('90%')}}>
        <View style={{borderBottomWidth: 1, marginTop: hp(3), opacity: 0.2}} />
        <View style={{marginTop:hp(2),paddingLeft:wp(3)}}>
              <Text style={{fontSize:18, fontWeight:'bold'}}>{'Payment Method'}</Text>
          </View>
        <View
          style={{flexDirection: 'row', marginTop: hp(3), alignItems:'center', justifyContent:'space-around'}}>
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('CreditDebitCardScreen');
            }}
            title={'Cradit/Dabit Card'}
            svgIcon={CreditDebitCard}
          />
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('JazzCashPaymentScreen');
            }}
            title={'Jazz Cash'}
            svgIcon={jazzCashIcon}
          />
          <HomeOptionCard
            onPress={() => {
              navigation.navigate('Wallet');
            }}
            title={'Wallet'}
            svgIcon={wallerIcon}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default RentPaymentScreen;

const styles = StyleSheet.create({
  mainViewField: {
    width: wp('90%'),
    marginTop: hp(2),
  },
  textLabelStyle: {
    fontSize: 16,
    paddingLeft: wp(3),
    fontWeight: '800',
    color: colors.primaryTextColor,
  },
  View2: {
    borderWidth: 1,
    height: hp(6),
    borderRadius: hp(1.2),
    justifyContent: 'center',
    marginTop: hp(1),
  },
  textstyle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryTextColor,
    paddingLeft: wp(3),
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
