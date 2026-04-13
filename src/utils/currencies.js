export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$', name: 'US Dollar', regions: ['US', 'Global'] },
  EUR: { code: 'EUR', symbol: '€', name: 'Euro', regions: ['EU', 'France', 'Germany'] },
  AED: { code: 'AED', symbol: 'د.إ', name: 'UAE Dirham', regions: ['AE', 'Dubai', 'Abu Dhabi'] },
  SAR: { code: 'SAR', symbol: 'ر.س', name: 'Saudi Riyal', regions: ['SA', 'Saudi Arabia'] },
  EGP: { code: 'EGP', symbol: 'ج.م', name: 'Egyptian Pound', regions: ['EG', 'Egypt'] },
  KWD: { code: 'KWD', symbol: 'د.ك', name: 'Kuwaiti Dinar', regions: ['KW', 'Kuwait'] },
  QAR: { code: 'QAR', symbol: 'ر.ق', name: 'Qatari Riyal', regions: ['QA', 'Qatar'] },
  OMR: { code: 'OMR', symbol: 'ر.ع.', name: 'Omani Rial', regions: ['OM', 'Oman'] },
  BHD: { code: 'BHD', symbol: 'd.ب', name: 'Bahraini Dinar', regions: ['BH', 'Bahrain'] },
  JOD: { code: 'JOD', symbol: 'د.ا', name: 'Jordanian Dinar', regions: ['JO', 'Jordan'] },
  TND: { code: 'TND', symbol: 'د.ت', name: 'Tunisian Dinar', regions: ['TN', 'Tunisia'] },
  MAD: { code: 'MAD', symbol: 'د.م.', name: 'Moroccan Dirham', regions: ['MA', 'Morocco'] },
  GBP: { code: 'GBP', symbol: '£', name: 'British Pound', regions: ['UK', 'GB'] },
  PKR: { code: 'PKR', symbol: 'Rs', name: 'Pakistani Rupee', regions: ['PK', 'Pakistan'] },
  MYR: { code: 'MYR', symbol: 'RM', name: 'Malaysian Ringgit', regions: ['MY', 'Malaysia'] },
};

export const SUBSCRIPTION_PRICES = {
  USD: { monthly: 9.99, yearly: 99.99 },
  EUR: { monthly: 8.99, yearly: 89.99 },
  AED: { monthly: 36.99, yearly: 369.99 },
  SAR: { monthly: 37.49, yearly: 374.99 },
  EGP: { monthly: 155, yearly: 1550 },
  GBP: { monthly: 7.99, yearly: 79.99 },
  KWD: { monthly: 3.05, yearly: 30.50 },
  PKR: { monthly: 2600, yearly: 26000 },
};

export const REGIONS = {
  'US': { name: 'United States', currency: 'USD', timezone: 'America/New_York', country: 'US' },
  'EU': { name: 'Europe', currency: 'EUR', timezone: 'Europe/London', country: 'GB' },
  'AE': { name: 'United Arab Emirates', currency: 'AED', timezone: 'Asia/Dubai', country: 'AE' },
  'SA': { name: 'Saudi Arabia', currency: 'SAR', timezone: 'Asia/Riyadh', country: 'SA' },
  'EG': { name: 'Egypt', currency: 'EGP', timezone: 'Africa/Cairo', country: 'EG' },
  'KW': { name: 'Kuwait', currency: 'KWD', timezone: 'Asia/Kuwait', country: 'KW' },
  'QA': { name: 'Qatar', currency: 'QAR', timezone: 'Asia/Qatar', country: 'QA' },
  'OM': { name: 'Oman', currency: 'OMR', timezone: 'Asia/Muscat', country: 'OM' },
  'BH': { name: 'Bahrain', currency: 'BHD', timezone: 'Asia/Bahrain', country: 'BH' },
  'JO': { name: 'Jordan', currency: 'JOD', timezone: 'Asia/Amman', country: 'JO' },
  'TN': { name: 'Tunisia', currency: 'TND', timezone: 'Africa/Tunis', country: 'TN' },
  'MA': { name: 'Morocco', currency: 'MAD', timezone: 'Africa/Casablanca', country: 'MA' },
  'GB': { name: 'United Kingdom', currency: 'GBP', timezone: 'Europe/London', country: 'GB' },
  'PK': { name: 'Pakistan', currency: 'PKR', timezone: 'Asia/Karachi', country: 'PK' },
  'MY': { name: 'Malaysia', currency: 'MYR', timezone: 'Asia/Kuala_Lumpur', country: 'MY' },
};

export const CURRENCY_FORMATTER = (amount, currency) => {
  const currencyInfo = CURRENCIES[currency];
  if (!currencyInfo) return `${amount.toFixed(2)}`;
  
  return `${currencyInfo.symbol}${amount.toFixed(2)}`;
};
