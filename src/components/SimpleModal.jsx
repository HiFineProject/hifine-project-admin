// SimpleModal.js
import PropTypes from "prop-types";
function SimpleModal({ isOpen, onClose, onConfirm, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ backgroundColor: "#fff", padding: 20 }}>
        {children}
        <div className="flex justify-center gap-20 my-5 ">
          <button
            className="bg-green-900 text-white w-1/4 rounded-2xl hover:bg-green-400 hover:text-black"
            onClick={onConfirm}
          >
            OK
          </button>
          <button
            className="bg-rose-900 text-white w-1/4 rounded-2xl hover:bg-rose-400 hover:text-black"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
SimpleModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};
export default SimpleModal;
