"use client";

import { useFormik } from 'formik';
import * as Yup from 'yup';
import axiosInstance from "../../../utils/axiosInstance";
import {signSuccess} from "../../../redux/auth/authSlice";
import {useRouter} from "next/navigation";


export default function SignUp() {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
        }),
        onSubmit: async (values) => {
            try {

                const data = {
                    name: values.fullName,
                    email: values.email,
                    password: values.password
                }

                const response = await axiosInstance.post('auth/create', data);
                console.log("RESPONSE", response?.data);

                // Check if the response contains the token
                if (response?.data) {
                    // Store the token in localStorage
                    router.replace('/sign-in');
                }
            } catch (error) {
                console.error('Error during login:', error);
            }
        },
    });

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form className="w-full max-w-sm bg-white p-6 rounded shadow" onSubmit={formik.handleSubmit}>
                <h2 className="text-xl font-bold mb-4">Sign Up</h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium mb-2" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        name="fullName"
                        type="text"
                        className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:ring-indigo-200"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.fullName}
                    />
                    {formik.touched.fullName && formik.errors.fullName ? (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.fullName}</p>
                    ) : null}
                </div>

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
                    Sign Up
                </button>
            </form>
        </div>
    );
}
