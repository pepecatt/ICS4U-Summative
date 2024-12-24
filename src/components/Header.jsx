import { useNavigate } from 'react-router-dom';
import { useStoreContext } from '../context';
import React from 'react';
import './Header.css';
import cartImage from "../assets/cart.png";
import settingsImage from "../assets/settings.png";

function Header() {
	const {
		loggedIn, setLoggedIn,
		cartOpen, setCartOpen,
		settingsOpen, setSettingsOpen,
		genreList
	} = useStoreContext();
	const navigate = useNavigate();

	function loginPage() {
		navigate(`/login`);
	}

	function logout() {
		navigate(`/`);
		setLoggedIn(false);
	}

	function cart() {
		if (cartOpen) {
			setCartOpen(false);
		} else {
			setCartOpen(true);
		}
	}

	function settings() {
		if (settingsOpen) {
			setSettingsOpen(false);
			navigate(`/movies/genre/${genreList[0].id}`);
		} else {
			setSettingsOpen(true);
			navigate(`/movies/settings`);
		}
	}

	return (
		<div className="header-container">
			<h1 className="Popflix">Popflix</h1>
			{!loggedIn && (
				<button className="signIn" onClick={() => { loginPage() }}>Log In</button>
			)}
			{loggedIn && (
				<div className="loggedIn">
					<button className="logout" onClick={() => { logout() }}>Log Out</button>
					<button className="cart" onClick={() => { cart() }}>
						<img src={cartImage}></img>
					</button>
					<button className="settings" onClick={() => { settings() }}>
						<img src={settingsImage}></img>
					</button>
				</div>
			)}
		</div>
	)
}

export default Header;