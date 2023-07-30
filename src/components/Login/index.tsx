import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useAppDispatch } from "../../redux/hook";
import { Form, Field } from 'react-final-form';
import { Login } from "../../redux/apis/Auth";
import { useNavigate } from "react-router-dom";
import { router } from "../../configs/router";
import './style.scss';

interface LoginProps {
    visible: boolean,
    onHide: () => void
    openSignup: () => void
}

interface FormValues {
    Phone: string,
    Password: string
}

const LoginModal: React.FC<LoginProps> = ({ visible, onHide, openSignup }) => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState<boolean>(false);
    const onSubmit = async(data: FormValues, form: any) => {
        setLoading(true);
        let rs: any = await dispatch(Login({
            Phone: data.Phone,
            Password: data.Password
        }))
        if(rs.payload.action) {
            setLoading(false);
            onHide();
        }
    }
    return (
        <Dialog id="modal-login" visible={visible} draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw' }} style={{ width: '50vw' }}>
            <div className="text-center mb-5">
                <div className="text-900 text-2xl font-medium">COPCAT</div>
                <span className="text-600 font-medium line-height-3">Chưa có tài khoản?</span>
                <a className="font-medium no-underline ml-2 text-blue-500 cursor-pointer" onClick={openSignup}>Đăng ký ngay!</a>
            </div>

            <Form onSubmit={onSubmit} initialValues={{ Phone: '', Password: '' }} render={({ handleSubmit }) => (
                <form onSubmit={handleSubmit} className="p-fluid">
                    <Field name="Phone" render={({ input, meta }) => (
                        <div className="field">
                            <label htmlFor="Phone" className="block text-900 font-medium mb-2">Số điện thoại</label>
                            <InputText id="Phone" {...input} type="text" placeholder="Số điện thoại" className="w-full mb-3" />
                        </div>
                    )} />
                    <Field name="Password" render={({ input, meta }) => (
                        <div className="field">
                            <label htmlFor="Password" className="block text-900 font-medium mb-2">Mật khẩu</label>
                            <InputText id="Password" {...input} type="password" placeholder="Mật khẩu" className="w-full mb-3" />
                        </div>
                    )} />
                    <div className="flex align-items-center justify-content-between mb-6">
                        <a className="font-medium no-underline ml-2 text-blue-500 text-right cursor-pointer">Quên mật khẩu?</a>
                    </div>
                    <Button type="submit" loading={loading} label="Đăng nhập" icon="pi pi-user" className="w-full" />
                </form>
            )} />
        </Dialog >
    );
}

export default LoginModal;