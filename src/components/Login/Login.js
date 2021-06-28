import React, { useState, useContext } from 'react';
import {app} from '../../config/firebase'
import { Link, withRouter, Redirect } from 'react-router-dom';
import { AuthContext } from '../../Context/auth'
import swal from 'sweetalert';
import { Sheet } from '../'

const Login = () => {
    const [toggle, setToggle] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({status : false, errorMessage : ""})

    const context = useContext(AuthContext);

    const isToggle = (event) => {
        event.preventDefault();
        if (!toggle) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    const onSubmit = (event) => {
        event.preventDefault();
        app.auth().signInWithEmailAndPassword(email, password).then(() => {
            swal({
                title: "Successfully",
                text: "successfully registered",
                icon: "success",
                button: "proceed",
              }).then(() => {
                  setEmail("");
                  setPassword("");
                  setError({status : false, errorMessage : ""});
                  <Redirect to="/dashboard"/>
              })
        }).catch((error) => {
            setError({status : true, errorMessage : error.message});
        })
    }

    if (context) {
        return <Redirect to="/dashboard" />;
    }

    console.log(context)
    

    //  const signOut = (event) => {
    //     event.preventDefault();
    //     app.auth().signOut().then(() => console.log("sign out"));
    //   };

    return (
        <>
            <img src="/image/background.png" className="absolute right-0 top-0 w-full h-full" alt="Background" />
            <Sheet className="max-w-md z-50">
                <form>
                    <h1 className="text-2xl font-bold">Sign in to your account</h1>
                    <div className="mb-4 mt-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">Email</label>
                        <input required onChange={(event) => setEmail(event.target.value)} type="email" name={email} value={email} id="email" placeholder="Your email address" className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10" />
                    </div>
                    <div className="mb-6 mt-6">
                        <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">Password</label>
                        <input required onChange={(event) => setPassword(event.target.value)} id="password" type="password" name="password" value={password} className="text-sm bg-gray-100 appearance-none rounded w-full py-2 px-3 text-gray-700 mb-1 leading-tight focus:outline-none focus:shadow-outline h-10" placeholder="Your password" />
                    </div>
                    <div className="relative inline-block w-full">
                        <div>
                            <button onClick={isToggle} className="flex justify-between w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none" id="menu-button" aria-expanded="true" aria-haspopup="true">
                                Role
                                <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                            </button>
                        </div>
                        {toggle && (
                            <div role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1" className="origin-top-right absolute right-0 w-full mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                                <div className="py-1" role="none">
                                    <span className="text-gray-700 block px-4 py-1 text-sm">Farmer</span>
                                    <span className="text-gray-700 block px-4 py-2 text-sm">Trader</span>
                                    <span className="text-gray-700 block px-4 py-2 text-sm">NFA</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-5">
                        <span className="text-gray-600 text-sm">Don't have an account?</span>
                        <Link to="/register" className="text-gray-700 ml-1 text-sm font-semibold cursor-pointer">Sign up</Link>
                    </div>
                    {error.status && (
                        <div className="bg-red-400 border-l-4 border-red-300 py-2 px-4 rounded-sm my-4">
                            <span className="text-gray-100 text-sm">{error.errorMessage}</span>
                        </div>
                    )}
                    {/* <div className="w-full mt-8">
                        <button onClick={(event) => signOut(event)} type="submit" className="w-full bg-primary hover:bg-primary-slight text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">Logout</button>
                    </div> */}
                    <div className="w-full mt-8">
                        <button onClick={(event) => onSubmit(event)} type="submit" className="w-full bg-primary hover:bg-primary-slight text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">Sign in</button>
                    </div>
                </form>
            </Sheet>
        </>
    )
}

export default withRouter(Login);