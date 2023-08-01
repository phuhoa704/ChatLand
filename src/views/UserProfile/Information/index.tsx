import { useState } from 'react';
import { BreadCrumb } from 'primereact/breadcrumb';
import { router } from '../../../configs/router';
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { Divider } from 'primereact/divider';
import { useAppSelector } from '../../../redux/hook';
import { Image } from 'primereact/image';
import { FileUpload, FileUploadHandlerEvent, FileUploadUploadEvent } from 'primereact/fileupload';
import avatarDefault from '../../../assets/avatar-default.jpg';
import { classNames } from 'primereact/utils';
import { InputTextarea } from 'primereact/inputtextarea';
import './style.scss';

interface FormValues {
    username: string
}
interface FormValuesEmail {
    email: string
}
interface FormValuesPhone {
    phone: string
}
interface FormValuesAddress {
    address: string
}
const UserInformation = () => {
    const [activeField, setActiveField] = useState<'username' | 'email' | 'phone' | '' | 'address'>('');
    const [userTypeVal, setUserTypeVal] = useState<'KH' | 'NDT' | 'CD' | 'MG'>('KH');
    const userTypes = [
        { name: 'Khách hàng', code: 'KH' },
        { name: 'Nhà đầu tư', code: 'NDT' },
        { name: 'Chủ đất', code: 'CD' },
        { name: 'Môi giới', code: 'MG' },
    ]
    const user = useAppSelector(state => state.auth.user);
    const [avatarUrl, setAvatarUrl] = useState<any>();
    const onSubmitUsername = (data: FormValues, form: any) => {

    }
    const onSubmitEmail = (data: FormValuesEmail, form: any) => {

    }
    const onSubmitPhone = (data: FormValuesPhone, form: any) => {

    }
    const onSubmitAddress = (data: FormValuesAddress, form: any) => {

    }
    const isFormFieldValid = (meta: any) => !!(meta.touched && meta.error);
    const getFormErrorMessage = (meta: any) => {
        return isFormFieldValid(meta) && <small className="p-error">{meta.error}</small>;
    };
    const validateEmail = (data: FormValuesEmail) => {
        let errors: any = {};

        if (!data.email) {
            errors.email = 'Vui lòng nhập email.';
        }
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data.email)) {
            errors.email = 'Email không chính xác. Ví dụ: example@email.com';
        }

        return errors;
    };
    const validatePhone = (data: FormValuesPhone) => {
        let errors: any = {};

        if (!data.phone) {
            errors.phone = 'Vui lòng nhập số điện thoại.'
        } else if (!/(84|0[3|5|7|8|9])+([0-9]{8})\b/g.test(data.phone)) {
            errors.phone = 'Số điện thoại không hợp lệ.'
        }

        return errors;
    };

    const customBase64Uploader = async (event: FileUploadHandlerEvent) => {
        // convert file to base64 encoded
        const file: any = event.files[0];
        const reader = new FileReader();
        let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(blob);

        reader.onloadend = function () {
            const base64data = reader.result;
            setAvatarUrl(base64data)
        };
    };
    return (
        <section className="user-information">
            <div className="user-information-container">
                <BreadCrumb model={[{ label: 'Thông tin cá nhân' }]} home={{ label: 'Tài khoản', url: router.USER, icon: 'pi pi-home' }} />
                <h3 className='text-left'>Thông tin cá nhân</h3>
                <div className="user-information-form">
                    <div className="grid">
                        <div className="col-12 md:col-8">
                            <div className="grid">
                                <div className="col-12">
                                    {(activeField === 'username') ?
                                        <Form onSubmit={onSubmitUsername} initialValues={{ username: '' }} render={({ handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="p-fluid">
                                                <Field name="username" render={({ input, meta }) => (
                                                    <div className="field">
                                                        <div className="flex justify-content-between">
                                                            <label htmlFor="username" className="block text-900 font-medium mb-2 text-left">Họ và tên</label>
                                                            <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('')}>Huỷ</span>
                                                        </div>
                                                        <InputText id="username" {...input} type="text" placeholder="Họ và tên" className="w-full mb-3" />
                                                    </div>
                                                )} />
                                                <div className="grid">
                                                    <div className="col-2 text-left">
                                                        <Button type="submit" label="Lưu" size='small' />
                                                    </div>
                                                </div>
                                            </form>
                                        )} />
                                        :
                                        <div className="flex justify-content-between align-items-center">
                                            <div className="info-content">
                                                <p className='font-medium text-left'>Tên người dùng</p>
                                                <p className='font-light text-left'>{user.Username}</p>
                                            </div>
                                            <div className="info-action">
                                                <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('username')}>Chỉnh sửa</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <Divider />
                                <div className="col-12">
                                    {(activeField === 'email') ?
                                        <Form onSubmit={onSubmitEmail} validate={validateEmail} initialValues={{ email: '' }} render={({ handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="p-fluid">
                                                <Field name="email" render={({ input, meta }) => (
                                                    <div className="field text-left">
                                                        <div className="flex justify-content-between">
                                                            <label htmlFor="email" className={`block text-900 font-medium mb-2 text-left ${classNames({ 'p-error': isFormFieldValid(meta) })}`}>Địa chỉ email</label>
                                                            <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('')}>Huỷ</span>
                                                        </div>
                                                        <InputText id="email" {...input} placeholder="Địa chỉ emil" className={`w-full mb-3 ${classNames({ 'p-invalid': isFormFieldValid(meta) })}`} />
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )} />
                                                <div className="grid">
                                                    <div className="col-2 text-left">
                                                        <Button type="submit" label="Lưu" size='small' />
                                                    </div>
                                                </div>
                                            </form>
                                        )} />
                                        :
                                        <div className="flex justify-content-between align-items-center">
                                            <div className="info-content">
                                                <p className='font-medium text-left'>Địa chỉ email</p>
                                                <p className='font-light text-left'>{'huynhphuhoa1404@gmail.com'.replace(/(\w{3})[\w.-]+@([\w.]+\w)/, "$1***@$2")}</p>
                                            </div>
                                            <div className="info-action">
                                                <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('email')}>Chỉnh sửa</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <Divider />
                                <div className="col-12">
                                    {(activeField === 'phone') ?
                                        <Form onSubmit={onSubmitPhone} validate={validatePhone} initialValues={{ phone: '' }} render={({ handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="p-fluid">
                                                <Field name="phone" render={({ input, meta }) => (
                                                    <div className="field text-left">
                                                        <div className="flex justify-content-between">
                                                            <label htmlFor="phone" className={`block text-900 font-medium mb-2 text-left ${classNames({ 'p-error': isFormFieldValid(meta) })}`}>Số điện thoại</label>
                                                            <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('')}>Huỷ</span>
                                                        </div>
                                                        <InputText id="phone" {...input} placeholder="Số điện thoại" className={`w-full mb-3 ${classNames({ 'p-invalid': isFormFieldValid(meta) })}`} />
                                                        {getFormErrorMessage(meta)}
                                                    </div>
                                                )} />
                                                <div className="grid">
                                                    <div className="col-2 text-left">
                                                        <Button type="submit" label="Lưu" size='small' />
                                                    </div>
                                                </div>
                                            </form>
                                        )} />
                                        :
                                        <div className="flex justify-content-between align-items-center">
                                            <div className="info-content">
                                                <p className='font-medium text-left'>Số điện thoại</p>
                                                <p className='font-light text-left'>{'0845515223'.replace('0845515223'.slice(3, '0845515223'.length), '******')}</p>
                                            </div>
                                            <div className="info-action">
                                                <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('phone')}>Chỉnh sửa</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                                <Divider />
                                <div className="col-12">
                                    {(activeField === 'address') ?
                                        <Form onSubmit={onSubmitAddress} initialValues={{ address: '' }} render={({ handleSubmit }) => (
                                            <form onSubmit={handleSubmit} className="p-fluid">
                                                <Field name="address" render={({ input, meta }) => (
                                                    <div className="field text-left">
                                                        <div className="flex justify-content-between">
                                                            <label htmlFor="address" className={`block text-900 font-medium mb-2 text-left`}>Địa chỉ</label>
                                                            <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('')}>Huỷ</span>
                                                        </div>
                                                        <InputTextarea id="address" {...input} placeholder="Địa chỉ" className={`w-full mb-3`} />
                                                    </div>
                                                )} />
                                                <div className="grid">
                                                    <div className="col-2 text-left">
                                                        <Button type="submit" label="Lưu" size='small' />
                                                    </div>
                                                </div>
                                            </form>
                                        )} />
                                        :
                                        <div className="flex justify-content-between align-items-center">
                                            <div className="info-content">
                                                <p className='font-medium text-left'>Địa chỉ</p>
                                                <p className='font-light text-left'>{'45, Phường Hưng Thạnh, Quận Ninh Kiều, TP. Cần Thơ'}</p>
                                            </div>
                                            <div className="info-action">
                                                <span className='underline font-medium cursor-pointer' onClick={() => setActiveField('address')}>Chỉnh sửa</span>
                                            </div>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="col-12 md:col-4">
                            <div className="grid">
                                <div className="col-12">
                                    <span className='font-medium text-left'>Loại người dùng</span><br />
                                    <Dropdown options={userTypes} value={userTypeVal} optionLabel="name" optionValue='code' defaultValue={'KH'} onChange={(e) => setUserTypeVal(e.target.value)} placeholder="Loại người dùng" className="w-full md:w-14rem text-left"/>
                                </div>
                                <div className="col-12">
                                <span className='font-medium text-left'>Ảnh đại diện</span>
                                    <div className="image-container">
                                        <Image alt='' src={avatarUrl ? avatarUrl : avatarDefault} width='120px' height='120px' />
                                    </div>
                                    <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} customUpload uploadHandler={customBase64Uploader} chooseLabel="Tải ảnh đại diện" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default UserInformation;