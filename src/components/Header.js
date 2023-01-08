import logoHeader from '../images/header__logo.svg';

function Header() {
    return (
        <header className="header">
            <img className="header__logo" src={logoHeader} alt="логотип проекта Место" />
        </header>
    )
}

export default Header;
