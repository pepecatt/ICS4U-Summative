import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import { useStoreContext } from '../context';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase';
import './LoginView.css';

function LoginView() {
	const { setUser, setLoggedIn } = useStoreContext();
	const enteredEmail = useRef('');
	const enteredPassword = useRef('');
	const navigate = useNavigate();

  /*
	function login(e) {
		e.preventDefault();
		if (enteredEmail.current.value == email && enteredPassword.current.value == password) {
			navigate(`/movies/genre/${genreList[0].id}`);
			setLoggedIn(true);
		} else {
			alert("Your email or password input is incorrect!");
		}
	} */

  async function emailLogin(e) {
    e.preventDefault();
    try {
      const user = (await signInWithEmailAndPassword(auth, enteredEmail.current.value, enteredPassword)).user;
      setUser(user);
      setLoggedIn(true);
      navigate(`/movies`);
    } catch (error) {
      console.log(error);
      alert("Error signing in!");
    }
  }

  async function googleLogin() {
    try {
      const user = (await signInWithPopup(auth, new GoogleAuthProvider())).user;
      setUser(user);
      setLoggedIn(true);
      navigate(`/movies`);
    } catch (error) {
      console.log(error);
      alert("Error signing in!");
    }
  }
  

	return (
		<div className="login-container">
			<div className='login'>
				<form onSubmit={(event) => { emailLogin(event) }}>
					<label>Log In</label>
					<input
						type="text"
						ref={enteredEmail}
						placeholder="Email"
						required />
					<input
						type="text"
						ref={enteredPassword}
						placeholder="Password"
						required />
					<button type="submit">Log In</button>
				</form>
        <button onClick={() => googleLogin()} type="submit" className="googleLogin">Login by Google</button>
			</div>
		</div>
	)
}

export default LoginView;