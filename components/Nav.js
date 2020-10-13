import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import Router from 'next/router';
import { NotificationManager } from 'react-notifications';

import { logout } from '../store/actions/auth'



const Nav = () => {

    const loggedIn = useSelector(state => state.auth.loggedIn);
    let user = useSelector(state => state.auth.user);
    user =  typeof user === 'object' ? user : JSON.parse(user);

    const dispatch = useDispatch();
    
    const logoutHandler = () => {
        dispatch(logout());
        !loggedIn ? null : NotificationManager.success('Logged out', '', 3000);
        Router.push('/');  
    } 

    return (
        <>
            <div className="navbar-collapse ml-auto" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link href="/about"><a className="nav-link">About</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/store-location"><a className="nav-link">Store Location</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/career"><a className="nav-link">Career</a></Link>
                    </li>

                    <li className="nav-item">
                        <Link href="/contact"><a className="nav-link">Contact</a></Link>
                    </li>

                    { !loggedIn ? 
                    <li className="nav-item nav-bg-white">
                        <Link href="/signup"><a className="nav-link">Sign Up/Login</a></Link>
                    </li> : null }

                    { loggedIn && <div className="nav-item nav-bg-white account-toggle">
                        <a className="dropdown-toggle" data-toggle="dropdown">
                           {`${user.first_name} ${user.last_name}`}
                        </a>
                        <div className="dropdown-menu">
                            <a className="dropdown-item">My Account</a>
                            <a className="dropdown-item">Cart</a>
                            <a className="dropdown-item">Lost password</a>
                            <a onClick={logoutHandler} className="dropdown-item">Log out</a>
                        </div>
                    </div> }
                </ul>
            </div>
        </>
    )
};

export default Nav;