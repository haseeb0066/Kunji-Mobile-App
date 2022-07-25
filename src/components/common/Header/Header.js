//================================ React Native Imported Files ======================================//

import {
  Image,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  Platform,
  SafeAreaView,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import React, {Component} from 'react';

//================================ Local Imported Files ======================================//
import fonts from '../../../assets/fonts/fonts';
import colors from '../../../assets/colors/colors';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drawerProps: this.props.nav,
    };
  }

  render() {
    const nav = this.state.drawerProps;
    return (
      <SafeAreaView
        style={[styles.container, {backgroundColor: this.props.bgColor}]}>
        <TouchableOpacity
          style={styles.headerProfile}
          onPress={this.props.onLeftIconPress}>
          {this.props.leftText !== undefined && (
            <Text style={styles.text}>{this.props.leftText}</Text>
          )}

          {this.props.leftIconPath !== undefined && (
            <Image
              resizeMode="contain"
              style={[
                styles.img,
                this.props.lefticonSize !== undefined
                  ? {
                      height: this.props.lefticonSize,
                      width: this.props.lefticonSize,
                    }
                  : {
                      height: 22,
                      width: 22,
                      tintColor: this.props.tintColor || colors.WHITE,
                    },
              ]}
              source={this.props.leftIconPath}
            />
          )}
          {this.props.leftSvgIcon && (
            <View style={{marginLeft: wp(3)}}>
              <SvgComponent svgMarkup={this.props.leftSvgIcon} />
            </View>
          )}
        </TouchableOpacity>
        <View style={styles.headerLogo}>
          {this.props.titleLogoPath !== undefined && (
            <Image
              style={
                this.props.titleLogosize !== undefined
                  ? {
                      height: this.props.titleLogosize,
                      width: this.props.titleLogosize,
                    }
                  : {width: 30, height: 30}
              }
              source={this.props.titleLogoPath}
            />
          )}
          {this.props.title && (
            <Text
              style={[
                styles.title,
                {
                  color: this.props.textColor,
                  fontSize: this.props.fontSize || wp(4.5),
                },
              ]}>
              {this.props.title !== undefined ? this.props.title : 'Header'}
            </Text>
          )}
        </View>
        <View style={styles.headerMenu}>
          <TouchableOpacity
            style={[styles.headerMenu, {marginLeft: wp(7)}]}
            onPress={this.props.onRightIconTwoPress}>
            {this.props.rightIconTwoPath !== undefined && (
              <Image
                resizeMode="contain"
                style={[
                  styles.img,
                  this.props.rightIconSize !== undefined
                    ? {
                        height: this.props.rightIconSize,
                        width: this.props.rightIconSize,
                      }
                    : {height: 20, width: 20, tintColor: this.props.tintColor},
                ]}
                source={this.props.rightIconTwoPath}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={this.props.onRightIconPress}>
            {this.props.rightIconOnePath !== undefined && (
              <Image
                resizeMode="contain"
                style={[
                  styles.img,
                  this.props.rightIconSize !== undefined
                    ? {
                        height: this.props.rightIconSize,
                        width: this.props.rightIconSize,
                      }
                    : {
                        height: 20,
                        width: 20,
                        tintColor: this.props.tintColorRightOne,
                      },
                ]}
                source={this.props.rightIconOnePath}
              />
            )}

            {this.props.righttitle && (
            <Text
              style={[
                styles.righttitle,
                this.props.righttitleSize !== undefined
                    ? {
                      fontSize : this.props.righttitleSize,
                      color: this.props.righttextColor,
                      }
                      :
                {
                  color: this.props.righttextColor,
                 // fontSize: this.props.fontSize || wp(3.5),
                },
              ]}
              >
              {this.props.righttitle !== undefined ? this.props.righttitle : 'Header'}
            </Text>
          )}

          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerProfile: {
    flex: Platform.OS === 'ios' ? 0.35 : 0.3,
    paddingLeft: 10,
    justifyContent: 'flex-start',
    alignSelf: 'center',
  },
  headerLogo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  headerMenu: {
    flex: 0.4,
    flexDirection: 'row',
    paddingRight: 13,
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: fonts.H6,
    color: colors.WHITE,
    fontWeight: 'bold',
  },
  righttitle: {
   fontWeight:'bold'
  },
  text: {
    fontSize: wp(3),
    color: colors.white,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginLeft: wp(2),
    paddingHorizontal: wp(1),
    paddingVertical: wp(0.5),
    borderRadius: wp(0.5),
  },
  img: {
    tintColor: colors.white,
  },
});
