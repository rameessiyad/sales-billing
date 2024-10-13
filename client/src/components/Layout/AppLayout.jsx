import React from 'react';
import SideBar from './SideBar';
import Header from './Header';

const AppLayout = ({ children }) => {
    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            <div className="w-64 bg-gray-100 border-r border-gray-200 h-screen fixed">
                <SideBar />
            </div>

            <div className="flex-1 ml-64">
                {/* Header */}
                <Header />

                {/* Main Content */}
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}

export default AppLayout;
