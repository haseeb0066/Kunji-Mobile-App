import {END_POINTS} from '../server/URL';
import apiClient from './client';

const addVehicle = data => apiClient.post(END_POINTS.addVehicle, {...data});
const getVehicleList = () =>
  apiClient.get(END_POINTS.getVehicleList, {
    Headers: {
      Authorization: 'Bearer 52|ogTAHnrgJ60The5LQaJEpIm7PhMYn4UeoNZjZcZ',
    },
  });

export default {
  addVehicle,
  getVehicleList,
};
