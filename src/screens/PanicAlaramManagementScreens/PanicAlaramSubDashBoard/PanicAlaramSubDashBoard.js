import React, {Component, useState, useEffect} from 'react';
import {
  ImageBackground,
  Text,
  View,
  FlatList,
  ScrollView,
  SectionList,
  SafeAreaView,
  Modal,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import colors from '../../../assets/colors/colors';
import {hp, wp} from '../../../utils/CommonMethods';
import HomeOptionCard from '../../../components/common/HomeOptionCard/HomeOptionCard';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import AlarmBell from '../../../assets/Animations/AlarIcon.json';
import SvgCustomComponents from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import * as Yup from 'yup';
import Geolocation from '@react-native-community/geolocation';
import Toast from 'react-native-toast-message';

import {
  FillCheckboxIcon,
  EmptyCkeckboxIcon,
  FloodIcon,
  panicAlarm,
  FireIcon,
  WildAnimal,
  BreakInIcon,
  Medical,
  CovidIcon,
  LiveLocationIcon,
  RegisterdIcon,
  OtherIcon,
  backArrow,
} from '../../../assets/images/svg/SvgImages';
import useAuth from '../../../Auth/useAuth';
import Screen from '../../../components/common/Screen';
import Routes from '../../../navigation/Routes';
import AppButton from '../../../components/common/AppButton';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import fontFamily from '../../../assets/fonts/fontFamily';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';

const PanicAlaramSubDashBoard = ({navigation}) => {
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [blockExitCheck, setBlockExitCheck] = useState(0);
  console.log('checkbox===>>>', blockExitCheck);
  const [blockExitCheck1, setBlockExitCheck1] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [Loading, setLoading] = useState(false);

  const [selectLocationCard, setLocationSelectCard] = useState(false);
  console.log('==selectCard===>selectCard===>>', selectLocationCard);
  const [selectPanicAlertCard, setSelectPanicAlertCard] = useState(false);
  console.log('>>>>>panic_alert_type>>>>>>>>', selectPanicAlertCard);
  const [getUserListDate, setGetUserListData] = useState();
  const [latLong, setLateLong] = useState(false);
  console.log('latLong======', latLong);
  const [locationCard, setLocationCard] = useState(false);
  const [textInputState, setTextInputState] = useState(false);

  // Post API For Panic ALarms
  const createPanicAlertonSubmit = async value => {
    setLoading(true);
    var formdata = new FormData();
    console.log('asd', selectLocationCard);
    if (selectLocationCard) formdata.append('map_id', selectLocationCard.id);
    formdata.append('alarm_type', selectPanicAlertCard?.name);
    formdata.append('lat', latLong?.latitude);
    formdata.append('long', latLong?.longitude);
    formdata.append('notify_society', blockExitCheck ? 1 : 0);
    formdata.append('notify_emergency_contact', blockExitCheck1 ? 1 : 0);
    formdata.append('other_field', textInputState);

    const result = await apiClient.post(END_POINTS.addNewAlert, formdata);
    if (result.ok) {
      setLoading(false);
      navigation.goBack();
      console.log('==resssssss==>>', result.data);
      Toast.show({
        type: 'success',
        text1: 'Successfully Created',
      });
    } else {
      console.log('api_error', result.data);
      setLoading(false);
    }
    console.log('====formData===>>===formData===>>>>', formdata);
  };

  // console.log('======CreatePaniceAlarm===>>', createPanicAlertonSubmit);

  // Get Servant List API
  const getPropertiesDataList = async () => {
    const result = await apiClient.get(END_POINTS.getPropertiesList);
    if (result.ok) {
      console.log(
        '====Result==getPropertiesDataList=getPropertiesDataList===API==>>>>',
        result.data.user_property_list,
      );
      setGetUserListData(result.data.user_property_list);
    } else console.log('error');
  };
  useEffect(() => {
    getPropertiesDataList();
  }, []);

  const submitText = value => {
    console.log('textxxxxx', value.firstName);
    setTextInputState(value.firstName);
    setModalVisible1(!modalVisible1);
    // loading={Loading}
  };

  const initialValues = {
    firstName: '',
  };
  console.log('jdshjsdjhsjhjhsdf', initialValues);
  const validationSchema = Yup.object({
    firstName: Yup.string().required('location field required'),
  });
  const sections = [
    {
      //   title: 'Resident Services',
      key: 'panic_alerts',
      data: [
        {
          list: [
            {
              id: 1,
              name: 'fire',
              svgIcon: FireIcon,
              alarmSelction: true,
              // navigate: Routes.VISITOR_MANAGEMENT,
            },
            {id: 2, name: 'flood', svgIcon: FloodIcon, alarmSelction: true},
            {
              id: 3,
              name: 'wild_animal',
              svgIcon: WildAnimal,
              alarmSelction: true,
            },
            {
              id: 4,
              name: 'break_in',
              svgIcon: BreakInIcon,
              alarmSelction: true,
            },
            {id: 5, name: 'medical', svgIcon: Medical, alarmSelction: true},
            {
              id: 6,
              name: 'covid',
              svgIcon: CovidIcon,
              navigate: Routes.PANIC_ALARAM_SCREEN,
              alarmSelction: true,
            },
          ],
        },
      ],
    },

    {
      title: 'Location',
      key: 'location',
      data: [
        {
          list: [
            {
              id: 7,
              name: 'Live Location',
              svgIcon: LiveLocationIcon,
            },
            {
              id: 8,
              name: 'Register Location',
              svgIcon: RegisterdIcon,
              needPopupModal: true,
            },
            {
              id: 9,
              name: 'Other',
              svgIcon: OtherIcon,
              needPopupModal: true,
              // navigate: () => setPopUpModalVisible(true),
            },
          ],
        },
      ],
    },
  ];

  const getLocation = () => {
    Geolocation.getCurrentPosition(pos => {
      const crd = pos.coords;
      // console.log('=======ccrrr====>>>>>', crd);
      let position = {
        latitude: crd.latitude,
        longitude: crd.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setLateLong(position);
    }).catch(err => {
      console.log(err);
    });
  };

  const renderSection = ({item}) => {
    return (
      <FlatList
        data={item.list}
        numColumns={3}
        renderItem={renderListItem}
        keyExtractor={keyExtractor}
      />
    );
  };
  const renderSectionHeader = ({section}) => {
    return (
      <View>
        <Text
          style={{
            fontSize: hp(2),
            color: '#2F5351',
            fontWeight: 'bold',
            // borderWidth:1,
            paddingTop: hp(0.5),
            paddingBottom: hp(0.5),
          }}>
          {section.title}
        </Text>
      </View>
    );
  };
  const renderListItem = ({item}) => {
    return (
      <View>
        <HomeOptionCard
          title={item.name}
          svgIcon={item.svgIcon}
          cardbgImg={
            selectPanicAlertCard?.id === item.id || locationCard?.id === item.id
              ? images.bgImgforCard
              : images.home_card_bg_img
          }
          onPress={() => {
            if (item.alarmSelction) {
              setSelectPanicAlertCard(item);
            } else if (item.id === 8) {
              item?.needPopupModal === true && setModalVisible(true);
              setLocationCard(item);
              // setLocationSelectCard('');
              setLateLong('');
              setTextInputState('');
            } else if (item.id === 9) {
              item?.needPopupModal === true && setModalVisible1(true);
              setLocationCard(item);
              setLateLong('');

              setLocationSelectCard('');
            }

            if (item.id === 7) {
              setLocationCard(item);
              getLocation();
              setLocationSelectCard('');
              setTextInputState('');
            }
          }}
        />
      </View>
    );
  };

  const keyExtractor = item => {
    return item.name;
  };

  return (
    // <Screen style={{backgroundColor: 'white'}}>
    <ImageBackground
      resizeMode={'stretch'}
      source={images.appBackgroundLight}
      style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(false);
        }}>
        <TouchableOpacity style={styless.centeredView}>
          <View style={styless.modalView}>
            <Text style={styless.modalText}>Enter Registered Location</Text>
            <ScrollView>
              <View
                style={{
                  alignItems: 'center',
                  width: '100%',
                  height: '80%',
                }}>
                {getUserListDate?.map(details => (
                  <TouchableOpacity
                    key={details.id}
                    onPress={() => {
                      setLocationSelectCard(details);
                      setModalVisible(false);
                    }}
                    style={{
                      marginTop: hp(1),
                      borderWidth: 1,
                      width: '100%',
                      height: hp(6),
                      borderRadius: hp(1.4),
                      justifyContent: 'center',
                      borderColor: colors.primaryTextColor,
                      backgroundColor:
                        selectLocationCard?.id === details.id
                          ? colors.primaryTextColor
                          : 'white',
                    }}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'row',
                        width: wp(75),
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          flex: 0.2,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color:
                              selectLocationCard?.id === details.id
                                ? 'white'
                                : colors.primaryTextColor,
                          }}>
                          {details.mapping_level_three_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.3,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color:
                              selectLocationCard?.id === details.id
                                ? 'white'
                                : colors.primaryTextColor,
                          }}>
                          {details.mapping_level_two_name}
                        </Text>
                      </View>
                      <View
                        style={{
                          flex: 0.5,
                          alignItems: 'center',
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            color:
                              selectLocationCard?.id === details.id
                                ? 'white'
                                : colors.primaryTextColor,
                          }}>
                          {details.mapping_level_one_name}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible1(!modalVisible1);
        }}>
        <TouchableOpacity
          style={styless.centeredView}
          onPress={() => setModalVisible1(false)}>
          <View style={styless.modalView}>
            <Text style={styless.modalText}>Enter Other Location</Text>

            <AppForm
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitText}>
              <AppFromField
                label="Location"
                width={'90%'}
                placeholderTextColor={colors.placeHolderColor}
                placeholder=" Linf In Blocck 5"
                autoCapitalize="none"
                autoCorrect={false}
                name="firstName"
                borderColor={colors.red}
                borderWidth={1}
                borderRadius={15}
              />
              <SubmitButton
                title="SUBMIT"
                width={'30%'}
                // onPress={() => setModalVisible1(!modalVisible1)}
                borderRadius={15}
              />
            </AppForm>
          </View>
        </TouchableOpacity>
      </Modal>

      <PopUpModal
        modalVisiblePopUp={popUpModalVisible}
        source={AlarmBell}
        onPress={() => {
          setPopUpModalVisible(false);
          // setModalVisible(false);
        }}
        messageText={'Alarm Raised Successfully Notified Emergency Contact'}
        title="OK"
      />

      <SectionList
        ListHeaderComponent={() => (
          <View style={styles.headerView}>
            <Header
              title={'Panic Alerts'}
              textColor={'#2F5351'}
              fontSize={hp(2.5)}
              leftSvgIcon={backArrow(colors.primaryTextColor)}
              tintColor={colors.primaryTextColor}
              onLeftIconPress={() => {
                navigation.goBack();
              }}
              righttitle={'View History'}
              righttitleSize={hp(1.3)}
              righttextColor={'#2F5351'}
              onRightIconPress={() =>
                navigation.navigate('ViewPanicAlertsHistory')
              }
            />
          </View>
        )}
        ListFooterComponent={() => (
          <View style={{marginTop: hp(3), alignItems: 'center'}}>
            <View style={styles.inputView}>
              <View style={styles.heading}>
                <Text style={styles.nameText}>
                  {'Notify Building Society Services'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.userText}
                onPress={() => setBlockExitCheck(!blockExitCheck)}>
                {blockExitCheck ? (
                  <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                ) : (
                  <SvgCustomComponents svgMarkup={EmptyCkeckboxIcon} />
                )}
              </TouchableOpacity>
              {/* <Text>{blockExitCheck ? 1 : 0}</Text> */}
            </View>

            <View style={styles.inputView}>
              <View style={styles.heading}>
                <Text style={styles.nameText}>
                  {'Notify My Emergency Contact'}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.userText}
                onPress={() => setBlockExitCheck1(!blockExitCheck1)}>
                {blockExitCheck1 ? (
                  <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                ) : (
                  <SvgCustomComponents svgMarkup={EmptyCkeckboxIcon} />
                )}
              </TouchableOpacity>
            </View>
            <AppButton
              // width={wp('90%')}
              loading={Loading}
              width={'97%'}
              title={'RAISE ALARM'}
              onPress={() => {
                // setPopUpModalVisible(true);
                createPanicAlertonSubmit();
              }}
              borderRadius={15}
            />
            {/* <AppButton
              width={'97%'}
              title={'CANCEL'}
              backgroundColor={'red'}
              borderRadius={15}
            /> */}
          </View>
        )}
        showsVerticalScrollIndicator={false}
        sections={sections}
        renderSectionHeader={renderSectionHeader}
        renderItem={renderSection}
        contentContainerStyle={{
          paddingBottom: hp(10),
          // alignItems:'center'
        }}
      />
    </ImageBackground>
    // </Screen>
  );
};
export default PanicAlaramSubDashBoard;

const styless = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '90%',
    // height: '40%',
    backgroundColor: 'white',
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    paddingBottom: hp(5),
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'red',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    padding: hp(2),
    textAlign: 'center',
    fontWeight: '600',
    fontWeight: 'bold',
  },
  selected: {
    backgroundColor: 'red',
    color: 'red',
  },
  unselected: {
    backgroundColor: 'green',
    color: 'green',
  },
  option: {
    color: 'yellow',
  },
});
