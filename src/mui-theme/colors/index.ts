export interface IMuiColor {
  [color: string]: Record<number, string>;
}

const olive: IMuiColor = {
  100: ' #f1f6e8',
  200: '#dcded0',
  300: '#c5c6b7',
  400: '#adaf9c',
  500: '#969880',
  600: '#7d7f67',
  700: '#61624f',
  800: '#454637',
  900: '#2a2a1e',
};

const gray: IMuiColor = {
  100: '#f4f1e8',
  200: '#dbdad2',
  300: '#c3c3ba',
  400: '#ababa0',
  500: '#939386',
  600: '#797a6d',
  700: '#5e5f54',
  800: '#44443b',
  900: '#292921',
};

const bark: IMuiColor = {
  100: '#f5f0ef',
  200: '#dcd4d3',
  300: '#c7b9b4',
  400: '#b29f95',
  500: '#9f8676',
  600: '#86705c',
  700: '#685a48',
  800: '#494134',
  900: '#2b281f',
};
const brick: IMuiColor = {
  100: '#ffeee7',
  200: '#ecd0c6',
  300: '#dbb2a4',
  400: '#cc9480',
  500: '#bc765c',
  600: '#a35c43',
  700: '#7f4733',
  800: '#5b3324',
  900: '#381d15',
};
const danger: IMuiColor = {
  100: '#ffe9e9',
  200: '#f0c6c6',
  300: '#dda2a2',
  400: '#ce7e7f',
  500: '#bf5a5a',
  600: '#a54040',
  700: '#813132',
  800: '#5e2323',
  900: '#3a1313',
};
const success: IMuiColor = {
  100: '#eef8e8',
  200: '#d8e4cc',
  300: '#bfd0ae',
  400: '#a5bd8f',
  500: '#8daa70',
  600: '#739056',
  700: '#597042',
  800: '#3f502e',
  900: '#253019',
};
const warning: IMuiColor = {
  100: '#fffadd',
  200: '#faefb4',
  300: '#f5e488',
  400: '#f1da5a',
  500: '#eecf2e',
  600: '#d4b615',
  700: '#a58d0e',
  800: '#766507',
  900: '#473d01',
};
const info: IMuiColor = {
  100: '#e1f9fb',
  200: '#c5e6e9',
  300: '#a5d4d8',
  400: '#84c3c7',
  500: '#64b2b6',
  600: '#4b989d',
  700: '#38767b',
  800: '#255458',
  900: '#113436',
};

export const colors = {
  olive,
  bark,
  brick,
  gray,
  danger,
  success,
  info,
  warning,
};
