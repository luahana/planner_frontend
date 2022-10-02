import '../styles/globals.css'
import Layout from '../components/Layout'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Script
        src='https://accounts.google.com/gsi/client'
        strategy='beforeInteractive'
        async
        defer
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  )
}

export default MyApp
