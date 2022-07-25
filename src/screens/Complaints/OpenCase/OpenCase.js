import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import styles from './styles';
import Header from '../../../components/common/Header/Header';
import images from '../../../assets/images/images';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import AppButton from '../../../components/common/AppButton';
import ComplaintDropDown from '../../../components/common/ComplaintDropDown/ComplaintDropDown';
import {hp} from '../../../utils/CommonMethods';
import {END_POINTS} from '../../../server/URL';
import apiClient from '../../../Api/client';
import CustomActivityIndicator from '../../../components/common/CustomActivityIndicator';
import {useIsFocused} from '@react-navigation/native';

const OpenCase = ({navigation}) => {
  const [Loading, setLoading] = useState(false);
  const [Close, setClose] = useState([]);
  const [Open, setOpen] = useState([]);
  const isFocused = useIsFocused();
  //================  Get API ==============

  const GetComplainAPI = async () => {
    setLoading(true);
    const result = await apiClient.get(END_POINTS.GetALLComplain);
    if (result.ok) {
      // console.log(' GetComplainAPI ===> ', result.data);
      setOpen(result?.data?.open);
      setLoading(false);
      setClose(result.data?.close);
    } else {
      setLoading(false);
      console.log('erorr GetComplainAPI ===> ', result);
    }
  };
  useEffect(() => {
    GetComplainAPI();
  }, [isFocused]);

  return (
    <ImageBackground
      source={images.appBackgroundLight}
      style={styles.contianer}>
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title="Complaints"
          textColor={colors.primary}
        />
      </View>
      <ScrollView>
        <Text style={styles.textstyle}>My case</Text>
        <View style={styles.buttoncontianer}>
          <AppButton
            title="ADD NEW CASES"
            backgroundColor={colors.primary}
            borderRadius={15}
            onPress={() => navigation.navigate('AddNewCase')}
          />
          <CustomActivityIndicator loading={Loading} />
        </View>
        {Open.length > 0 && (
          <>
            <View style={styles.textcontianer}>
              <Text style={styles.textstyle}>Open cases</Text>
            </View>
            {Open.map(item => (
              <ComplaintDropDown key={item.id} Object={item} />
            ))}
          </>
        )}

        {/* ==========  Closed Cases  ============ */}
        {Close.length > 0 && (
          <>
            <View style={styles.textcontianer}>
              <Text style={styles.textstyle}>Closed cases</Text>
            </View>
            {/* {Close.length > 0 && ( */}
            {Close.map(item => (
              <ComplaintDropDown key={item.id} Object={item} />
            ))}
          </>
        )}
      </ScrollView>
    </ImageBackground>
  );
};

export default OpenCase;
