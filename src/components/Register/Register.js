import React, { useState } from 'react';
import {app} from '../../config/firebase'
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom'
import { Sheet, Textfield } from '../'
import swal from 'sweetalert';

const information = {
    firstname: "",
    lastname: "",
    role : "",
    gender: "",
    date: "",
    contact: 0,
    barangay: "",
    municipality: "",
    province: "",
    email: "",
    password: "",
    confirmPassword: ""
}

const Register = () => {
    const [toggle, setToggle] = useState(false);
    const [{ firstname, lastname, role, gender, date, contact, barangay, municipality, province, email, password, confirmPassword }, setState] = useState(information);

    const isToggle = (event) => {
        event.preventDefault();
        if (!toggle) {
            setToggle(true);
        } else {
            setToggle(false);
        }
    }

    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    //clear state
    const clearState = () => {
        setState({ ...information });
      };

    const onSubmit = (event) => {
        event.preventDefault();
        
        // if(password === confirmPassword){
        //     const document = app.firestore().collection("user");
        //     app.auth().createUserWithEmailAndPassword(email, password).then((cred) => (
        //         (async() => {
        //             if(cred.user){
        //                 document.doc(cred.user.uid).set({
        //                     firstname,
        //                     lastname,
        //                     role,
        //                     gender,
        //                     date,
        //                     contact,
        //                     barangay,
        //                     municipality,
        //                     province, 
        //                     email,
        //                     password
        //                 }).then(() => {
        //                     swal({
        //                         title: "Successfully",
        //                         text: "successfully registered",
        //                         icon: "success",
        //                         button: "proceed",
        //                       }).then(() => {
        //                         clearState();
        //                       });
        //                 })
        //             }
        //         })()
        //     )).catch((error) => {
        //         swal({
        //             title: "Warning",
        //             text: `${error.message}`,
        //             icon: "warning",
        //             button: "Ok",
        //           });
        //     })
        // }else {
        //     swal({
        //         title: "Warning",
        //         text: `Password doesnt match, please try again`,
        //         icon: "warning",
        //         button: "Ok",
        //       });
        // }
    }

    return (
        <>
            <img src="/image/background.png" className="absolute right-0 top-0 w-full h-full" alt="Background" />
            <Sheet className="max-w-4xl z-50">
                <Link to="/" className="flex justify-between mb-4">
                    <div className="flex">
                        <ChevronLeft className="text-gray-700" />
                        <span className="ml-1 font-bold text-gray-700 ">Back</span>
                    </div>
                    <h1 className="text-3xl text-center font-bold">Sign up</h1>
                </Link>
                <form>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Textfield onChange={(event) => onChange(event)} value={firstname} label="First name" type="text" placeholder="firstname" name="firstname" />
                        <Textfield onChange={(event) => onChange(event)} value={lastname} label="Last name" type="text" placeholder="lastname" name="lastname" />
                        {/* <div className="relative inline-block w-full mt-8">
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
                                    <span className="text-gray-700 block px-4 py-1 text-sm" value="Farmer" onChange={(event) => onChange(event)}>Farmer</span>
                                    <span className="text-gray-700 block px-4 py-2 text-sm" value="Trader" onChange={(event) => onChange(event)}>Trader</span>
                                    <span className="text-gray-700 block px-4 py-2 text-sm" value="NFA" onChange={(event) => onChange(event)}>NFA</span>
                                </div>
                            </div>
                        )}
                    </div> */}
                    </div>
                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-4">
                        <Textfield onChange={(event) => onChange(event)} value={gender} label="Gender" type="text" placeholder="Gender" name="gender" />
                        <Textfield onChange={(event) => onChange(event)} value={date} label="Date" type="date" placeholder="date" name="date" />
                        <Textfield onChange={(event) => onChange(event)} value={contact} label="Contact Number" type="number" placeholder="Contact Number" name="contact" />
                    </div>
                    <div className="grid grid-cols-1  sm:grid-cols-3 gap-4">
                        <Textfield onChange={(event) => onChange(event)} value={barangay} label="Barangay" type="text" placeholder="Barangay" name="barangay" />
                        <Textfield onChange={(event) => onChange(event)} value={municipality} label="Municipality" type="text" placeholder="Municipality" name="municipality" />
                        <Textfield onChange={(event) => onChange(event)} value={province} label="Province" type="text" placeholder="Province" name="province" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Textfield onChange={(event) => onChange(event)} value={email} label="email" type="text" placeholder="Email" name="email" />
                        <Textfield onChange={(event) => onChange(event)} value={password} label="Password" type="password" placeholder="Password" name="password" />
                        <Textfield onChange={(event) => onChange(event)} value={confirmPassword} label="Confirm Password" type="password" placeholder="Confirm Password" name="confirmPassword" />
                    </div>
                    <div>
                    <div className="w-52 mt-4 mb-2 float-right">
                        <button onClick={(event) => onSubmit(event)} type="submit" className="w-full bg-primary hover:bg-primary-slight text-white text-sm py-2 px-4 font-semibold rounded-sm focus:outline-none focus:shadow-outline h-10">Sign Up</button>
                    </div>
                    </div>
                </form>
            </Sheet>
        </>
    )
}

export default Register;