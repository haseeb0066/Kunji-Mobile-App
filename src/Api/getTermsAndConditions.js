import {END_POINTS} from '../server/URL';
import apiClient from './client';

const termsAndConditions = (
  token = '74|f1vPc5p40sTZCuK8Q9JKmzJt9Gx3tjBmjr5VPFMD',
) => apiClient.get(END_POINTS.termsAndConditions);

export default {
  termsAndConditions,
};
