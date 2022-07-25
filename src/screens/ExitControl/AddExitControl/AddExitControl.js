import React, {useState} from 'react';
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
import SvgCustomComponents from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import AppForm from '../../../components/common/FormComponents/AppForm';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import SuccessAnimation from '../../../assets/Animations/success.json';

import {hp, wp} from '../../../utils/CommonMethods';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  backArrow,
  FillCheckboxIcon,
  EmptyCkeckboxIcon,
  FamilyProfileIcon,
} from '../../../assets/images/svg/SvgImages';

const AddExitControl = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [allowEntryCheck, setAllowEntryCheck] = useState(false);
  const [blockEntryCheck, setBlockEntryCheck] = useState(false);
  const [allowExitCheck, setAllowExitCheck] = useState(false);
  const [blockExitCheck, setBlockExitCheck] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);

  const data = [
    {
      id: 1,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 2,
      image: images.profileUserImage,
      heading: 'Martin',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 3,
      image: images.profileUserImage,
      heading: 'Rock',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 4,
      image: images.profileUserImage,
      heading: 'Rock',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 5,
      image: images.profileUserImage,
      heading: 'Anup Joshi',
      info: '23A Pentasquare DHA Lahore',
    },
    {
      id: 6,
      image: images.profileUserImage,
      heading: 'Martin',
      info: '23A Pentasquare DHA Lahore',
    },
  ];

  const initialValues = {
    firstName: '',
    lastName: '',
    mobileNo: '',
    email: '',
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    mobileNo: Yup.string().required('Mobile no is required field'),
    email: Yup.string().email().required('email is equired feild'),
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
        // setCncTenancy(prev => [...prev, selectedImages[0]]);
        // const source = {uri: response.assets[0].uri};
        // console.log('response', JSON.stringify(response));
        // setIsGallery({
        //   filePath: response,
        //   fileData: response.data,
        //   fileUri: response.uri,
        // });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      {/* modal start */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          // Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
          }}
          messageText={'Your Request has been Completed Successfully!'}
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
                    {'Entry / Exit Control'}
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
                      validationSchema={validationSchema}>
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
                        borderColor={colors.primary}
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
                        borderColor={colors.primary}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Mobile No"
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
                      />
                      {/* view */}
                      <View style={styles.inputView}>
                        <View style={styles.heading}>
                          <Text style={styles.nameText}>{'Allow Entery'}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.userText}
                          onPress={() => setAllowEntryCheck(!allowEntryCheck)}>
                          {allowEntryCheck ? (
                            <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                          ) : (
                            <SvgCustomComponents
                              svgMarkup={EmptyCkeckboxIcon}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={styles.inputView}>
                        <View style={styles.heading}>
                          <Text style={styles.nameText}>{'Block Entery'}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.userText}
                          onPress={() => setBlockEntryCheck(!blockEntryCheck)}>
                          {blockEntryCheck ? (
                            <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                          ) : (
                            <SvgCustomComponents
                              svgMarkup={EmptyCkeckboxIcon}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      {/*  */}
                      <View style={styles.inputView}>
                        <View style={styles.heading}>
                          <Text style={styles.nameText}>{'Allow Exit'}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.userText}
                          onPress={() => setAllowExitCheck(!allowExitCheck)}>
                          {allowExitCheck ? (
                            <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                          ) : (
                            <SvgCustomComponents
                              svgMarkup={EmptyCkeckboxIcon}
                            />
                          )}
                        </TouchableOpacity>
                      </View>
                      <View style={styles.inputView}>
                        <View style={styles.heading}>
                          <Text style={styles.nameText}>{'Block Exit'}</Text>
                        </View>
                        <TouchableOpacity
                          style={styles.userText}
                          onPress={() => setBlockExitCheck(!blockExitCheck)}>
                          {blockExitCheck ? (
                            <SvgCustomComponents svgMarkup={FillCheckboxIcon} />
                          ) : (
                            <SvgCustomComponents
                              svgMarkup={EmptyCkeckboxIcon}
                            />
                          )}
                        </TouchableOpacity>
                      </View>

                      {/*  */}
                      <SubmitButton
                        title="SAVE"
                        width={'100%'}
                        // onPress={() => setPopUpModalVisible(true)}
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
          title="Entry / Exit Control"
          fontSize={hp(2.2)}
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.buttonContainer}>
        <AppButton
          title="ENTRY/EXIT CONTROL"
          width={wp(50)}
          backgroundColor={colors.secondaryButtonColor}
          padding={hp(1.2)}
          borderRadius={50}
          onPress={() => setModalVisible(true)}
        />
        <View style={styles.familyContainer}>
          <Text style={styles.familyText}>{'Family Members'}</Text>
        </View>
      </View>

      <View style={styles.flatListContainer}>
        <FlatList
          data={data}
          keyExtractor={item => item.id}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            return (
              <TouchableOpacity style={styles.flatlistSection}>
                <CardItem
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

export default AddExitControl;
