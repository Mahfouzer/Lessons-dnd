import ReactModal from "react-modal";

export default function LessonModal({ isLessonModalOpen, children }: any) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{ content: { height: "max-content", inset: "30%" } }}
      shouldFocusAfterRender
      isOpen={isLessonModalOpen}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}
