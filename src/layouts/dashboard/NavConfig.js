// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

const navConfig = [
  {
    title: 'User Details',
    path: '/dashboard/app',
    icon: getIcon('eva:pie-chart-2-fill'),
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
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
];

export default navConfig;
