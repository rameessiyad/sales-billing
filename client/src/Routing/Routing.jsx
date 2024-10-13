import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const LoginForm = lazy(() => import('../pages/LoginForm'));

const Routing = () => {
    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Routing