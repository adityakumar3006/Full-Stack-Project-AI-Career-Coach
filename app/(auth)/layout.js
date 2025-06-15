import React from 'react'


// sign in and sign up will render here 
const AuthLayout = ({ children }) => {
    return (
        <div className='flex justify-center pt-40'>
            {children}
        </div>
    )
}

export default AuthLayout
