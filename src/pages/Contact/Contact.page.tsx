import React from 'react';
import './ContactPage.css';

const ContactPage: React.FC = () => {
    return (
        <div className="contact-page">
            {/* Sekcja z mapą na górze */}
            <div className="map-section">
                <h2>Znajdź nas</h2>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4293.162317616383!2d20.858539062322965!3d51.22365858111671!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4718489bc14d641f%3A0x476872aad38e020!2zS2_Fm2Npw7PFgiDFm3cuIFp5Z211bnRhIHcgU3p5ZMWCb3djdQ!5e0!3m2!1spl!2spl!4v1746563359486!5m2!1spl!2spl"
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>

            {/* Sekcja z informacjami kontaktowymi w jednym wierszu */}
            <div className="container">
                <div className="contact-info-section">
                    <div className="contact-info-row">
                        {/* Karta z adresem */}
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="pi pi-map-marker"></i>
                            </div>
                            <h3>Adres</h3>
                            <a href="https://maps.app.goo.gl/pKLYNJrhFLV9Xd9r8">ul. Zakościelna 13, 26-500 Szydłowiec</a>
                        </div>

                        {/* Karta z telefonem */}
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="pi pi-phone"></i>
                            </div>
                            <h3>Telefon</h3>
                            <a href='tel:+48574922900'>+48 574 922 900</a>
                        </div>

                        {/* Karta z adresem email */}
                        <div className="info-card">
                            <div className="info-icon">
                                <i className="pi pi-envelope"></i>
                            </div>
                            <h3>Email</h3>
                            <a href='mailto:parafiaszydlowiec@op.pl'>parafiaszydlowiec@op.pl</a>
                        </div>
                    </div>
                </div>

                {/* Sekcja z informacjami o darowiznych */}
                <div className="donation-section">
                    <div className="donation-card">
                        <div className="donation-header">
                            <h3>Możesz złożyć dobrowolną ofiarę na funkcjonowanie naszej parafii i na utrzymanie świątyni.</h3>
                        </div>

                        <div className="donation-content">
                            <p>Możesz to zrobić bezgotówkowo, na różne sposoby:</p>

                            <div className="donation-method">
                                <h4>1 sposób:</h4>
                                <p>Zrób przelew na konto bankowe parafii</p>
                                <div className="parish-info">
                                    <p>Parafia Rzymsko - Katolicka</p>
                                    <p>p.w. Św. Zygmunta</p>
                                    <p>ul. Zakoielna 13, 26-500 Szydłowiec</p>
                                </div>
                                <div className="account-number">
                                    <strong>13 9129 0001 0099 0900 2380 0001</strong>
                                </div>
                                <div className="transfer-title">
                                    <strong>Tytuł: Darowizna na cele kultu religijnego</strong>
                                </div>
                            </div>

                            <div className="donation-method">
                                <h4>2 sposób:</h4>
                                <p>Zrób stałą dyspozycję przelewu określonej kwoty na cele kultu religijnego.</p>
                            </div>

                            <div className="donation-footer">
                                <p><em>Bóg zapłać za wszystkie, nawet najdrobniejsze, ofiary na rzecz naszej parafii.</em></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;