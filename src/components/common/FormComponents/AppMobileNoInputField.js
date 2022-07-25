import React, {useEffect, useRef, useState} from 'react';
import {View, Text} from 'react-native';
import {useFormikContext} from 'formik';
import AppTextInput from './AppTextInput';
import colors from '../../../assets/colors/colors';
import {hp} from '../../../utils/CommonMethods';
import fonts from '../../../assets/fonts/fonts';
import ValidationErrorMessage from './ValidationErrorMessage';
import MaskInput from 'react-native-mask-input';
import PhoneInput from 'react-native-phone-number-input';
// import ValidationErrorMessage from "../Components/ValidationErrorMessage";

//import ValidationErrorMessage from "./ValidationErrorMessage";

function AppMobileNoInputField({
  name,
  editable,
  width,
  label,
  labelFontFamily = 'Poppins_Medium',
  onRightIconPress,
  borderWidth,
  borderColor,
  borderRadius,
  maskInput,
  valid,
  setIsValid,
  placeholder,
  //   formattedValue,
  //   setFormattedValue,
  formatedMobileNO,
  setFormatedMobileNO,
  // numberOfLines,
  ...otherProps
}) {
  const {
    handleChange,
    setFieldValue,
    setFieldTouched,
    touched,
    errors,
    values,
  } = useFormikContext();
  const phoneInput = useRef(null);
  const [formattedValue, setFormattedValue] = useState('');
  const [value, setValue] = useState('');
  //console.log('asdsda', phoneInput.current?.isValidNumber(value));
  // console.log('lalsdlasd', a, formattedValue);
  useEffect(() => {
    setFormatedMobileNO(
      phoneInput.current?.getNumberAfterPossiblyEliminatingZero(
        value,
        formattedValue,
      ).formattedNumber,
    );
  }, [value]);
  return (
    <View>
      {label && (
        <Text
          style={{
            fontSize: fonts.H9,
            textAlign: 'left',
            marginLeft: '2%',
            fontWeight: 'bold',
            color: colors.primary,
          }}>
          {label}
        </Text>
      )}
      <PhoneInput
        ref={phoneInput}
        // defaultValue={values[name]}
        placeholder={placeholder}
        value={values[name]}
        defaultCode="PK"
        layout="first"
        // onBlur={() => setFieldTouched(name)}
        onChangeText={text => {
          setFieldValue(name, text);
          setValue(text);
          setIsValid(phoneInput.current?.isValidNumber(text));
        }}
        //  onChangeText={text => setValue(text)}
        onChangeFormattedText={text => {
          setFormattedValue(text);
        }}
        {...otherProps}
      />

      <ValidationErrorMessage error={errors[name]} visible={true} />
    </View>
  );
}

export default AppMobileNoInputField;
