"use client";

import { useTransition, animated } from "@react-spring/web";
import { X } from "lucide-react";
import { useEffect } from "react";

export default function SpringModal({ isOpen, onClose, children, title }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const transitions = useTransition(isOpen, {
    from: { opacity: 0, scale: 0.85, y: 50 },
    enter: { opacity: 1, scale: 1, y: 0 },
    leave: { opacity: 0, scale: 0.85, y: 50 },
    config: { tension: 280, friction: 22 },
  });

  const overlayTransitions = useTransition(isOpen, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
    config: { duration: 200 },
  });

  return (
    <>
      {overlayTransitions(
        (styles, item) =>
          item && (
            <animated.div
              style={styles}
              onClick={onClose}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
            >
              {transitions(
                (modalStyles, modalItem) =>
                  modalItem && (
                    <animated.div
                      style={modalStyles}
                      onClick={(e) => e.stopPropagation()}
                      className="glass-strong rounded-2xl p-6 md:p-8 max-w-md w-full shadow-2xl border border-white/10"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-display font-bold text-2xl gradient-text">
                          {title}
                        </h3>
                        <button
                          onClick={onClose}
                          className="p-2 hover:bg-white/10 rounded-lg transition"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                      {children}
                    </animated.div>
                  )
              )}
            </animated.div>
          )
      )}
    </>
  );
}
