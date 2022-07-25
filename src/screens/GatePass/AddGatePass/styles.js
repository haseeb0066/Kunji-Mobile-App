import {StyleSheet} from 'react-native';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';

const styles = StyleSheet.create({
  contianer: {
    flex: 1,
  },
  headercontianer: {
    paddingLeft: wp(2),
    ...Platform.select({
      android: {
        paddingTop: hp(3),
        paddingBottom: hp(2),
      },
      ios: {
        paddingBottom: hp(1),
      },
    }),
  },

  flatlistcontainer: {
    flex: 0.9,
    marginHorizontal: wp(5),
    flexDirection: 'row',
  },
  flatlistSection: {
    marginHorizontal: 10,
    marginVertical: 10,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  //Modal style start
  modalcontainer: {
    flex: 1,
  },
  emptyContainer: {
    flex: 0.4,
    backgroundColor: 'transparent',
  },
  modalContentContainer: {
    flex: 0.68,
    borderTopRightRadius: wp(10),
    borderTopLeftRadius: wp(10),
  },
  formBG: {
    borderTopLeftRadius: hp(4),
    borderTopRightRadius: hp(4),
  },
  inputContainer: {
    marginHorizontal: wp(4),
    flexDirection: 'column',
    flex: 1,
    marginVertical: hp(1),
  },
  headingSection: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  uploadText: {
    color: colors.primary,
    fontSize: 10,
    paddingBottom: hp(2),
  },
  headingText: {
    color: colors.primary,
    fontSize: fonts.H9,
    fontWeight: 'bold',
    marginVertical: hp(1),
  },
  profileImage: {
    width: hp(6),
    height: hp(6),
    borderRadius: hp(25),
    marginBottom: hp(1),
  },

  // Modal style end
});
export default styles;
