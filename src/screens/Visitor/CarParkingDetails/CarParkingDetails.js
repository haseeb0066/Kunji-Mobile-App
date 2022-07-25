import React from 'react';
import {View, ImageBackground, ScrollView, Text} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import CommonText from '../../../utils/CommonText';
import {useRoute} from '@react-navigation/native';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';

const CarParkingDetails = ({navigation}) => {
  const {params} = useRoute();
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title="Car parking details"
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.image}
          cardHeading={params.first_name}
          cardText={params.last_name}
          // cardSubInfo={params.mobile}
        />
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              {/* <ViewDetailField Heading={'Pin Code'} Name={'2345676'} /> */}
              <ViewDetailField
                Heading={'First Name'}
                Name={params.first_name}
              />
              <ViewDetailField Heading={'Last Name'} Name={params.last_name} />
              <ViewDetailField
                Heading={'Visitor Mobile No.'}
                Name={params.mobile}
              />
              <ViewDetailField
                Heading={CommonText.ARRIVAL_DATE}
                Name={params.arrival_date}
              />
              <ViewDetailField
                Heading={CommonText.ARRIVAL_TIME}
                Name={params.arrival_time}
              />
              <ViewDetailField
                Heading={CommonText.LEAVING_DATE}
                Name={params.leaving_date}
              />
              <ViewDetailField
                Heading={CommonText.LEAVING_TIME}
                Name={params.leaving_time}
              />
              <ViewDetailField
                Heading={'Car Register Number'}
                Name={params.car_registration_no}
              />
              <ViewDetailField
                Heading={'Make And Model'}
                Name={params.make_and_model}
              />
              <AppButton
                title="OK"
                width={'100%'}
                onPress={() => navigation.navigate('VisitorCarParking')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default CarParkingDetails;
