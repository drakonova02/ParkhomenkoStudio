import { useUnit } from 'effector-react'
import { handleCloseAuthPopup } from '@/lib/utils/common'

const AuthPopupClose = () => {
  return (
    <button
      className='btn-reset auth-popup__close close-icon'
      onClick={handleCloseAuthPopup}
    />
  )
}

export default AuthPopupClose
