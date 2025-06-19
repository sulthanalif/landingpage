import React, { useState, useEffect, useRef } from 'react';

const FloatingWhatsApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    const contacts = {
        marketing: {
            phone: '+62811-8880-678',
            email: 'marketing@lscs.sch.id',
            address: 'Jalan Taman Surya 5 Blok EE2 No.20-27, RT.2/RW.3, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830',
        },
        info: {
            phone: '+62813-1060-2143',
            email: 'info@lscs.sch.id',
            address: 'Jalan Taman Surya 5 Blok EE2 No.20-27, RT.2/RW.3, Pegadungan, Kec. Kalideres, Kota Jakarta Barat, Daerah Khusus Ibukota Jakarta 11830',
        },
    };
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getWhatsAppLink = (phoneNumber, message = '') => {
        const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        return `https://wa.me/${cleanedPhoneNumber}?text=${encodeURIComponent(message)}`;
    };

    return (
        <div className="floating-whatsapp-container" ref={menuRef}>
            <div className="whatsapp-button" onClick={toggleMenu}>
                <img src="/landing/images/icon_wa.png" alt="WhatsApp Icon" className="whatsapp-icon-image" style={{ width: '35px', height: '35px' }} />
            </div>

            {isOpen && (
                <div className="whatsapp-options">
                    <div className="option-item" onClick={() => window.open(getWhatsAppLink(contacts.marketing.phone, 'Halo, saya ingin bertanya tentang Marketing.'), '_blank')}>
                        <span className="option-label">Admission</span>
                        <span className="option-contact">{contacts.marketing.phone}</span>
                    </div>
                    <div className="option-item" onClick={() => window.open(getWhatsAppLink(contacts.info.phone, 'Halo, saya ingin bertanya tentang Info Umum.'), '_blank')}>
                        <span className="option-label">Info</span>
                        <span className="option-contact">{contacts.info.phone}</span>
                    </div>
                    {/* <div className="option-item" onClick={() => window.open(`mailto:${contacts.marketing.email}`, '_blank')}>
                        <span className="option-label">Email Marketing</span>
                        <span className="option-contact">{contacts.marketing.email}</span>
                    </div> */}
                </div>
            )}
        </div>
    );
};

export default FloatingWhatsApp;