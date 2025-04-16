import React from 'react'

function Loader() {
    return (
        <div
            className="min-vh-100 d-flex justify-content-center align-items-center"
            style={{
                zIndex: 9999,
                backdropFilter: 'blur(5px)'
            }}
        >
            <div className="text-center">
                <div className="loader"></div>
            </div>
        </div >
    )
}

export default Loader