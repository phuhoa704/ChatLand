import React from "react";
import { Dialog } from 'primereact/dialog';
import { DataView } from 'primereact/dataview';

interface ModalPlanningHistoryProps {
    visible: boolean
    closeModal: () => void
}
 
const ModalPlanningHistory: React.FC<ModalPlanningHistoryProps> = ({ visible, closeModal }) => {
    return ( 
        <Dialog id="modal-planning-history" header={'Lịch sử xem bản đồ'} draggable={false} visible={visible} style={{ width: '50vw' }} onHide={closeModal}>

        </Dialog>
    );
}
 
export default ModalPlanningHistory;