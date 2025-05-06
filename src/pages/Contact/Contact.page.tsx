import React from 'react';

import './ContactPage.css';


const ContactPage: React.FC = () => {


    return (
        <div className="contact-page">
            <div className="map-container">
                <h2>Znajdź nas</h2>
                <div className="map-placeholder">
                    {/* Tutaj można zintegrować Google Maps lub inną mapę */}
                    <div className="map-overlay">
                        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4293.162317616383!2d20.858539062322965!3d51.22365858111671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4718489bc14d641f%3A0x476872aad38e020!2zS2_Fm2Npw7PFgiDFm3cuIFp5Z211bnRhIHcgU3p5ZMWCb3djdQ!5e0!3m2!1spl!2spl!4v1746563359486!5m2!1spl!2spl" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
                    </div>
                </div>
            </div>

            <div className="container">
                <div className="contact-content">
                    <div className="info-icon">
                        <i className="icon-location"></i>
                    </div>
                    <h3>Adres</h3>
                    <p>ul. Zakościelna 13</p>
                    <p>26-500 Szydłowiec</p>

                    <div className="info-icon">
                        <i className="icon-phone"></i>
                    </div>
                    <h3>Telefon</h3>
                    <p>+48 574 922 900</p>

                    <div className="info-icon">
                        <i className="icon-email"></i>
                    </div>
                    <h3>Email</h3>
                    <p>swzygmuntszydlowiec@interia.pl</p>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;