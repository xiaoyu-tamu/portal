import { createMuiTheme } from '@material-ui/core';

const appHeaderHeight = 48;

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#222' },
    secondary: { main: '#1890ff' },
    background: { default: '#f5f5f5' }
  },

  spacing: {
    sider: 240
  },

  shape: {
    borderRadius: 8
  },

  mixins: {
    toolbar: {
      minHeight: appHeaderHeight
    }
  }
});

declare module '@material-ui/core/styles/spacing' {
  export interface Spacing {
    negativeIconButton: number | string;
    sider: number;
    page: number;
  }
}

declare module '@material-ui/core/styles/' {
  export interface Spacing {
    negativeIconButton: number | string;
    sider: number;
    page: number;
  }
}
