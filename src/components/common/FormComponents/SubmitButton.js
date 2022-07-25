import React from 'react';
import {useFormikContext} from 'formik';
// import AppButton from '../AppButton';


function SubmitButton({
  backgroundColor,
  titleColor,
  title,
  marginTop,
  loading,
  width,
  ...props
}) {
  const {handleSubmit} = useFormikContext();
  return (
    <AppButton
      backgroundColor={backgroundColor}
      titleColor={titleColor}
      loading={loading}
      marginTop={marginTop}
      title={title}
      onPress={handleSubmit}
      width={width}
      {...props}
    />
  );
}

export default SubmitButton;
