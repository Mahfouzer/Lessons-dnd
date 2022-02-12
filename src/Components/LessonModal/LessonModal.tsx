import ReactModal from "react-modal";

export default function LessonModal({ isLessonModalOpen, children }: any) {
  return (
    <ReactModal
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      style={{ content: { height: "50%", maxWidth:"400px",inset: "20% calc(50% - 200px)" } }}
      shouldFocusAfterRender
      isOpen={isLessonModalOpen}
      ariaHideApp={false}
    >
      {children}
    </ReactModal>
  );
}
