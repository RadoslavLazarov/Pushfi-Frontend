export default {
  email: [
    { type: 'required', message: 'Email is required' },
    {
      type: 'email',
      message: 'Not a valid email',
    },
    {
      type: 'maxlength',
      message: 'Email cannot be more than 100 characters long',
    },
  ],
  password: [
    { type: 'required', message: 'Password is required' },
    {
      type: 'maxlength',
      message: 'Password cannot be more than 100 characters long',
    },
  ],
  fundingAmountRequested: [
    { type: 'required', message: 'Funding Amount Requested is required' },
  ],
  affiliate: [
    {
      type: 'maxlength',
      message:
        'Referral Source/Affiliate cannot be more than 100 characters long',
    },
  ],
  loanProducts: [
    { type: 'required', message: 'Please select at least one option' },
  ],
  detailedUseOfFunds: [
    { type: 'required', message: 'Detailed Use Of Funds is required' },
    {
      type: 'maxlength',
      message:
        'Detailed Use Of Funds cannot be more than 10000 characters long',
    },
  ],
  firstName: [
    { type: 'required', message: 'First Name is required' },
    {
      type: 'maxlength',
      message: 'First Name cannot be more than 100 characters long',
    },
  ],
  middleName: [
    { type: 'required', message: 'Middle Name is required' },
    {
      type: 'maxlength',
      message: 'Middle Name cannot be more than 100 characters long',
    },
  ],
  lastName: [
    { type: 'required', message: 'Last Name is required' },
    {
      type: 'maxlength',
      message: 'Last Name cannot be more than 100 characters long',
    },
  ],
  phoneNumber: [
    {
      type: 'maxlength',
      message: 'Phone Number cannot be more than 30 characters long',
    },
  ],
  mobilePhoneNumber: [
    { type: 'required', message: 'Mobile Phone Number is required' },
    {
      type: 'maxlength',
      message: 'Mobile Phone Number cannot be more than 30 characters long',
    },
  ],
  SMSphoneCarrier: [
    { type: 'required', message: 'SMS Phone Carrier is required' },
    {
      type: 'maxlength',
      message: 'SMS Phone Carrier cannot be more than 50 characters long',
    },
  ],
  streetAddress: [
    { type: 'required', message: 'Street Address is required' },
    {
      type: 'maxlength',
      message: 'Street Address cannot be more than 100 characters long',
    },
  ],
  city: [
    { type: 'required', message: 'City is required' },
    {
      type: 'maxlength',
      message: 'City cannot be more than 50 characters long',
    },
  ],
  region: [
    { type: 'required', message: 'Region is required' },
    {
      type: 'maxlength',
      message: 'Region cannot be more than 50 characters long',
    },
  ],
  postalCode: [
    { type: 'required', message: 'Postal Code is required' },
    {
      type: 'maxlength',
      message: 'Postal Code cannot be more than 10 characters long',
    },
  ],
  housingStatus: [
    { type: 'required', message: 'Housing Status is required' },
    {
      type: 'maxlength',
      message: 'Housing Status cannot be more than 50 characters long',
    },
  ],
  monthlyHousingPayment: [
    { type: 'required', message: 'Monthly Housing Payment is required' },
  ],
  dateMovedInThisAddress: [
    { type: 'required', message: 'Date Moved In This Address is required' },
  ],
  dateOfBirth: [{ type: 'required', message: 'Date Of Birth is required' }],
  SSN: [
    { type: 'required', message: 'SSN is required' },
    {
      type: 'maxlength',
      message: 'SSN cannot be more than 9 characters long',
    },
  ],
  maritalStatus: [
    { type: 'required', message: 'Martial Status is required' },
    {
      type: 'maxlength',
      message: 'Martial Status cannot be more than 20 characters long',
    },
  ],
  collegeUniversityName: [
    {
      type: 'maxlength',
      message:
        'College University Name cannot be more than 100 characters long',
    },
  ],
  degreeObtained: [
    {
      type: 'maxlength',
      message: 'Degree Obtained cannot be more than 50 characters long',
    },
  ],
  courceOfStudy: [
    {
      type: 'maxlength',
      message: 'Cource Of Study cannot be more than 50 characters long',
    },
  ],
  yearGraduated: [
    {
      type: 'maxlength',
      message: 'Year Graduated cannot be more than 40 characters long',
    },
  ],
  currentMillitaryAffiliation: [
    { type: 'required', message: 'Current Millitary Affiliation is required' },
    {
      type: 'maxlength',
      message:
        'Current Millitary Affiliation cannot be more than 100 characters long',
    },
  ],
  presentEmployer: [
    { type: 'required', message: 'Present Employer is required' },
    {
      type: 'maxlength',
      message: 'Present Employer cannot be more than 1000 characters long',
    },
  ],
  employerPhoneNumber: [
    {
      type: 'maxlength',
      message: 'Employer Phone Number cannot be more than 30 characters long',
    },
  ],
  position: [
    { type: 'required', message: 'Position is required' },
    {
      type: 'maxlength',
      message: 'Position cannot be more than 1000 characters long',
    },
  ],
  startDateWithEmployer: [
    { type: 'required', message: 'Start Date With Employer is required' },
  ],
  monthlyGrossIncomeAmount: [
    { type: 'required', message: 'Monthly Gross Income Amount is required' },
  ],
  totalAnnualHouseholdIncome: [
    { type: 'required', message: 'Total Annual Household Income is required' },
  ],

  retirementAccountBalance: [
    { type: 'required', message: 'Retirement Account Balance is required' },
  ],
  companyName: [
    {
      type: 'maxlength',
      message: 'Company Name cannot be more than 100 characters long',
    },
  ],
  DBAname: [
    {
      type: 'maxlength',
      message: 'DBA Name cannot be more than 100 characters long',
    },
  ],
  businessAddress: [
    {
      type: 'maxlength',
      message: 'Business Address cannot be more than 100 characters long',
    },
  ],
  businessPhoneNumber: [
    {
      type: 'maxlength',
      message: 'Business Phone Number cannot be more than 30 characters long',
    },
  ],
  TAXID: [
    {
      type: 'maxlength',
      message: 'EIN/TAX ID cannot be more than 100 characters long',
    },
  ],
  corpStructure: [
    {
      type: 'maxlength',
      message: 'Corp Structure cannot be more than 50 characters long',
    },
  ],
  businessLocationLeaseMortgage: [
    {
      type: 'maxlength',
      message:
        'Business Location Lease Mortgage cannot be more than 50 characters long',
    },
  ],
  numberOfEmployees: [
    {
      type: 'maxlength',
      message: 'Number Of Employees cannot be more than 20 characters long',
    },
  ],
  websiteURL: [
    {
      type: 'maxlength',
      message: 'Website URL cannot be more than 100 characters long',
    },
  ],
  eSignature: [
    { type: 'required', message: 'E-Signature is required' },
    {
      type: 'maxlength',
      message: 'E-Signature cannot be more than 100 characters long',
    },
  ],
};
