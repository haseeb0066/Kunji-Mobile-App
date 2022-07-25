import React from 'react';
import {Formik} from 'formik';

function AppForm({
  initialValues,
  validationSchema,
  onSubmit,
  children,
  enableReinitialize,
  ref,
}) {
  return (
    <Formik
      innerRef={ref}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      enableReinitialize={enableReinitialize}>
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
