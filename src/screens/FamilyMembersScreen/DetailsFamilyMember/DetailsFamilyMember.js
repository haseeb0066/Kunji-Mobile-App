import React, {useState} from 'react';
import {
  View,
  ImageBackground,
  ScrollView,
  Text,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import {backArrow, crossIcon2} from '../../../assets/images/svg/SvgImages';
import moment from 'moment';
import styles from './styles';
import images from '../../../assets/images/images';
import Header from '../../../components/common/Header/Header';
import CardItem from '../../../components/common/CardItem/CardItem';
import AppButton from '../../../components/common/AppButton';
import colors from '../../../assets/colors/colors';
import ViewDetailField from '../../../components/common/ViewDetailField/ViewDetailField';
import ImageViewer from 'react-native-image-zoom-viewer';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import {Modal} from 'react-native';
const DetailsFamilyMember = ({navigation}) => {
  const {params} = useRoute();
  const DateOfBirth = moment(params.DOB).format('YYYY-MM-DD');
  const [visibleZoomImageModal, setVisibleZoomImageModal] = useState(false);
  return (
    <ImageBackground source={images.splash} style={styles.container}>
      <Modal visible={visibleZoomImageModal}>
        <View
          style={{
            flex: 1,
            // justifyContent: 'center',
            // alignItems: 'center',
            // backgroundColor: 'black',
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
                // Simplest usage.
                url: params.userImage,

                props: {
                  // headers: ...
                },
              },
            ]}
          />
        </View>
      </Modal>
      <View style={styles.headerContainer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.WHITE)}
          // leftIconPath={images.left_header_icon1}
          title="View family details"
          textColor={colors.WHITE}
        />
      </View>
      <View style={styles.profileContainer}>
        <CardItem
          cardImageUri={params.image}
          image={!params.image && images.imagePlaceholder}
          cardHeading={params.member_name}
          cardText={params.userInfo}
          onPress={async () => setVisibleZoomImageModal(true)}
        />
      </View>
      <View style={styles.contentContainer}>
        <ImageBackground
          source={images.formBG}
          style={styles.formbackground}
          imageStyle={styles.formBG}>
          <View style={styles.inputContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <ViewDetailField
                Heading={'First Name'}
                Name={params.first_name}
              />
              <ViewDetailField Heading={'Last Name'} Name={params.last_name} />
              <ViewDetailField Heading={'Date Of Birth'} Name={DateOfBirth} />
              <ViewDetailField Heading={'Mobile Number'} Name={params.mobile} />
              <ViewDetailField
                Heading={'Select Property'}
                Name={params.select_property}
              />
              {/* <ViewDetailField Heading={'Allocate Parking'} Name={'YES'} />
              <ViewDetailField Heading={'Vehicle Reg No.'} Name={'FSD9098'} /> */}

              <AppButton
                title="DONE"
                width="100%"
                onPress={() => navigation.navigate('AddFamilyMember')}
                borderRadius={15}
              />
            </ScrollView>
          </View>
        </ImageBackground>
      </View>
    </ImageBackground>
  );
};

export default DetailsFamilyMember;
