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
  firstName: [
    { type: 'required', message: 'First Name is required' },
    {
      type: 'maxlength',
      message: 'First Name cannot be more than 100 characters long',
    },
  ],
  lastName: [
    { type: 'required', message: 'Last Name is required' },
    {
      type: 'maxlength',
      message: 'Last Name cannot be more than 100 characters long',
    },
  ],
  urlPath: [
    { type: 'required', message: 'URL Path is required' },
    {
      type: 'maxlength',
      message: 'URL Path cannot be more than 50 characters long',
    },
    {
      type: 'pattern',
      message:
        'Not a valid URL Path. Please use only letters, numbers and dashes.',
    },
  ],
  mobilePhoneNumber: [
    { type: 'required', message: 'Mobile Phone Number is required' },
  ],
  companyName: [
    { type: 'required', message: 'Company Name is required' },
    {
      type: 'maxlength',
      message: 'Company Name cannot be more than 100 characters long',
    },
  ],
  TAXID: [
    {
      type: 'maxlength',
      message: 'EIN/TAX ID cannot be more than 100 characters long',
    },
  ],
  disbursementAccountInfo: [
    { type: 'required', message: 'Disbursement Account Info is required' },
    {
      type: 'maxlength',
      message:
        'Disbursement Account Info cannot be more than 1000 characters long',
    },
  ],
  websiteURL: [
    { type: 'required', message: 'Website URL is required' },
    {
      type: 'maxlength',
      message: 'Website URL cannot be more than 100 characters long',
    },
  ],
  brandingType: [
    {
      type: 'maxlength',
      message: 'Branding Type cannot be more than 50 characters long',
    },
  ],
  eSignature: [
    { type: 'required', message: 'Digital Signature is required' },
    {
      type: 'maxlength',
      message: 'Digital Signature cannot be more than 100 characters long',
    },
  ],
  businessWebsiteURL: [
    {
      type: 'maxlength',
      message: 'Business Website URL cannot be more than 100 characters long',
    },
  ],
  backEndFee: [
    { type: 'required', message: 'Backend Fee is required' },
    { type: 'min', message: 'Value must be between 7.9 and 14.9' },
    { type: 'max', message: 'Value must be between 7.9 and 14.9' },
  ],
};
