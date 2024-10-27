import { Colors } from "./globalStyles";

// 디자인 스타일 (hover, actice, disabled 등..)

const ColorStyle = {
  primary: {
    main: Colors.primary['A200'],
    contrastText: '#fff',
    hover: Colors.primary['A400'],
    active: Colors.primary['A100'],
    disabled: Colors.primary['100'],
  },
  secondary: {
    main: Colors.secondary['200'],
    contrastText: '#fff',
    hover: Colors.secondary['500'],
    active: Colors.secondary['A100'],
    disabled: Colors.secondary['100'],
  },
  danger: {
    main: Colors.danger['500'],
    contrastText: '#fff',
    hover: Colors.danger['A200'],
    active: Colors.danger['A100'],
    disabled: Colors.danger['200'],
  },
  indigo: {
    main: Colors.indigo['500'],
    contrastText: '#fff',
    hover: Colors.indigo['A200'],
    active: Colors.indigo['300'],
    disabled: Colors.indigo['300'],
  },
  blue: {
    main: Colors.blue['500'],
    contrastText: '#fff',
    hover: Colors.blue['A200'],
    active: Colors.blue['300'],
    disabled: Colors.blue['300'],
  },
  success: {
    main: Colors.success['500'],
    contrastText: '#fff',
    hover: Colors.success['A200'],
    active: Colors.success['300'],
    disabled: Colors.success['300'],
  },
  dark: {
    main: Colors.dark['900'],
    contrastText: '#fff',
    hover: Colors.dark['700'],
    active: Colors.dark['500'],
    disabled: Colors.dark['300'],
  },
  light: {
    main: '#fff',
    contrastText: '#fff',
    hover: '#f2f2f2',
    active: '#e4e4e4',
    disabled: '#eee',
  },
  text: {
    primary: Colors.primary['A200'],
    secondary: Colors.secondary['400'],
    danger:Colors.danger['A200'],
    grey:Colors.dark['600'],
    dark:Colors.light['900'],
    light:Colors.dark['900'],
    disabled: Colors.dark.A100,
  },
  background: {
    primary: Colors.primary['50'],
    secondary: Colors.secondary['50'],
    danger:Colors.danger['50'],
    dark:Colors.dark['900'],
    light:Colors.light['900'],
  },
}

export default ColorStyle;