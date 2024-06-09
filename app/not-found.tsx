'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent'
import { useLang } from '@/hooks/useLang'

const NotFound = () => {
  const { lang, translations } = useLang()

  return (
    <main>
      <section>
        <div className='container'>
          <EmptyPageContent
            subtitle={translations[lang].common.not_found_subtitle}
            description={translations[lang].common.not_found_description}
            btnText={translations[lang].common.go_shopping}
            emptyWord={translations[lang].common.not_found_bg}
            oopsWord={translations[lang].common.ops}
            title={translations[lang].common.not_found_title}
          />
        </div>
      </section>
    </main>
  )
}

export default NotFound
