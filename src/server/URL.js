export const BASE_URL = 'http://18.141.204.254/kunji-api/mobile/';

export const END_POINTS = {
  login: 'user/login',
  register: 'user/add',
  verfiyOTP: 'user/verify-otp',
  resendOTP: 'user/get-new-otp',
  forgotPasswordRequest: 'user/forgot-password-request',
  forgotPasswordOTPSubmit: 'user/forgot-password-otp-submit',
  forgotPasswordSubmit: 'user/forgot-password-submit',
  getCountrycitesStateList: 'country-data',
  termsAndConditions: 'user/view-terms-conditions',
  changePassword: 'user/change-password',
  selectProperty: 'user/select-property',
  addVehicle: 'user/add-user-vehicle',
  getVehicleList: 'user/get-vehicle-list',
  getProfile: 'user/profile',
  getSocietyByCity: 'society/in-city',
  getSocietyMappingOne: 'society/mapping-one',
  getSocietyMappingTwo: 'society/mapping-two',
  getSocietyMappingThree: 'society/mapping-three',
  submitEditProfile: 'user/submit-mobile-profile',
  getUserProperty: 'user/get-user-property',
  addFamilyMember: 'user/add-user-family-member',
  societyParking: 'user/society-parking-list',
  societyList: 'user/select-property',
  getProfileDetails: 'user/view-profile',
  addVisitor: 'user/add-user-visitor',
  getVisitorList: 'user/get-user-visitor-list',
  addDeliveryBooking: 'user/add-delivery-booking',
  getDeliveryBookingList: 'user/get-delivery-booking-list',
  ViewProfile: 'user/view-profile',
  AddPropertiesData: 'user/add-user-property',
  getPropertiesList: 'user/get-user-property',
  getFamilyMemberList: 'user/get-user-family-member-list',
  addVisitorParking: 'user/add-visitor-parking',
  getVisitorParkingList: 'user/get-user-visitor-parking-list',
  servantList: 'servant/list',
  addGatePass: 'servant/create-gate-pass',
  editProfile: '/user/update-user-profile',
  AddNewComplain: '/complaints/add',
  GetALLComplain: '/complaints/my-complaints',
  servantList: 'servant/list',
  editProfile: '/user/update-user-profile',
  addGatePass: 'servant/create-gate-pass',
  getGatePass: 'servant/view-approved-gatepass',
  getTenantPropertyList: 'tenant/owner-property-list',
  addTenant: 'tenant/add',
  deleteGatePass: 'servant/delete-gate-pass',
  servantTypeapi: 'servant/types',
  addNewServant: 'servant/add',
  getServantList: 'servant/list',
  getTenantList: 'tenant/list',
  createPool: 'poll/create-poll',
  getPoolList: 'poll/get-poll-questions',
  getPoolQuestionOptions: 'poll/get-poll-options',
  castVote: 'poll/select-poll-option',
  getPollResult: 'poll/results',
  // Panic Alerts
  addNewAlert: 'panic-alert/create-alert',
  listPanicAlerts: 'panic-alert/list-panic-alerts',
  noticesList: 'user-notice/get-all-notices-list',
  logOut: 'user/logout',
};
