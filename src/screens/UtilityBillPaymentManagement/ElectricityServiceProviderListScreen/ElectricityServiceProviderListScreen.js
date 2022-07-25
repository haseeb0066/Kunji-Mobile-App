import {
  FlatList,
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Header from '../../../components/common/Header/Header';
import CommonText from '../../../utils/CommonText';
import colors from '../../../assets/colors/colors';
import {
  backArrow,
  ElectricityIcon,
  searchIcon,
} from '../../../assets/images/svg/SvgImages';
import {hp, wp} from '../../../utils/CommonMethods';
import {Divider, SearchBar} from 'react-native-elements';
import SvgComponent from '../../../components/common/SvgCustomComponents/SvgCustomComponents';
import Screen from '../../../components/common/Screen';
import BillListItem from '../../../components/common/BillListItem/BillListItem';
import images from '../../../assets/images/images';
import styles from './styles';
import Routes from '../../../navigation/Routes';
const ElectricityServiceProviderListScreen = ({navigation}) => {
  const arr = [
    {id: '1', name: 'LESCO'},
    {id: '2', name: 'PESCO'},
    {id: '3', name: 'DESCO'},
  ];
  const [searchedBillOption, setSearchedBillOption] = useState(arr);
  const [search, setSearch] = useState('');
  const filterBillItem = searchedText => {
    console.log('SEARCH tt', searchedText);
    if (searchedText !== '') {
      const data = searchedBillOption.filter(item =>
        // const itemData = item.name ? item.name.toLowerCase : ''.toLowerCase();
        // const textData = searchedText.toLowerCase();
        {
          return (
            item.name.toUpperCase().indexOf(searchedText.toUpperCase()) > -1
          );
        },
      );
      console.log('SEARCH DATA', data);
      setSearch(searchedText);
      setSearchedBillOption(data);
    } else {
      setSearchedBillOption(arr);
      setSearch(searchedText);
    }
  };
  return (
    <ImageBackground style={{flex: 1}} source={images.appBackgroundLight}>
      <Screen>
        <View
          style={{marginTop: Platform.OS === 'android' ? hp(1.8) : hp(0.5)}}>
          <Header
            title={CommonText.ELECTRICITY_SERVICE_PROVIDER}
            textColor={colors.primary}
            fontSize={hp(2)}
            leftSvgIcon={backArrow(colors.primary)}
            tintColor={colors.BLACK}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
          />
        </View>
        <View style={styles.SearchContainer}>
          <View style={styles.searchIcon}>
            <SvgComponent svgMarkup={searchIcon} />
          </View>
          <TextInput
            style={{width: wp(78)}}
            placeholder="Enter search"
            onChangeText={text => filterBillItem(text)}
            value={search}
          />
        </View>
        <View>
          <FlatList
            data={searchedBillOption}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={() => <Divider />}
            renderItem={({item}) => (
              <BillListItem
                title={item.name}
                subTitle={'12112313'}
                image={images.carimag}
                onPress={() => navigation.navigate(Routes.BILL_REFERNCE_N0)}
              />
            )}
          />
        </View>
      </Screen>
    </ImageBackground>
  );
};

export default ElectricityServiceProviderListScreen;
