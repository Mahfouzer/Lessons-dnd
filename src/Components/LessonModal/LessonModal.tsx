import { ReactNode } from "react";
import ReactModal from "react-modal";

interface LessonModalProps{
  isLessonModalOpen:boolean;
  children:ReactNode
}

export default function LessonModal({ isLessonModalOpen, children }: LessonModalProps) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{ content: { height: "475px", maxWidth:"400px",inset: "20% calc(50% - 200px)" } }}
      shouldFocusAfterRender
      isOpen={isLessonModalOpen}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}
