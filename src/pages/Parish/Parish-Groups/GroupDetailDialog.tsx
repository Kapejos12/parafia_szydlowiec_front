import React from "react";
import { Dialog } from "primereact/dialog";
import { Group } from "../../../utils/types";

import './GroupDetailDialogStyles.css';
import MarkdownComponent from "../../../components/Markdown.component/Markdown.component";

interface GroupDetailDialogProps {
    group: Group | null;
    visible: boolean;
    onHide: () => void;
}

const GroupDetailDialog: React.FC<GroupDetailDialogProps> = ({ group, visible, onHide }) => {
    if (!group) return null;

    return (
        <Dialog
            visible={visible}
            onHide={onHide}
            className="group-dialog"
            style={{ width: '90vw', maxWidth: '900px' }}
            modal
            draggable={false}
            resizable={false}
        >
            <div className="group-dialog__content">
                {/* Status grupy */}
                <div className={`group-dialog__status group-dialog__status--${group.active ? 'active' : 'inactive'}`}>
                    <div className="group-dialog__status-icon">
                        <i className={`pi ${group.active ? 'pi-check-circle' : 'pi-pause-circle'}`}></i>
                    </div>
                    <span className="group-dialog__status-text">
                        Grupa {group.active ? 'aktywna' : 'zawieszona'}
                    </span>
                </div>

                {/* Opis */}
                <div className="group-dialog__section">
                    <h3 className="group-dialog__section-title">Opis grupy</h3>
                    <div className="group-dialog__description">
                        <MarkdownComponent markdown={group.description} />
                    </div>
                </div>

                {/* Informacje podstawowe */}
                <div className="group-dialog__info-grid">
                    {/* Lewa kolumna */}
                    <div className="group-dialog__info-column">
                        <h4 className="group-dialog__column-title">Informacje podstawowe</h4>

                        {group.leader && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-user group-dialog__info-icon group-dialog__info-icon--primary"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Lider:</strong> {group.leader}
                                </span>
                            </div>
                        )}

                        {group.memberCount && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-users group-dialog__info-icon group-dialog__info-icon--primary"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Liczba członków:</strong> {group.memberCount}
                                </span>
                            </div>
                        )}

                        {group.ageGroup && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-calendar group-dialog__info-icon group-dialog__info-icon--primary"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Grupa wiekowa:</strong> {group.ageGroup}
                                </span>
                            </div>
                        )}

                        {group.establishedDate && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-clock group-dialog__info-icon group-dialog__info-icon--primary"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Powstała:</strong> {new Date(group.establishedDate).getFullYear()}
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Prawa kolumna */}
                    <div className="group-dialog__info-column">
                        <h4 className="group-dialog__column-title">Spotkania</h4>

                        {group.meetingDay && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-calendar group-dialog__info-icon group-dialog__info-icon--success"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Dzień:</strong> {group.meetingDay}
                                </span>
                            </div>
                        )}

                        {group.meetingTime && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-clock group-dialog__info-icon group-dialog__info-icon--success"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Godzina:</strong> {group.meetingTime}
                                </span>
                            </div>
                        )}

                        {group.meetingLocation && (
                            <div className="group-dialog__info-item">
                                <i className="pi pi-map-marker group-dialog__info-icon group-dialog__info-icon--success"></i>
                                <span className="group-dialog__info-text">
                                    <strong>Miejsce:</strong> {group.meetingLocation}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Kontakt */}
                {group.contactEmail && (
                    <div className="group-dialog__section">
                        <h3 className="group-dialog__section-title">Kontakt</h3>
                        <div className="group-dialog__contact-grid">
                            <div className="group-dialog__contact-item">
                                <i className="pi pi-envelope group-dialog__contact-icon group-dialog__contact-icon--email"></i>
                                <a
                                    href={`mailto:${group.contactEmail}`}
                                    className="group-dialog__contact-link"
                                >
                                    {group.contactEmail}
                                </a>
                            </div>

                            {group.contactPhone && (
                                <div className="group-dialog__contact-item">
                                    <i className="pi pi-phone group-dialog__contact-icon group-dialog__contact-icon--phone"></i>
                                    <a
                                        href={`tel:${group.contactPhone}`}
                                        className="group-dialog__contact-link"
                                    >
                                        {group.contactPhone}
                                    </a>
                                </div>
                            )}

                            {group.website && (
                                <div className="group-dialog__contact-item">
                                    <i className="pi pi-globe group-dialog__contact-icon group-dialog__contact-icon--website"></i>
                                    <a
                                        href={group.website}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group-dialog__contact-link"
                                    >
                                        Strona internetowa
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Akcje */}
                <div className="group-dialog__actions">
                    <button
                        className="group-dialog__button group-dialog__button--secondary"
                        onClick={onHide}
                    >
                        <i className="pi pi-times"></i>
                        <span>Zamknij</span>
                    </button>
                    {group.contactEmail != null && (
                        <button
                            className="group-dialog__button group-dialog__button--primary"
                            onClick={() => window.open(`mailto:${group.contactEmail}`, '_blank')}
                        >
                            <i className="pi pi-envelope"></i>
                            <span>Napisz do nas</span>
                        </button>
                    )}
                </div>
            </div>
        </Dialog>
    );
};

export default GroupDetailDialog;