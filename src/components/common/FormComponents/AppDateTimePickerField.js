import {StyleSheet, Text, View, Platform, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import {hp, wp} from '../../../utils/CommonMethods';
import colors from '../../../assets/colors/colors';
import fonts from '../../../assets/fonts/fonts';
import SvgComponent from '../SvgCustomComponents/SvgCustomComponents';
import ValidationErrorMessage from './ValidationErrorMessage';
import {useFormikContext} from 'formik';

const AppDateTimePickerField = ({
  label,
  name,
  mode = 'date',
  rightSvgIcon,
  borderColor = colors.red,
}) => {
  const {
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();
  const currentDate = new Date();
  const [openArrivalDateTImeTime, setOpenArrivalDateTImeTime] = useState(false);
  const [arrivalDateTIme, setArrivalDateTIme] = useState();
  return (
    <View>
      <Text style={styles.lableText}>{label}</Text>
      <View style={[styles.inputView, {borderColor: borderColor}]}>
        <DatePicker
          modal
          mode={mode}
          open={openArrivalDateTImeTime}
          date={currentDate}
          onConfirm={date => {
            setFieldValue(
              name,
              mode === 'time'
                ? moment(date).format('HH:mm:ss')
                : moment(date).format('YYYY-MM-DD'),
            );
            setOpenArrivalDateTImeTime(false);
            setArrivalDateTIme(date);
          }}
          onCancel={() => {
            setOpenArrivalDateTImeTime(false);
          }}
        />
        <TouchableOpacity
          onBlur={() => setFieldTouched(name)}
          style={styles.dateView}
          onPress={() => setOpenArrivalDateTImeTime(true)}>
          <Text style={styles.datePickerText}>
            {arrivalDateTIme ? (
              mode === 'time' ? (
                moment(arrivalDateTIme).format('hh:mm A')
              ) : (
                moment(arrivalDateTIme).format('YYYY-MM-DD')
              )
            ) : (
              <Text style={styles.placeholderText}>{label}</Text>
            )}
          </Text>
        </TouchableOpacity>
        {rightSvgIcon && (
          <TouchableOpacity
            style={styles.iconView}
            onPress={() => setOpenArrivalDateTImeTime(true)}>
            <SvgComponent svgMarkup={rightSvgIcon} />
          </TouchableOpacity>
        )} 
      </View>
      <ValidationErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

export default AppDateTimePickerField;

const styles = StyleSheet.create({
  inputView: {
    borderRadius: 15,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',

    ...Platform.select({
      ios: {
        padding: hp(0.1),
      },
      android: {
        padding: hp(0.3),
      },
    }),
    marginVertical: 10,
    // borderColor: borderColor,
    backgroundColor: colors.WHITE,
  },
  lableText: {
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: fonts.H10,
    left: wp(2),
  },
  datePickerText: {
    color: colors.BLACK,
    left: wp(4),
  },
  placeholderText: {
    color: colors.placeHolderColor,
  },
  dateView: {
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    ...Platform.select({
      ios: {
        height: hp(5.5),
      },
      android: {
        height: hp(6),
      },
    }),
    // ...Platform.select({
    //   ios: {
    //     padding: hp(0.1),
    //   },
    //   android: {
    //     padding: hp(0.3),
    //   },
    // }),
  },
});
