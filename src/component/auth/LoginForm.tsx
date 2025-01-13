"use client";

import React from 'react';
import {useDispatch} from "react-redux";
import {useRouter} from "next/navigation";
import * as Yup from "yup";
import {useFormik} from "formik";
import axiosInstance from "../../utils/axiosInstance";
import {signSuccess} from "../../redux/auth/authSlice";



function LoginForm(props) {
    const dispatch = useDispatch()
    const router = useRouter();

    const validationSchema = Yup.object({
        email: Yup.string()
            .email('Invalid email address')
            .required('Email is Required'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            // .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
            .required('Password is Required'),
    });

    // Formik setup with validation schema
    const formik = useFormik({
        initialValues: {
            email: 'user2@gmail.com',
            password: '123456',
        },
        validationSchema, // Use the validation schema here
        onSubmit: async (values) => {
            try {
                const response = await axiosInstance.post('auth/login', values);
                console.log("RESPONSE", response?.data);

                // Check if the response contains the token
                if (response?.data?.token) {
                    // Store the token in localStorage
                    console.log("response?.data?.token", response?.data?.token);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('authToken', response?.data?.token);
                    }
                    dispatch(signSuccess());
                    router.replace('/');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
    });

    return (
            <form className="w-full max-w-sm bg-white p-6 rounded shadow" onSubmit={formik.handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Login</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.email}
                    />
                    {formik.touched.email && formik.errors.email ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.email}</p>
                    ) : null}
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.password}
                    />
                    {formik.touched.password && formik.errors.password ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.password}</p>
                    ) : null}
                </div>

                <button
                    type="submit"
                    className="w-full bg-indigo-500 text-white py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none"
                >
                    Login
                </button>
            </form>
    );
}

export default LoginForm;