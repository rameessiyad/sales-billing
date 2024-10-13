import React from 'react'
import SideBar from './SideBar'
import Header from './Header'

const AppLayout = ({ children }) => {
    return (
        <div>
            <SideBar />
            <div>
                <Header />
            </div>
            {children}
        </div>
    )
}

export default AppLayout