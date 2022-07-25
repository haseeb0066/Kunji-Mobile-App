import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  ImageBackground,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Image,
} from 'react-native';
import * as Yup from 'yup';
import styles from './styles';
import images from '../../../assets/images/images';
import colors from '../../../assets/colors/colors';
import CardItem from '../../../components/common/CardItem/CardItem';
import Header from '../../../components/common/Header/Header';
import AppButton from '../../../components/common/AppButton';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import SuccessAnimation from '../../../assets/Animations/success.json';
import CancleAnimation from '../../../assets/Animations/cancle.json';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import CommonText from '../../../utils/CommonText';

import {hp, wp} from '../../../utils/CommonMethods';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  CalenderIcon,
  backArrow,
  FamilyProfileIcon,
} from '../../../assets/images/svg/SvgImages';
import {END_POINTS} from '../../../server/URL';
import Toast from 'react-native-toast-message';
import apiClient from '../../../Api/client';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';

const VisitorCarParking = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [cancleModalVisible, setCancleModalVisible] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [loading, setLoading] = useState(false);
  const [visitorParkingList, setVisitorList] = useState([]);
  const [reloadVisitorListing, setReloadVisitorListing] = useState(null);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');

  const pendingRequest = [
    {
      id: 7,
      image: images.profileUserImage,
      heading: 'Martin',
      info: '23A Pentasquare DHA Lahore',
    },
  ];
  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    carRegistrationNumber: '',
    makeAndModel: '',
    arrivalDate: '',
    arrivalTime: '',
    leavingDate: '',
    leavingTime: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    mobileNo: Yup.string().required('Mobile no is required field'),
    carRegistrationNumber: Yup.string().required(
      'Car registration number is required field',
    ),
    makeAndModel: Yup.string().required('Make and model is required field'),
    arrivalTime: Yup.string().required('Please select arrival time '),
    arrivalDate: Yup.string().required('Please select arrival date'),
    leavingDate: Yup.string().required('Please select leaving date'),
    leavingTime: Yup.string().required('Please select leaving time'),
  });
  // gallary open function
  const _launchImageLibrary = async () => {
    try {
      let options = {
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      const response = await launchImageLibrary(options);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        const selectedImages = response.assets;
        console.log(selectedImages);
        setMediaUri(selectedImages);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Post visitor car parking function
  const Submit = async values => {
    if (!mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload image',
      });
    } else {
      setLoading(true);
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      let formData = new FormData();
      formData.append('image', imageData);
      formData.append('first_name', values.firstName);
      formData.append('last_name', values.lastName);
      formData.append('mobile', values.mobileNo);
      formData.append('arrival_date', values.arrivalDate);
      formData.append('arrival_time', values.arrivalTime);
      formData.append('leaving_date', values.leavingDate);
      formData.append('leaving_time', values.leavingTime);
      formData.append('car_registration_no', values.carRegistrationNumber);
      formData.append('make_and_model', values.makeAndModel);

      const result = await apiClient.post(
        END_POINTS.addVisitorParking,
        formData,
      );
      if (result.ok) {
        setPopUpModalMessage(result.data?.message);
        setPopUpModalVisible(true);
        setReloadVisitorListing(true);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Required',
          text2: result.data.message,
        });
      }
    }
  };
  // Get Visitor list api function
  const getVisitorCarParkingList = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.getVisitorParkingList);
    if (response.ok) {
      setLoading(false);
      setVisitorList(response?.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: response.data.message,
      });
    }
  };

  useEffect(() => {
    getVisitorCarParkingList();
  }, [reloadVisitorListing]);

  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <PopUpModal
        modalVisiblePopUp={cancleModalVisible}
        source={CancleAnimation}
        onPress={() => {
          setCancleModalVisible(false);
        }}
        messageText={
          'Your Parking Request Not Been Successful Please Contact Admin At Security For Further Details'
        }
        title="OK"
      />
      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
          }}
          messageText={popUpModalMessage}
          title="OK"
        />

        <View style={styles.modalContainer}>
          <KeyboardAvoidingView
            style={{flex: 1}}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <TouchableOpacity
              style={styles.emptyContainer}
              onPress={() => setModalVisible(false)}></TouchableOpacity>
            <View style={styles.modalContentContainer}>
              <ImageBackground
                source={images.formBG}
                style={{flex: 1, paddingTop: hp(1)}}
                imageStyle={styles.formBG}>
                <View style={styles.headingSection}>
                  <Text style={styles.headingText}>
                    {'Book Visitor Car Parking'}
                  </Text>
                  <TouchableOpacity onPress={_launchImageLibrary}>
                    {mediaUri ? (
                      <Image source={mediaUri} style={styles.profileImage} />
                    ) : (
                      <SvgComponent svgMarkup={FamilyProfileIcon} />
                    )}
                  </TouchableOpacity>
                  <Text style={styles.uploadText}>{'Upload Image'}</Text>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.inputContainer}>
                    <AppForm
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={Submit}>
                      <AppFromField
                        label="First Name"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="firstName"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Last Name"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="lastName"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Visitor Mobile No"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Visitor Mobile No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="mobileNo"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      {/* arrival date */}
                      <AppDateTimePickerField
                        label={CommonText.ARRIVAL_DATE}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="arrivalDate"
                      />
                      <AppDateTimePickerField
                        label={CommonText.ARRIVAL_TIME}
                        mode="time"
                        name="arrivalTime"
                      />
                      <AppDateTimePickerField
                        label={CommonText.LEAVING_DATE}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="leavingDate"
                      />
                      <AppDateTimePickerField
                        label={CommonText.LEAVING_TIME}
                        mode="time"
                        name="leavingTime"
                      />
                      <AppFromField
                        label="Car Registration Number"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Car Registration Number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="carRegistrationNumber"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Make And Model"
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Make And Model"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="makeAndModel"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <SubmitButton
                        title="SUBMIT"
                        width={'100%'}
                        loading={loading}
                        borderRadius={15}
                      />
                    </AppForm>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      {/* modal end */}
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title="Visitor car parking"
          fontSize={hp(2.2)}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="REGISTERED VISITORS"
          width={wp(50)}
          backgroundColor={colors.secondaryButtonColor}
          padding={hp(1.2)}
          borderRadius={50}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.flatListContainer}>
        {loading ? (
          <CustomActivityIndicator loading={loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={visitorParkingList}
              keyExtractor={item => item.id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.flatlistSection}>
                    <CardItem
                      onPress={() =>
                        navigation.navigate('CarParkingDetails', item)
                      }
                      cardImageUri={item.image}
                      image={!item.image && images.imagePlaceholder}
                      cardHeading={`${item.first_name} ${item.last_name}`}
                      // cardText={item.last_name}
                      cardSubInfo={item.mobile}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </React.Fragment>
        )}
      </View>
      {/*  */}
      <View style={styles.pendingContainer}>
        <Text style={styles.pendingText}>{'Pending Requests'}</Text>
        <FlatList
          data={pendingRequest}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.flatlistSection}>
                <CardItem
                  onPress={() => setCancleModalVisible(true)}
                  image={item.image}
                  cardHeading={item.heading}
                  cardText={item.info}
                />
              </TouchableOpacity>
            );
          }}
        />
      </View>
    </ImageBackground>
  );
};

export default VisitorCarParking;
