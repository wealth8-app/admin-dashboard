export const ANALYTICS_REQUESTS = {
  GET_ANALYTICS: '/analytics',
  GET_PRODUCT_DETAILS: '/product-details',
  GET_INVESTMENT_DETAILS: '/investment-details',
  FREQUENT_DEPOSITS: '/frequent-deposits',
  RETENTION_DETAILS: '/retention-details',
  DEPOSIT_DETAILS: '/deposit-details',
  getMandates: (after) => `/mandate?limit=20${after ? `&after=${after}` : ''}`,
  getPayments: (after) => `/payment?limit=20${after ? `&after=${after}` : ''}`,
  getSubscriptions: (after) => `/subscription?limit=20${after ? `&after=${after}` : ''}`,
  getAllTimeGrowth: '/deposit-details',
  GET_BONUSES: 'referral/all',
};
