// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  appTitle: 'Password Strength Calculator - PSC',
  companyName: 'Health-Rise Gmbh',
  barSteps: 12,
  initStrength: 0,  // initial strength value
  passwordInputLabel: 'Password Strength Checker',
  apiUrl: './assets/json/response.json',
  passMinLength: 6,
  passMaxLength: 8,
  strengthBarDefaultClass: 'strength-checker-default col-sm col-lg col-xs col-xl rounded',
  strengthBarWeakClass: 'strength-checker-weak col-sm col-lg col-xs col-xl rounded',
  strengthBarNormalClass: 'strength-checker-normal col-sm col-lg col-xs col-xl rounded',
  strengthBarStrongClass: 'strength-checker-strong col-sm col-lg col-xs col-xl rounded',
  strengthBarToolTipText: 'use specials characters [!@#$%^&*()_+], digits [0-9], Aa for healthy password',
  strengthBarTypes: {weak: 'Weak', normal: 'Normal', strong: 'Strong'},
  lengthValidationMsg: 'Minimum 6 and Maximum 8 chars, digits, symbol ...',
  maxLengthValidationMsg: 'Max Length is 8',
  textInputType: 'text' // to be able to debug better
};
