import React, {useState, useEffect} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import ImageViewer from 'react-native-image-zoom-viewer';
import {Modal} from 'react-native';
import AppFromField from '../../../components/common/FormComponents/AppFormField';
import AppForm from '../../../components/common/FormComponents/AppForm';
import {
  backArrow,
  crossIcon2,
} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import {BASE_URL, END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import {hp, wp} from '../../../utils/CommonMethods';
import {useRoute} from '@react-navigation/native';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import * as Yup from 'yup';
import SubmitButton from '../../../components/common/FormComponents/SubmitButton';
import {launchImageLibrary} from 'react-native-image-picker';
import PopUpModal from '../../../components/common/PopUpModal/PopUpModal';
import {SuccessAnimation} from "../../../assets/Animations/success.json";


const EditProfile = ({navigation}) => {
  const {params} = useRoute();
  const [Loading, setLoading] = useState(false);
  const [userDetails, setUserDetails] = useState();
  const [mediaUri, setMediaUri] = useState(null);
  const [popUpModalVisible, setPopUpModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [popUpModalMessage, setPopUpModalMessage] = useState('');
  const [Message,setMessage]=useState('');
//   console.log('===userDetails===userDetails=>>>', userDetails);
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  const [cnicImage, setCnicImage] = useState();
//   ==============Getapi========>>>>>>>
  const getViewProfileUsers = async () => {
    const result = await apiClient.get(END_POINTS.getProfileDetails);
    if (result.ok) {
      console.table('====Result==userDetails=ViewProfile===>>>>', result.data);
      setUserDetails(result.data);
      console.log(
        'userDetails.societies_maps.mapping_type',
        result.data.societies_maps[0]?.mapping_type,
      );
    } else console.log('error');
  };
  useEffect(() => {
    getViewProfileUsers();
  }, []);

  // ==========edit profile api===========
  const editProfileApi =async(value)=>{
console.log('editProfileApi==========>>>    ',value);
let formdata = new FormData();
if(mediaUri){
let imageData = {
    uri: mediaUri[0]?.uri,
    name: mediaUri[0]?.fileName,
    type: mediaUri[0]?.type,
  };
  console.log("imageData ====>    ",imageData);
       
            formdata.append('profile_picture', imageData);
        } 
        formdata.append('first_name', value.firstName);
        formdata.append('last_name', value.lastName);
        formdata.append('emergency_contact', value.EmergencyContact);
      
        console.log('result formdata ===>  ', formdata);
        setLoading(true);
        const result = await apiClient.post(END_POINTS.editProfile, formdata);
        if (result.ok) {
          setLoading(false);
          console.log('result.ok ===>  ', result);
          setMessage(result.data.message);
          setPopUpModalVisible(true);
        } else {
          setLoading(false);
          console.log('erorrrr ===> ', result.data);
        }
      
  }
  const validationSchema = Yup.object({
    firstName: Yup.string().required('First Name is required field'),
    lastName: Yup.string().required('Last name is required field'),
    EmergencyContact: Yup.number().required(
      'Emergency Contact no is required field',
    ),
    })
  //==================== open gallery function
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
            setCncTenancy(prev => [...prev, selectedImages[0]]);
          }
        } catch (error) {
          console.log(error);
        }
      };
  const [check, setCheck] = useState(false);
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <Modal visible={visibleZoomImageModal}>
        <View
          style={{
            flex: 1,
          }}>
          <ImageViewer
            renderHeader={() => (
              <TouchableOpacity
                onPress={() => setVisibleZoomImageModal(false)}
                style={{
                  top: 70,
                  position: 'absolute',
                  right: 30,
                  backgroundColor: 'black',
                  zIndex: 1,
                  borderRadius: 40,
                  padding: 8,
                }}>
                <SvgComponent svgMarkup={crossIcon2} />
              </TouchableOpacity>
            )}
            onSwipeDown={() => setVisibleZoomImageModal(false)}
            enableSwipeDown={true}
            enableImageZoom={true}
            imageUrls={[
              {
                url: cnicImage,
                props: {
                },
              },
            ]}
          />
        </View>
      </Modal>
      <PopUpModal
          modalVisiblePopUp={popUpModalVisible}
          source={SuccessAnimation}
          onPress={() => {
            setPopUpModalVisible(false);
            setModalVisible(false);
            navigation.navigate('ViewProfile');
          }}
          messageText={Message}
          title="OK"
        />

      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          title="Edit Profile"
          textColor={colors.WHITE}
        />
      </View>
      {userDetails && 
        <View style={styles.profileContainer}>
        <CardItem
            cardImageUri={!mediaUri&& userDetails.profile_picture}
            cardHeading={userDetails.name}
            image={mediaUri}
            onPress={ _launchImageLibrary}
          />
          
        </View>
      }
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          {userDetails && (
        <View style={styles.inputContainer}>
            <ScrollView
                contentContainerStyle={{paddingBottom: hp(10)}}
                showsVerticalScrollIndicator={false}>
               <View style={styles.inputContainer}>
                    <AppForm
                      initialValues={{
                       firstName: userDetails.first_name,
                       lastName: userDetails.last_name,
                        EmergencyContact: userDetails.emergency_contact,
                      }}
                      enableReinitialize={true}
                      onSubmit={value=>editProfileApi(value)}
                      validationSchema={validationSchema}>
                      <AppFromField
                        label="First Name"
                        width={'100%'}
                        placeholderTextColor={colors.primary}
                        placeholder="First Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="firstName"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                       defaultValue={userDetails.first_name}
                      />
                      <AppFromField
                        label="Last Name"
                        width={'100%'}
                        defaultValue={userDetails.last_name}
                        placeholderTextColor={colors.primary}
                        placeholder="Last Name"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="lastName"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                      />
                      <AppFromField
                        label="Emergency Contact Number"
                        width={'100%'}
                        placeholderTextColor={colors.primary}
                        placeholder="Emergency Contact Number"
                        autoCapitalize="none"
                        autoCorrect={false}
                        name="EmergencyContact"
                        keyboardType="numeric"
                        borderColor={'red'}
                        borderWidth={1}
                        borderRadius={15}
                        defaultValue={userDetails.emergency_contact}
                      />
                      <SubmitButton 
                      title="SAVE" 
                      width="100%" 
                      borderRadius={15}
                      loading={Loading}
                        />
                      </AppForm>
                      </View>
              </ScrollView>
               </View>
          )}
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default EditProfile;

