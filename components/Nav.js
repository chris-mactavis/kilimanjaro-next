import Link from 'next/link';

const Nav = () => {
    return (
        <>
            <div className="navbar-collapse ml-auto" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/menu"><a className="nav-link">Menu</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/about"><a className="nav-link">About</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/store-location"><a className="nav-link">Store Location</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/careers"><a className="nav-link">Career</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/contact"><a className="nav-link">Contact</a></Link>
                    </li>

                    <li className="nav-item nav-bg-white">
                        <Link href="/signup"><a className="nav-link">Sign Up/Login</a></Link>
                    </li>
                </ul>
            </div>
        </>
    )
};

export default Nav;