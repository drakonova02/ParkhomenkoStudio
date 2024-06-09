'use client'
import { useUnit } from 'effector-react'
import { useRef, MutableRefObject } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Header from '../modules/header/Header'
import SearchModal from '../modules/header/SearchModal'
import Minicart from '../modules/header/minicart/Minicart'
import { $openAuthPopup } from '@/context/auth'
import AuthPopup from '../modules/AuthPopup/AuthPopup'
import { $minicart, $searchModal } from '@/context/modals';
import {
  addOverflowHiddenToBody,
  handleCloseAuthPopup,
  handleCloseSearchModal,
  handleCloseMinicart
} from '@/lib/utils/common'
import Footer from '../modules/footer/Footer'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const searchModal = useUnit($searchModal)
  const minicart = useUnit($minicart)
  const openAuthPopup = useUnit($openAuthPopup)
  const authWrapperRef = useRef() as MutableRefObject<HTMLDivElement>

  const handleCloseModals = () => {
    handleCloseSearchModal()
    handleCloseMinicart()
    addOverflowHiddenToBody()
  }

  const handleCloseAuthPopupByTarget = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const target = e.target as Element

    if (target === authWrapperRef.current) {
      handleCloseAuthPopup()
    }
  }

  return ( 
      <>
      <Header />
      {children}
      <AnimatePresence>
      {openAuthPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className='auth-popup-wrapper'
            onClick={handleCloseAuthPopupByTarget}
            ref={authWrapperRef}
          >
            <AuthPopup />
          </motion.div>
        )}
        {searchModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SearchModal />
          </motion.div>
        )}
        {minicart && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Minicart />
          </motion.div>
        )}
      </AnimatePresence>
      <div
        className={`overlay-display ${
          searchModal || minicart || openAuthPopup ? 'active' : ''
        }`}
        onClick={handleCloseModals}
      />
      <Footer />
    </>
  );
}
 
export default Layout;