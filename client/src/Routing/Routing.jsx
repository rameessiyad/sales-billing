import React, { lazy } from 'react'
import { Route, Routes } from 'react-router-dom'
const Dashboard = lazy(() => import('../pages/Dashboard'));

const Routing = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </>
    )
}

export default Routing