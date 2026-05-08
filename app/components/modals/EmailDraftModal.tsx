"use client";

import { useEffect, useState } from "react";
import Modal from "../ui/Modal";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  initialTo: string;
  initialSubject: string;
  initialBody: string;
  primaryLabel: string;
  footerNote: string;
  footerIcon?: string;
  onPrimary: () => void;
};

export default function EmailDraftModal({
  open,
  onClose,
  title,
  initialTo,
  initialSubject,
  initialBody,
  primaryLabel,
  footerNote,
  footerIcon = "auto_awesome",
  onPrimary,
}: Props) {
  const [to, setTo] = useState(initialTo);
  const [subject, setSubject] = useState(initialSubject);
  const [body, setBody] = useState(initialBody);

  useEffect(() => {
    if (open) {
      setTo(initialTo);
      setSubject(initialSubject);
      setBody(initialBody);
    }
  }, [open, initialTo, initialSubject, initialBody]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={title}
      footer={
        <>
          <div className="invite-expiry">
            <span className="ms" style={{ fontSize: 14 }}>
              {footerIcon}
            </span>
            {footerNote}
          </div>
          <div className="invite-actions">
            <button className="invite-cancel" onClick={onClose}>
              Cancel
            </button>
            <button
              className="btn-primary"
              onClick={onPrimary}
              style={{ fontSize: 13, padding: "9px 20px" }}
            >
              {primaryLabel}
            </button>
          </div>
        </>
      }
    >
      <div className="invite-field">
        <span className="invite-field-label">To</span>
        <input
          className="invite-field-value editable"
          type="email"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
      </div>
      <div className="invite-field">
        <span className="invite-field-label">Subject</span>
        <input
          className="invite-field-value editable"
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
      </div>
      <div className="invite-body">
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
    </Modal>
  );
}
