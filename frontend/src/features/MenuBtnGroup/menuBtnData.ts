import { MenuBtnItem } from './model/types';

export const menuBtnData: MenuBtnItem[] = [
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '약 챙기기',
      adult: '복약관리',
    },
    urlTo: '',
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '급식표 등록',
      adult: '급식표 등록',
    },
    urlTo: '',
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '주간 리포트',
      adult: '주간 리포트',
    },
    urlTo: '/report',
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '내 기록',
      adult: '어린이 기록',
    },
    urlTo: '/record',
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '프로필',
      adult: '프로필',
    },
    urlTo: '/profile',
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '설정',
      adult: '설정',
    },
    urlTo: '',
  },
];
