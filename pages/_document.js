import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html prefix="og: http://ogp.me/ns#">
        <Head>
            <meta 
                name="image"
                property="og:image"
                content="https://www.studentdashboard.ca/logo.png"
            />
            <title>Student Dashboard</title>
            <meta 
                name="title"
                property="og:title"
                content="Student Dashboard" 
            />
            <meta 
                property="og:description" 
                content="Student Dashboard App"
            />
            <meta 
                property="og:url"
                content="https://www.studentdashboard.ca/dashboard/home"
            />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument