import React, { lazy, Suspense, useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoadingSpinner from '../components/LoadingSpinner';
import LoginForm from '../pages/LoginForm';
import Invoice from '../pages/Invoice';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const ProductsList = lazy(() => import('../pages/ProductsList'));
const SalesList = lazy(() => import('../pages/SalesList'));
const NewSale = lazy(() => import('../pages/NewSale'));

const Routing = () => {
    const user = localStorage.getItem('user');
    const navigate = useNavigate();

    useEffect(() => {
        if (!user && window.location.pathaname !== '/login') {
            navigate('/login')
        } else if (user && window.location.pathname === '/login') {
            navigate('/');
        }
    }, [user, navigate])

    return (
        <div>
            <Suspense fallback={<LoadingSpinner />}>
                <Routes>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/products" element={<ProductsList />} />
                    <Route path="/sales" element={<SalesList />} />
                    <Route path="/new-sale" element={<NewSale />} />
                    <Route path="/invoice/:saleId" element={<Invoice />} />
                </Routes>
            </Suspense>
        </div>
    )
}

export default Routing