import React from 'react';

import "./Dialog.css";

function Dialog({ title, text, onConfirm, onCancel, confirmLabel, cancelLabel }) {
    return (
        <div className="dialog">
            <div className="dialog__bg" onClick={onCancel} />
            <div className="dialog__content">
                <h2 className="dialog__title">{title}</h2>
                <p className="dialog__text">{text}</p>
                <div className="dialog__actions">
                    {cancelLabel && (
                        <button className="dialog__actions__item btn--secondary" onClick={onCancel}>{cancelLabel}</button>
                    )}
                    {confirmLabel && (
                        <button className="dialog__actions__item btn--primary" onClick={onConfirm}>{confirmLabel}</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Dialog;