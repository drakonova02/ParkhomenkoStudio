'use client'
import { useUnit } from 'effector-react'
import { Toaster } from 'react-hot-toast'
import { EarthoOneProvider } from '@eartho/one-client-react'
import { Next13ProgressBar } from 'next13-progressbar'
import Layout from './Layout'
import {
  handleCloseAuthPopup,
  handleCloseShareModal,
  removeOverflowHiddenFromBody,
} from '@/lib/utils/common'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
// import CookieAlert from '../modules/CookieAlert/CookieAlert'
import { $openAuthPopup } from '@/context/auth'
import { $shareModal } from '@/context/modals'
import '@/context/goods'
import '@/context/auth'
// import '@/context/cart'
// import '@/context/comparison/init'
// import '@/context/favorites/init'
import '@/context/user'

const PagesLayout = ({ children }: { children: React.ReactNode }) => {
  const [isClient, setIsClient] = useState(false)
  const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
  const openAuthPopup = useUnit($openAuthPopup)
  const shareModal = useUnit($shareModal)

  useEffect(() => setIsClient(true), [])

  useEffect(() => {
    const checkCookie = document.cookie.indexOf('CookieBy=Parkhomenko')
    checkCookie != -1
      ? setCookieAlertOpen(false)
      : setTimeout(() => setCookieAlertOpen(true), 3000)
  }, [])

  return (
    <>
      {isClient ? (
        <EarthoOneProvider
          clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
        >
          <html lang='en'>
            <body>
              <Next13ProgressBar height='4px' color='#9466FF' showOnShallow />
              <Layout>{children}</Layout>
              <div
                className={`auth-overlay ${
                  openAuthPopup ? 'overlay-active' : ''
                }`}
                onClick={handleCloseAuthPopup}
              />
              <div
                className={`share-overlay ${
                  shareModal ? 'overlay-active' : ''
                }`}
                onClick={handleCloseShareModal}
              />
              {/* {cookieAlertOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  className='cookie-popup'
                >
                  <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
                </motion.div>
              )} */}
              <Toaster position='top-center' reverseOrder={false} />
            </body>
          </html>
        </EarthoOneProvider>
      ) : (
        <html lang='en'>
          <body>
            <></>
          </body>
        </html>
      )}
    </>
  )
}

export default PagesLayout
