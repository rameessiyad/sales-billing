import React, { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const LoginForm = lazy(() => import('../pages/LoginForm'));
const ProductsList = lazy(() => import('../pages/ProductsList'));
const SalesList = lazy(() => import('../pages/SalesList'));
const NewSale = lazy(() => import('../pages/NewSale'));

const Routing = () => {
    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/sales" element={<SalesList />} />
                    <Route path="/new-sale" element={<NewSale />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Routing