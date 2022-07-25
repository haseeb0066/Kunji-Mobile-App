import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Modal,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Text,
  Image,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import AppForm from '../../../components/common/FormComponents/AppForm';
import * as Yup from 'yup';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {
  CalenderIcon,
  backArrow,
  FamilyProfileIcon,
} from '../../../assets/images/svg/SvgImages';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import SuccessAnimation from '../../../assets/Animations/success.json';
import CommonText from '../../../utils/CommonText';
import {launchImageLibrary} from 'react-native-image-picker';
import {useFocusEffect} from '@react-navigation/native';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import AppButton from '../../../components/common/AppButton';
import AppDateTimePickerField from '../../../components/common/FormComponents/AppDateTimePickerField';
import AppModalField from '../../../components/common/FormComponents/AppModalField';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import Toast from 'react-native-toast-message';

const AddGatePass = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [mediaUri, setMediaUri] = useState(null);
  const [open, setOpen] = useState(false);
  const [servantItems, setServantItems] = useState([]);
  const [gatePassData, setGatePassData] = useState([]);
  const [reloadGatePassListing, setReloadGatePassListing] = useState(null);
  const [servantValue, setServantValue] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');

  const initialValues = {
    domesticWorker: '',
    arrivalDate: '',
    leavingDate: '',
  };
  const validationSchema = Yup.object({
    domesticWorker: Yup.string().required('Please select worker name'),
    arrivalDate: Yup.string().required('Please select valid from date'),
    leavingDate: Yup.string().required('Please select valid till date '),
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

  // Get servant List
  const getServatList = async () => {
    setLoading(true);
    const response = await apiClient.get(END_POINTS.servantList);
    if (response.ok) {
      setLoading(false);
      setServantItems(response?.data);
    } else {
      setLoading(false);
      alert('error');
    }
    setLoading(false);
  };
  useEffect(() => {
    getServatList();
  }, []);

  //  ADD Gate pass request
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
      let formdata = new FormData();
      formdata.append('image', imageData);
      formdata.append('servant_id', servantValue);
      formdata.append('from', values.arrivalDate);
      formdata.append('to', values.leavingDate);

      const result = await apiClient.post(END_POINTS.addGatePass, formdata);
      if (result.ok) {
        setLoading(false);
        setPopUpModalMessage(result.data?.message);
        setPopUpModalVisible(true);
        setReloadGatePassListing(true);
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

  // get gate pass
  const getGatePassList = async () => {
    setLoading(true);
    const gatePassResponse = await apiClient.get(END_POINTS.getGatePass);
    // console.log('gate pass Response list ====>', gatePassResponse);
    if (gatePassResponse.ok) {
      setGatePassData(gatePassResponse?.data);
    } else {
      setLoading(false);
      Toast.show({
        type: 'error',
        text1: 'Required',
        text2: gatePassResponse.data.message,
      });
    }
  };
  useFocusEffect(
    useCallback(() => {
      // setLoading(true);
      getGatePassList();
      setLoading(false);
    }, []),
  );

  return (
    <ImageBackground source={images.splash} style={styles.contianer}>
      {/* Modal start */}
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

        <View style={{flex: 1}}>
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
                    {'New Gate Pass Request'}
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
                      <AppModalField
                        name="domesticWorker"
                        label="Domestic Worker"
                        placeholder="Select Domestic Worker"
                        placeholderStyle={{color: colors.placeHolderColor}}
                        open={open}
                        value={servantValue}
                        items={servantItems}
                        setOpen={setOpen}
                        setValue={setServantValue}
                        setItems={setServantItems}
                        listMode="MODAL"
                        schema={{
                          label: 'full_name',
                          value: 'id',
                        }}
                        onChangeValue={value => {
                          setServantValue(value);
                        }}
                      />
                      {/* Valid from date */}
                      <AppDateTimePickerField
                        label={'Valid From Date'}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="arrivalDate"
                      />
                      <AppDateTimePickerField
                        label={'Valid Till Date'}
                        mode="date"
                        rightSvgIcon={CalenderIcon}
                        name="leavingDate"
                      />
                      {/* Valid Till date */}

                      {/* leaving time */}
                      <View style={styles.Buttoncontianer}>
                        <SubmitButton
                          title="APPLY GATE PASS"
                          width={'100%'}
                          loading={loading}
                          backgroundColor={colors.secondaryButtonColor}
                          borderRadius={15}
                        />
                      </View>
                    </AppForm>
                  </View>
                </ScrollView>
              </ImageBackground>
            </View>
          </KeyboardAvoidingView>
        </View>
      </Modal>
      {/* Modal end */}

      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title={CommonText.GATE_PASS}
          textColor={'white'}
        />
      </View>
      <View style={styles.Buttoncontianer}>
        <AppButton
          title={CommonText.NEW_GATE_PASS_REQUEST}
          width={wp(60)}
          backgroundColor={colors.secondaryButtonColor}
          padding={hp(1.5)}
          borderRadius={50}
          onPress={() => setModalVisible(true)}
        />
      </View>
      <View style={styles.flatlistcontainer}>
        {loading ? (
          <CustomActivityIndicator loading={loading} />
        ) : (
          <React.Fragment>
            <FlatList
              data={gatePassData}
              keyExtractor={item => item.id}
              numColumns={3}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity style={styles.flatlistSection}>
                    <CardItem
                      onPress={() =>
                        navigation.navigate('DetailsGatePass', item)
                      }
                      cardImageUri={item.servant?.profile_image}
                      image={
                        !item.servant?.profile_image && images.imagePlaceholder
                      }
                      cardHeading={item.servant?.first_name}
                      cardText={item.servant?.last_name}
                      // cardSubInfo={item.servant?.mobile}
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

export default AddGatePass;
