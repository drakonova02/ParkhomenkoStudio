'use client'
import { useLang } from '@/hooks/useLang'
import Logo from '@/components/elements/logo/Logo'
import Navigation from './Navigation'
import HeaderLinks from './HeaderLinks'

const Header = () => {
    const { lang, translations } = useLang()

    return ( 
        <header className="page-header">
            <div className='header__logo'>
                <Logo />
            </div>
            <Navigation />
            <HeaderLinks />
        </header>
    );
}
 
export default Header;