import React from "react";
import { Modal as Mod } from "antd";

const ReviewModal = ({ isOpen, handleCancel, handleSubmit, width, children }) => {
  return (
    <Mod
      width={width}
      footer={null}
      open={isOpen}
      onOk={handleSubmit}
      onCancel={handleCancel}
    >
      {children}
      <div className="flex justify-end gap-[20px] mt-[30px]">
        <button
          className="border-indigo-600 border-[1px] py-[8px] px-[20px] rounded-[4px] text-indigo-600"
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button
          className="bg-indigo-600 py-[8px] px-[20px] rounded-[4px] text-white"
          onClick={handleSubmit}
        >
          Save
        </button>
      </div>
    </Mod>
  );
};

export default ReviewModal;
