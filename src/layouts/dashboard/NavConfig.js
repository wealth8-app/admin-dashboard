// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'Home',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'Users',
    path: '/dashboard/users',
    icon: getIcon('mdi:users-group'),
  },
  {
    title: 'product details',
    path: '/dashboard/product-details',
    icon: getIcon('ant-design:rise'),
  },
  {
    title: 'investment details',
    path: '/dashboard/investment-details',
    icon: getIcon('ant-design:pound'),
  },
  {
    title: 'Retention',
    path: '/dashboard/retention',
    icon: getIcon('ant-design:heat-map'),
  },
  {
    title: 'Mandates',
    path: '/dashboard/mandates',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Payments',
    path: '/dashboard/payments',
    icon: getIcon('eva:file-text-fill'),
  },
  {
    title: 'Subscriptions',
    path: '/dashboard/subscriptions',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'Bonuses',
    path: '/dashboard/bonuses',
    icon: getIcon('eva:gift-fill'),
  },

  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
