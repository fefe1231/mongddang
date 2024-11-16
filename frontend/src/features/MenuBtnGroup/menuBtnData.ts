import { MenuBtnItem } from './model/types';

export const menuBtnData: MenuBtnItem[] = [
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '약 챙기기',
      protector: '복약관리',
    },
    urlTo: {
      child: "",
      protector: "",
    }
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '급식표 등록',
      protector: '급식표 등록',
    },
    urlTo: {
      child: "",
      protector: "",
    },
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '주간 리포트',
      protector: '주간 리포트',
    },
    urlTo: {
      child: '/report',
      protector: "",
    },
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '내 기록',
      protector: '어린이 기록',
    },
    urlTo: {
      child: '/record',
      protector: "",
    },
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '프로필',
      protector: '프로필',
    },
    urlTo: {
      child: '/profile',
      protector: "",
    },
  },
  {
    icon: '/img/%EB%A7%90%EB%9E%911.png',
    menu: {
      child: '설정',
      protector: '설정',
    },
    urlTo: {
      child: "",
      protector: '/invitecode',
    },
  },
];
