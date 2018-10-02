import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import withRedux from 'next-redux-wrapper';
import App, { AppComponentProps, Container } from 'next/app';
import React from 'react';
import { JssProvider } from 'react-jss';
import { Provider } from 'react-redux';
import { getPageContext } from '~/services/material-ui';
import { settings } from '~/settings';
import { makeStore } from '../redux';

class MyApp extends App<AppComponentProps> {
  private pageContext = getPageContext();

  componentDidMount() {
    const jssStyles = document.querySelector(`#${settings.ssrStyleId}`);
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }

  render() {
    const { Component, pageProps, store } = this.props;
    const { sheetsManager, sheetsRegistry, theme, generateClassName } = this.pageContext;

    return (
      <Container>
        <JssProvider registry={sheetsRegistry} generateClassName={generateClassName}>
          <Provider store={store}>
            <MuiThemeProvider theme={theme} sheetsManager={sheetsManager}>
              <CssBaseline />
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </Provider>
        </JssProvider>
      </Container>
    );
  }
}

export default withRedux(makeStore)(MyApp);
