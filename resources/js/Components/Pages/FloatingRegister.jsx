import { Link } from '@inertiajs/react';
import React, { useState, useEffect, useRef } from 'react';

const FloatingRegister = () => {
    const routeRegister = () => {
        window.location.href = '/register';
    };

    return (
        <div className="floating-register-container">
            <Link href="/register">
                <div className="register-button">
                    <img src="/landing/images/icon_register.png" alt="WhatsApp Icon" className="whatsapp-icon-image" style={{ width: '30px', height: '30px' }} />
                </div>
            </Link>
        </div>
    );
};

export default FloatingRegister;