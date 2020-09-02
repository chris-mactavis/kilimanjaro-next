import Link from 'next/link';
import Nav from './Nav';

const NavBar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg">
                <Link href="/">
                    <a className="navbar-brand">
                        <img src="/images/logo.png" alt="Kilimanjaro-logo" />
                    </a>
                </Link>

                <button className="navbar-toggler" id="show-nav" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation">
                    <img className="navbar-toggler-icon" src="/images/icon/button.svg" alt=""/>
                </button>

                <Nav />
            </nav>
        </>
    );
};

export default NavBar;