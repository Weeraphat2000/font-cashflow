import React from "react";

function Modal({ title, children, onClose, width }) {
  return (
    <>
      {/* // top-0 left-0 right-0 bottom-0 = inset-0 */}
      <div className="fixed bg-white inset-0 opacity-70"></div>
      <div className="fixed inset-0 z-50">
        <div className="flex items-center justify-center min-h-full py-8 ">
          <div
            className="bg-white rounded-lg shadow-[0_0_20px_rgb(0,0,0,0.4) max-h-[calc(100vh-4rem)] flex flex-col border-gray-400 border"
            style={{ width: `${width}rem` }}
          >
            <div className="border-b p-4 flex justify-between items-center">
              <div className="invisible text-1xl p-2">&#10005;</div>
              <h5 className="text-3xl font-semibold">{title}</h5>
              <button className="text-1xl p-2" onClick={onClose}>
                &#10005;
              </button>
            </div>
            <div className="overflow-auto">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
