import { useLang } from '@/hooks/useLang'
import { handleCloseSearchModal } from '@/lib/utils/common'

const SearchModal = () => {
  const { lang, translations } = useLang()

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    e.target.classList.add('with_value')
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    if (e.target.value) {
      return
    }

    e.target.classList.remove('with_value')
  }

  return (
    <div className='search-modal'>
      <button className='btn-reset close-icon' onClick={handleCloseSearchModal} />
      <h3 className='search-title'>{translations[lang].header.search_products}</h3>
      <div className='search-top'>
        <input type='text' placeholder={translations[lang].header.search_infos} className='search-modal__input' onFocus={handleInputFocus} onBlur={handleInputBlur} />
        <button className='search-find'>
          <svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' fill='none' viewBox='0 0 18 18'>
            <path fill='#000' fill-rule='evenodd' d='M14.5 8a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Zm-1.4 6.2a8 8 0 1 1 1-1l3.9 3.7-1 1.1-3.9-3.8Z' clip-rule='evenodd' />
          </svg>
        </button>
      </div>
    </div>
  )
}

export default SearchModal
