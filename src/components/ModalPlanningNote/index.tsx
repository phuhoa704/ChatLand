import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { data } from "./data";
import './style.scss';
import { removeVietnameseTones } from "../../utils/string";

interface ModalPlanningNoteProps {
    visible: boolean
    closeModal: () => void
}

const ModalPlanningNote: React.FC<ModalPlanningNoteProps> = ({ visible, closeModal }) => {
    const [key, setKey] = useState<string>('');
    const [value, setValue] = useState<string>('');
    return (
        <Dialog id="modal-planning-note" header={'Chú thích bản đồ'} draggable={false} visible={visible} style={{ width: '45vw' }} onHide={closeModal}>
            <div className="grid">
                <div className="col-8">
                    <span className="font-semibold">Loại ký hiệu</span>
                </div>
                <div className="col-4">
                    <span className="font-semibold">Ký hiệu</span>
                </div>
                <div className="col-8">
                    <InputText type="text" className="p-inputtext-sm" onChange={(e) => setValue(e.target.value)} placeholder="Tìm loại ký hiệu" />
                </div>
                <div className="col-4">
                    <InputText type="text" className="p-inputtext-sm w-full" onChange={(e) => setKey(e.target.value)} placeholder="Tìm ký hiệu" />
                </div>
                {data.filter(item => {
                    let checkKey = removeVietnameseTones(item.Key).toLocaleLowerCase().includes(removeVietnameseTones(key).toLocaleLowerCase());
                    let checkValue = removeVietnameseTones(item.Value).toLocaleLowerCase().includes(removeVietnameseTones(value).toLocaleLowerCase());
                    if (checkKey && checkValue) {
                        return true;
                    }
                }).map(item => (
                    <>
                        <div className="col-8">
                            <span>{item.Value}</span>
                        </div>
                        <div className="col-4">
                            <span>{item.Key}</span>
                        </div>
                    </>
                ))}
            </div>
        </Dialog>
    );
}

export default ModalPlanningNote;