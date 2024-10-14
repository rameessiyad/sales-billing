import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';
import LoginForm from '../pages/LoginForm';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ProductsList = lazy(() => import('../pages/ProductsList'));
const SalesList = lazy(() => import('../pages/SalesList'));

const Routing = () => {
    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/sales" element={<SalesList />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Routing