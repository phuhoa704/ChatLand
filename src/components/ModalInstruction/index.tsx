import React from "react";
import { Dialog } from "primereact/dialog";
import image from '../../assets/instruction/Capture.jpeg';
import image2 from '../../assets/instruction/Capture2.jpeg';
import image3 from '../../assets/instruction/Capture3.png';
import './style.scss';

interface ModalInstructionProps {
    visible: boolean
    closeModal: () => void
}

const ModalInstruction: React.FC<ModalInstructionProps> = ({ visible, closeModal }) => {
    return (
        <Dialog id="modal-instruction" header={'HƯỚNG DẪN TRA CỨU QUY HOẠCH BẰNG CHATLANDS'} draggable={false} visible={visible} style={{ width: '50vw' }} onHide={closeModal}>
            <div className="instruction-content">
                <h3 className="title">
                    1. Tra cứu quy hoạch
                </h3>
                <h4 className="subtitle">
                    1.1. Tra cứu bằng nhấn chuột trên bản đô
                </h4>
                <span className="content">
                    Nhấn chuột vào địa điểm cần tìm kiếm quy hoạch trên bản đồ, hệ thống sẽ tìm kiếm những quy hoạch gần nhất dựa vào tọa độ của điểm đó.
                </span>
                <h4 className="subtitle">
                    1.2. Tra cứu theo bộ lọc
                </h4>
                <span className="content">
                    Tra cứu theo bộ lọc giúp bạn tìm kiếm bản đồ theo tiêu đề, Tỉnh/Thành phố, Quận/Huyện, Xã/Phường, loại quy hoạch. 
                    Ngoài ra, có thể tìm kiếm theo vị trí tọa độ trên Google Maps, ở mỗi vị trí chúng ta có thể lấy được cặp tọa độ lat,long 
                    (có định dạng: <span className="font-semibold">10.039678, 105.750170</span>). Sao chép và dán tọa độ này và ô tìm kiếm của Chatland
                    để xác định vị trí của quy hoạch gần đó.
                </span>
                <div className="flex justify-content-center">
                    <img src={image2} alt="" className="w-full" />
                </div>
                <h3 className="title">
                    2. Xem quy hoạch
                </h3>
                <span>Chọn bản đồ cần xem quy hoạch trong danh sách bên trái.</span>
                <div className="flex justify-content-center">
                    <img src={image} alt="" className="w-full"/>
                </div>
                <h3 className="title">
                    3. Chế độ lồng ghép
                </h3>
                <span className="content">
                    Chatland cung cấp chế độ lồng ghép bản đồ để thuận tiện cho việc xem quy hoạch. Nhấn chuột vào nút chế độ xem ở góc trái màn hình để chuyển đổi giữa
                    chế độ xem đơn và lồng ghép. Sau đó, chọn bản đồ cần lồng ghép trong danh sách bên trái.
                </span>
                <div className="flex justify-content-center">
                    <img src={image3} alt="" className="w-full"/>
                </div>
            </div>
        </Dialog>
    );
}

export default ModalInstruction;