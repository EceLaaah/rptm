import Modal from "@material-ui/core/Modal";

export default function MyModal({ children, isOpen, className }) {
  return (
    <Modal
      disableEnforceFocus
      className="bg-acad-paper-80 w-screen h-screen flex justify-center items-center"
      open={isOpen}
    >
      <div
        className={`${className} bg-white overflow-auto shadow-lg rounded-sm scrollbar relative`}
      >
        {children}
      </div>
    </Modal>
  );
}
