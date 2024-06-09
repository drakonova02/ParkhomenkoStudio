'use client'
import { useLang } from '@/hooks/useLang'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const Navigation = () => {
    const { lang, translations } = useLang()
    const pathname = usePathname()

    return ( 
        <nav className='navigation'>
            <ul>
                <li>
                    <Link href='/catalog'>
                        {translations[lang].main_menu.catalog}
                    </Link>
                </li>
                <li>
                    <Link href='/blog'>
                        {translations[lang].main_menu.blog}
                    </Link>
                </li>
                <li>
                    <Link href='/exhibition'>
                        {translations[lang].main_menu.exhibition}
                    </Link>
                </li>
                <li>
                    <Link href='/about'>
                        {translations[lang].main_menu.about}
                    </Link>
                </li>
            </ul>
        </nav>
    );
}
 
export default Navigation;