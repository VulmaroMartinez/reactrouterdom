/*Navegar entre componentes por medio de URL*/
import React from 'react'
import { Button, Checkbox, Label, TextInput } from 'flowbite-react';
import SignInPage from '../modules/auth/SignInPage';
import { useContext } from 'react';
import AuthContext from '../config/context/auth-context';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import AdminLayout from '../components/layout/AdminLayout';
import ClientLayout from '../components/layout/ClientLayout';
import UserLayout from '../components/layout/UserLayout';

const AppRouter = () => {
    const { user } = useContext(AuthContext);
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                {user.signed ? (
                    <>
                        {user.roles[0].name === "ADMIN_ROLE" && (
                            <Route path='/' element={<AdminLayout />}>
                                <Route path='admin'
                                    element={
                                        <>
                                            {
                                                user.user.person?.name + " " + user.user.person?.surname + " " + `${user.user.person?.lastname ?? ''}` + " - " + user?.roles[0]?.name
                                            }
                                        </>} />
                                <Route path='/*' element={<>404 not found</>} />
                            </Route>
                        )}
                        {user.roles[0].name === "CLIENT_ROLE" && (
                            <Route path='/' element={<ClientLayout />}>
                                <Route path='client'
                                    element={
                                        <>
                                            {
                                                user.user.person?.name + " " + user.user.person?.surname + " " + `${user.user.person?.lastname ?? ''}` + " - " + user?.roles[0]?.name
                                            } </>} />
                                <Route path='/*' element={<>404 not found</>} />
                            </Route>
                        )}
                        {user.roles[0].name === "USER_ROLE" && (
                            <Route path='/' element={<UserLayout />}>
                                <Route path='user'
                                    element={
                                        <>
                                            {
                                                user.user.person?.name + " " + user.user.person?.surname + " " + `${user.user.person?.lastname ?? ''}` + " - " + user?.roles[0]?.name
                                            } </>} />
                                <Route path='/*' element={<>404 not found</>} />
                            </Route>
                        )}
                    </>
                ) : (
                    <Route path="/" element={<SignInPage />} />
                )}
                <Route path='/*' element={<>404 not found</>} />
            </>
        )
    );
    return (
        < RouterProvider router={router} />
    );
}

export default AppRouter