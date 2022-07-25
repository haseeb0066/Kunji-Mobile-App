import React, {useState} from 'react';
import images from '../../assets/images/images';
import styles from './styles';
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import FamilyMemCard from '../../components/common/FamilyMemberCard/FamilyMemCard';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {
  UserIcon,
  CarIcon,
  BuildingIcon,
  arrowRihtIcon,
  TanssntsIcon,
  ProfileBG,
  LogOutIcon,
  userIcon2,
  SingleUser,
} from '../../assets/images/svg/SvgImages';
import {ProfileIcon} from '../../assets/images/svg/SvgImages';
import SvgCustomComponents from '../../components/common/SvgCustomComponents/SvgCustomComponents';
import {hp, wp} from '../../utils/CommonMethods';
import Header from '../../components/common/Header/Header';
import colors from '../../assets/colors/colors';
import useAuth from '../../Auth/useAuth';
import apiClient from '../../Api/client';
import {BASE_URL, END_POINTS} from '../../server/URL';
import Loader from '../../components/common/Loader/Loader';

const AppProfile = ({navigation}) => {
  const user = useSelector(state => state.getData);
  const {navigate} = useNavigation();
  const data = [{item: 'name'}, {item: 'name'}, {item: 'name'}, {item: 'name'}];
  const [loading, setLoading] = useState(false);
  const {logOut} = useAuth();

  const Submit = async () => {
    setLoading(true);
    const logoutResponse = await apiClient.post(END_POINTS.logOut);
    console.log(logoutResponse.data);
    if (logoutResponse.ok) {
      setLoading(false);
      logOut();
    } else {
      setLoading(false);
    }

    // AsyncStorage.clear();
    // navigate('Splash');
  };

  return (
    <ImageBackground
      resizeMode={'cover'}
      source={images.appBackgroundLight}
      style={styles.container}>
      {loading && <Loader isloading={loading} />}
      <ScrollView>
        <View
          style={{
            ...Platform.select({
              android: {
                height: hp(6.8),
              },
              ios: {
                height: hp(8),
              },
            }),
            marginTop: hp(2),
            width: wp('100%'),
          }}>
          <Header
            title={'Profile'}
            textColor={'#2F5351'}
            fontSize={hp(2.5)}
            tintColor={'#2F5351'}
          />
        </View>
        <View
          style={{
            justifyContent: 'center',
            width: wp('100%'),
            // marginTop: hp(),
          }}>
          <View style={{width: wp('86%'), alignSelf: 'center'}}>
            <Text
              style={{
                color: colors.primary,
                fontWeight: 'bold',
                fontSize: hp(2),
                marginBottom: hp(0.5),
              }}>
              {'Personal Detail'}
            </Text>
          </View>
        </View>

        <View style={styles.cardView}>
          <TouchableOpacity onPress={() => navigate('ViewProfile')}>
            <FamilyMemCard
              cardText={'View Profile'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={SingleUser}
            />
          </TouchableOpacity>

          <View
            style={{
              justifyContent: 'center',
              width: wp('100%'),
              marginTop: hp(2),
            }}>
            <View style={{width: wp('96%'), alignSelf: 'center'}}>
              <Text
                style={{
                  color: colors.primary,
                  paddingLeft: wp(5),
                  fontWeight: 'bold',
                  fontSize: hp(2),
                  marginBottom: hp(0.5),
                }}>
                {'Manage Detail'}
              </Text>
            </View>
          </View>

          <TouchableOpacity onPress={() => navigate('AddFamilyMember')}>
            <FamilyMemCard
              cardText={'Manage my family members'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={UserIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('TanantHome')}>
            <FamilyMemCard
              cardText={'Manage my tenants'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={TanssntsIcon}
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigate('ManageMyVehicle')}>
            <FamilyMemCard
              cardText={'Manage my vehicles'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={CarIcon}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigate('PropertiesMainDetails')}>
            <FamilyMemCard
              cardText={'Manage my properties'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={BuildingIcon}
            />
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              width: wp('100%'),
              marginTop: hp(2),
            }}>
            <View style={{width: wp('96%'), alignSelf: 'center'}}>
              <Text
                style={{
                  color: colors.primary,
                  paddingLeft: wp(5),
                  fontWeight: 'bold',
                  fontSize: hp(2),
                  marginBottom: hp(0.5),
                }}>
                {'Setting'}
              </Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => navigate('ChangePassword')}>
            <FamilyMemCard
              cardText={'Change Password'}
              svgRightIcon={arrowRihtIcon}
              svgIcon={SingleUser}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'center',
              marginTop: hp(2),
              // backgroundColor: 'green',
              width: '88%',
            }}
            onPress={() => {
              Submit();
            }}
            // onPress={() => navigate('AddNewFamilyMembers')}
          >
            {/* <FamilyMemCard cardText={'Logout'} svgIcon={LogOutIcon} /> */}
            <SvgCustomComponents svgMarkup={LogOutIcon} />
            <Text
              style={{
                fontSize: 15,
                color: colors.primaryTextColor,
                fontWeight: '600',
                left: wp(5),
              }}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};
export default AppProfile;
