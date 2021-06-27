import React, { useState } from 'react';
import { ChevronLeft } from 'react-feather';
import { Link } from 'react-router-dom'
import { Sheet } from '../'

const Textfield = (props) => {
    const { type, placeholder, name, label, value, onChange } = props;
    return (
        <div className="mb-1 sm:mb-4 mt-1 sm:mt-6">
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">{label}</label>
            <input onChange={(event) => onChange(event)} type={type} placeholder={placeholder} name={name} value={value} id={name} className="text-sm appearance-none rounded w-full py-2 px-3 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline h-10" />
        </div>
    )
}

const information = {
    firstname: "",
    lastname: "",
    gender: "",
    date: "",
    contact: 0,
    barangay: "",
    municipality: "",
    province: "",
    username: "",
    password: "",
    confirmPassword: ""
}

const Register = () => {

    const [{ firstname, lastname, gender, date, contact, barangay, municipality, province, username, password, confirmPassword }, setState] = useState(information);

    const onChange = (event) => {
        event.preventDefault();
        const { name, value } = event.target;
        setState((prevState) => ({ ...prevState, [name]: value }));
    }

    const onSubmit = (event) => {
        event.preventDefault();
        console.log({ firstname, lastname, gender, date, contact, barangay, municipality, province, username, password })
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
                        <Textfield onChange={(event) => onChange(event)} value={username} label="Username" type="text" placeholder="Username" name="username" />
                        <Textfield onChange={(event) => onChange(event)} value={password} label="Password" type="password" placeholder="Password" name="password" />
                        <Textfield onChange={(event) => onChange(event)} value={confirmPassword} label="Confirm Password" type="password" placeholder="Confirm Password" name="confirmPassword" />
                    </div>
                    <div className="w-52 mt-4 mb-2 float-right">
                        <button onClick={(event) => onSubmit(event)} type="button" className="w-full bg-primary hover:bg-primary-slight text-white text-sm py-2 px-4 font-semibold rounded focus:outline-none focus:shadow-outline h-10">Sign Up</button>
                    </div>
                </form>
            </Sheet>
        </>
    )
}

export default Register;