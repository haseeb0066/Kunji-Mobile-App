import React, {useEffect, useState} from 'react';
import styles from './styles';
import {View, Text, ImageBackground} from 'react-native';
import Header from '../../../components/common/Header/Header';
import images from '../../../assets/images/images';
import {backArrow} from '../../../assets/images/svg/SvgImages';
import colors from '../../../assets/colors/colors';
import {hp} from '../../../utils/CommonMethods';
import AppButton from '../../../components/common/AppButton';
import apiClient from '../../../Api/client';
import {END_POINTS} from '../../../server/URL';

const ViewPollResult = ({navigation, route}) => {
  const {pollId} = route?.params;

  const [pollResultData, setPollResultData] = useState();
  const getPollResult = async () => {
    const result = await apiClient.get(
      END_POINTS.getPollResult + `?poll_id=${pollId}`,
    );
    if (result.ok) {
      setPollResultData(result.data);
    }
  };
  useEffect(() => {
    getPollResult();
  }, []);
  return (
    <ImageBackground source={images.appBackgroundLight} style={styles.conianer}>
      {/* =========Header component======== */}
      <View style={styles.headercontianer}>
        <Header
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          leftSvgIcon={backArrow(colors.primary)}
          title={'View Result'}
          textColor={colors.primary}
        />
      </View>
      {/* =========New Services component======== */}
      <View style={styles.servicescontianer}>
        <View style={styles.headingcontianer}>
          {<Text style={styles.headingstyle}>{pollResultData?.question}</Text>}
        </View>

        {pollResultData?.get_poll_question.map(que => (
          <View style={styles.textnumconitaner}>
            <View style={styles.textcontianer}>
              <Text style={{color: colors.primary}}>{que.options} </Text>
            </View>
            <View style={styles.numcontianer}>
              <Text style={styles.numstyle}>{que.votes_count}</Text>
            </View>
          </View>
        ))}
      </View>
      {/* =========Total Votes component======== */}
      <View style={styles.totalvotesstyle}>
        <View style={styles.textnumconitaner}>
          <View style={styles.textcontianer}>
            <Text style={styles.textstyle}>Total Votes </Text>
          </View>
          <View style={styles.numcontianer}>
            <Text style={styles.numstyle}>{pollResultData?.total_votes}</Text>
          </View>
        </View>

        <View style={styles.textnumconitaner}>
          <View style={styles.textcontianer}>
            <Text style={styles.textstyle}>Days Left </Text>
          </View>
          <View style={styles.numcontianer}>
            <Text style={styles.numstyle}>{pollResultData?.valid_days}</Text>
          </View>
        </View>
      </View>
      {/* =========Button component======== */}
      <View>
        <AppButton
          title="Done"
          backgroundColor={colors.primary}
          padding={hp(1.6)}
          borderRadius={15}
          onPress={() => navigation.navigate('Poll')}
        />
      </View>
    </ImageBackground>
  );
};

export default ViewPollResult;
