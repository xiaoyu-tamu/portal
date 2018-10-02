import React from 'react';
import Document, { Head, Main, NextScript, NextDocumentContext } from 'next/document';
import { settings, paths } from '../settings';

export default class MyDocument extends Document {
  static getInitialProps(ctx: NextDocumentContext) {
    let pageContext: any;

    const page = ctx.renderPage((Component) => (props) => {
      pageContext = props.pageContext;
      return <Component {...props} />;
    });

    return { ...page, pageContext };
  }

  render() {
    const { pageContext } = this.props;
    return (
      <html lang="en" dir="ltr" style={{ height: '100%' }}>
        <Head>
          <title>{settings.siteName}</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="user-scalable=0, initial-scale=1, minimum-scale=1, width=device-width, height=device-height"
          />
          <meta name="theme-color" content={pageContext.theme.palette.primary.main} />
          <link rel="stylesheet" href={paths.other.googleFont} />
          <style
            id={settings.ssrStyleId}
            dangerouslySetInnerHTML={{ __html: pageContext.sheetsRegistry.toString() }}
          />
        </Head>
        <body style={{ height: '100%' }}>
          <Main
            // @ts-ignore
            style={{ height: '100%' }}
          />
          <NextScript />
        </body>
      </html>
    );
  }
}
