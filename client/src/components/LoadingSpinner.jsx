import React from 'react'
import AppLayout from './Layout/AppLayout'

const LoadingSpinner = () => {
    return (
        <AppLayout>
            <div className='flex items-center justify-center min-h-screen'>
                <div
                    className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-black border-r-transparent"
                    role="status">
                </div>
            </div>
        </AppLayout>
    )
}

export default LoadingSpinner