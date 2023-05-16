import '@/styles/globals.css'
import { Toaster } from 'react-hot-toast'
import { Layout } from '@/components'
import type { AppProps } from 'next/app'
import { StateContext } from '../context/StateContext'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  // Check if the current page is the index.js page
  const isIndexPage = router.pathname === '/'

  return (
    <StateContext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </StateContext>
  )
}
