import { useState } from 'react';
import { Button } from 'primereact/button';
import InputOTP from './field';
import { Dialog } from 'primereact/dialog';
import './style.scss';

interface OTPFormProps {
    open: boolean
    onHide: () => void
}

const OTPForm: React.FC<OTPFormProps> = ({ open, onHide }) => {
    const [otp, setOtp] = useState('');
    const onChange = (value: string) => setOtp(value);
    const handleSubmit = async () => {

    }
    return (
        <Dialog visible={open} header={<h3 style={{ fontWeight: 500, textAlign: 'center' }}>Xác thực mã OTP</h3>} draggable={false} onHide={onHide} breakpoints={{ '960px': '75vw' }}>
            <div className='form_page_wrapper'>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <p style={{ textAlign: 'center' }}>Nhập mã OTP</p>
                </div>
                <div className='grid'>
                    <div className='col-12'>
                        <InputOTP value={otp} onChange={onChange} valueLength={6} />
                    </div>
                    <div className='col-12' style={{ textAlign: 'center' }}>
                        <span className='resend_otp' onClick={() => console.log('resend otp')}>Resend OTP</span>
                    </div>
                    <div className='col-12' style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button className='submit_form_button' onClick={handleSubmit}>Submit</Button>
                    </div>
                </div>
            </div>
        </Dialog>
    );
}

export default OTPForm;