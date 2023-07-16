import React, { useEffect, useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { Form, Field } from 'react-final-form';
import { Password } from 'primereact/password';
import { Dialog } from 'primereact/dialog';
import { Dropdown } from 'primereact/dropdown';
import { useAppDispatch, useAppSelector } from '../../redux/hook';
import { getDistricts, getProvinces } from '../../redux/apis/Address';
import { Button } from 'primereact/button';
import { InputTextarea } from 'primereact/inputtextarea';
import { Divider } from 'primereact/divider';
import OTPForm from '../OTP';
import './style.scss';

interface SignupDialogProps {
    visible: boolean
    onHide: () => void
}

interface FormValues {
    name: string
    phone: string
    email: string
    province: string | number
    district: string | number
    address: string
    password: string
}

const SignupDialog: React.FC<SignupDialogProps> = ({ visible, onHide }) => {
    const dispatch = useAppDispatch();
    const provinces = useAppSelector(state => state.address.provinces);
    const districts = useAppSelector(state => state.address.districts);
    const [otpDialog, setOtpDialog] = useState<boolean>(false);
    useEffect(() => {
        dispatch(getProvinces([]));
    }, [])
    const onSubmit = (data: FormValues, form: any) => {
        console.log(data);
        setOtpDialog(true);
    }
    const validate = (data: FormValues) => {
        let errors: any = {};

        if (!data.name) {
            errors.name = 'Vui lòng nhập họ và tên.';
        }

        if (!data.email) {
            errors.email = 'Vui lòng nhập email.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Email không chính xác. Ví dụ: example@email.com';
        }

        if (!data.phone) {
            errors.phone = 'Vui lòng nhập số điện thoại.'
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(data.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ.'
        }

        if (!data.password) {
            errors.password = 'Vui lòng nhập mật khẩu.';
        }

        return errors;
    };
    const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta: any) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const passwordHeader = <h6>Nhập mật khẩu</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Điều kiện</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>Chứa ít nhất 1 chữ thường</li>
                <li>Chứa ít nhất 1 chữ hoa</li>
                <li>Chứa ít nhất 1 chữ số</li>
                <li>Tối thiểu 8 ký tự</li>
            </ul>
        </React.Fragment>
    )
    return (
        <>
        <OTPForm onHide={() => setOtpDialog(false)} open={otpDialog} />
        <Dialog visible={visible} header={<h3 className="text-center">Đăng ký</h3>} draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw' }} style={{ width: '40vw' }}>
            <div className="form-signup">
                <div className="card">
                    <Form
                        onSubmit={onSubmit}
                        initialValues={{ name: '', email: '', password: '', phone: '', address: '', district: null, province: null }}
                        validate={validate}
                        render={({ handleSubmit }) => (
                            <form onSubmit={handleSubmit} className="p-fluid">
                                <Field name="name" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="name" {...input} autoFocus className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="name" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Họ và tên*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="email" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label p-input-icon-right">
                                            <i className="pi pi-envelope" />
                                            <InputText id="email" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="email" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Email*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="phone" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputText id="phone" {...input} className={classNames({ 'p-invalid': isFormFieldValid(meta) })} />
                                            <label htmlFor="phone" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Số điện thoại*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="password" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Password id="password" {...input} toggleMask className={classNames({ 'p-invalid': isFormFieldValid(meta) })} header={passwordHeader} footer={passwordFooter} />
                                            <label htmlFor="password" className={classNames({ 'p-error': isFormFieldValid(meta) })}>Mật khẩu*</label>
                                        </span>
                                        {getFormErrorMessage(meta)}
                                    </div>
                                )} />
                                <Field name="province" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="province" {...input} onChange={(e) => {
                                                input.onChange(e);
                                                dispatch(getDistricts(e.value.id))
                                            }} options={provinces} optionLabel="name" />
                                            <label htmlFor="province">Tỉnh/Thành phố</label>
                                        </span>
                                    </div>
                                )} />
                                <Field name="district" render={({ input, meta }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <Dropdown id="district" {...input} options={districts} optionLabel="name" />
                                            <label htmlFor="district">Quận/Huyện</label>
                                        </span>
                                    </div>
                                )} />
                                <Field name="address" render={({ input }) => (
                                    <div className="field">
                                        <span className="p-float-label">
                                            <InputTextarea id="address" {...input} />
                                            <label htmlFor="address">Địa chỉ</label>
                                        </span>
                                    </div>
                                )} />
                                <Button type="submit" label="Đăng ký" className="mt-2" />
                            </form>
                        )} />
                </div>
            </div>
        </Dialog>
        </>
    );
}

export default SignupDialog;