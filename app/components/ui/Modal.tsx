"use client";

import { useEffect, type ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  title: string;
  titleSub?: string;
  /** Overrides the default title node when provided. Useful for two-line titles. */
  headerLeft?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  /** Passed through to .invite-modal inline style for per-modal width tweaks. */
  modalStyle?: React.CSSProperties;
};

export default function Modal({
  open,
  onClose,
  title,
  titleSub,
  headerLeft,
  children,
  footer,
  modalStyle,
}: Props) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <div
      className={`invite-overlay${open ? " open" : ""}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      aria-hidden={!open}
    >
      <div
        className="invite-modal"
        style={modalStyle}
        role="dialog"
        aria-modal="true"
      >
        <div className="invite-modal-head">
          {headerLeft ?? (
            <div>
              <span className="invite-modal-title">{title}</span>
              {titleSub && (
                <div
                  style={{
                    fontSize: 12,
                    color: "var(--text-light)",
                    marginTop: 2,
                  }}
                >
                  {titleSub}
                </div>
              )}
            </div>
          )}
          <button
            className="invite-close"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="ms" style={{ fontSize: 16 }}>
              close
            </span>
          </button>
        </div>
        {children}
        {footer && <div className="invite-modal-foot">{footer}</div>}
      </div>
    </div>
  );
}
