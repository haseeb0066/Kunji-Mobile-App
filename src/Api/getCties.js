import {END_POINTS} from '../server/URL';
import apiClient from './client';

const getCitesStateList = (countries_list_only = false, country_id = 167) =>
  apiClient.get(
    END_POINTS.getCountrycitesStateList +
      `?countries_list_only=${countries_list_only}&country_id=${country_id}`,
  );

export default {
  getCitesStateList,
};
