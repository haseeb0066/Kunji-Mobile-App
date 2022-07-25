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
import CommonText from '../../../utils/CommonText';

import {hp, wp} from '../../../utils/CommonMethods';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  CalenderIcon,
  backArrow,
  FamilyProfileIcon,
} from '../../../assets/images/svg/SvgImages';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';

const AddVisitor = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');
  const [visitorDate, setVisitorDate] = useState([]);
  const [reloadVisitorListing, setReloadVisitorListing] = useState(null);

  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
    arrivalDate: '',
    arrivalTime: '',
    leavingDate: '',
    leavingTime: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    mobileNo: Yup.string().required('Mobile no is required field'),
    email: Yup.string().email().required('Email is required feild'),
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

  const Submit = async values => {
    if (!mediaUri) {
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: 'Kindly upload visitor image',
      });
    } else {
      setLoading(true);
      const imageData = {
        uri: mediaUri[0]?.uri,
        name: mediaUri[0]?.fileName,
        type: mediaUri[0]?.type,
      };
      let formdata = new FormData();
      formdata.append('image', imageData);
      formdata.append('first_name', values.firstName);
      formdata.append('last_name', values.lastName);
      formdata.append('mobile', values.mobileNo);
      formdata.append('email', values.email);
      formdata.append('arrival_date', values.arrivalDate);
      formdata.append('arrivel_time', values.arrivalTime);
      formdata.append('leaving_date', values.leavingDate);
      formdata.append('leaving_time', values.leavingTime);

      const result = await apiClient.post(END_POINTS.addVisitor, formdata);
      console.log(result.data);
      if (result.ok) {
        setPopUpModalMessage(result.data?.message);
        setPopUpModalVisible(true);
        setReloadVisitorListing(true);
        setLoading(false);
      } else {
        setLoading(false);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.data.message,
        });
      }
    }
  };

  const getVisitorListApi = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.getVisitorList);
    // console.log('response visitor list', response);
    if (response.ok) {
      setLoading(false);
      setVisitorDate(response?.data);
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
    getVisitorListApi();
  }, [reloadVisitorListing]);

  return (
    <ImageBackground source={images.splash} style={styles.container}>
      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
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
                {/*  */}
                <View style={styles.headingSection}>
                  <Text style={styles.headingText}>
                    {CommonText.VISITOR_REGIS}
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
                        label={'First Name'}
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
                        label={'Last Name'}
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
                        label={CommonText.MOBILE_NO}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Mobile No."
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="mobileNo"
                        keyboardType="numeric"
                        TextContentType="emailAddress"
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderRadius={15}
                        borderColor={colors.red}
                      />
                      <AppFromField
                        label={CommonText.EMAIL}
                        width={'100%'}
                        placeholderTextColor={colors.placeHolderColor}
                        placeholder="Email"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="email"
                        keyboardType="email-address"
                        TextContentType="emailAddress"
                        borderColor={colors.red}
                        borderWidth={1}
                        borderRadius={15}
                      />

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

                      <SubmitButton
                        title={CommonText.SUBMIT}
                        borderRadius={15}
                        loading={loading}
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
          title="Visitor Registration"
          fontSize={hp(2.2)}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="ADD NEW VISITOR"
          width={wp(45)}
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
              data={visitorDate}
              keyExtractor={item => item.id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.flatlistSection}>
                    <CardItem
                      onPress={() =>
                        navigation.navigate('VisitorDetails', item)
                      }
                      cardImageUri={item.image}
                      image={!item.image && images.imagePlaceholder}
                      cardHeading={`${item.first_name} ${item.last_name}`}
                      cardSubInfo={item.mobile}
                      // cardText={`${item.arrival_date} ${item.leaving_date}`}
                    />
                  </TouchableOpacity>
                );
              }}
            />
          </React.Fragment>
        )}
      </View>
    </ImageBackground>
  );
};

export default AddVisitor;
