import { Steps } from 'primereact/steps';
import { useState } from 'react';
import package1 from '../../assets/package.png';
import vippackage from '../../assets/vippackage.png';
import { Panel } from 'primereact/panel';
import { Tag } from 'primereact/tag';
import { Button } from 'primereact/button';
import { BlockUI } from 'primereact/blockui';
import { Divider } from 'primereact/divider';
import { Image } from 'primereact/image';
import vnpay from '../../assets/paymentmethods/vnpay.png';
import momo from '../../assets/paymentmethods/momo.png';
import atm from '../../assets/paymentmethods/atm.jpg';
import momocode from '../../assets/paymentcode/momo.png';
import atmcode from '../../assets/paymentcode/banking.png';
import vnpaycode from '../../assets/paymentcode/vnpay.jpg';
import './style.scss';
import { useAppSelector } from '../../redux/hook';

const Payment = () => {
    const [activeStep, setActiveStep] = useState<number>(0);
    const [selectedPackage, setSelectedPakage] = useState<number>(0);
    const [selectedPaymentPackage, setSelectedPaymentPackage] = useState<any>({});
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
    const user = useAppSelector(state => state.auth.user);
    const steps = [
        {
            label: 'Chọn gói'
        },
        {
            label: 'Chọn gói giao dịch'
        },
        {
            label: 'Chọn hình thức thanh toán'
        }
    ]
    const packages = [
        {
            id: 1,
            name: 'Gói cơ bản',
            description: 'Tính phí theo lượt xem',
            icon: package1
        },
        {
            id: 2,
            name: 'Gói VIP',
            description: 'Xem quy hoạch không giới hạn',
            icon: vippackage
        },
    ];
    const paymentPackages = [
        {
            id: 1,
            type: 1,
            name: 'Gói cơ bản',
            packages: [
                {
                    id: 1,
                    price: 200000,
                    lands: 200,
                    bonus: 10,
                    expire: 200
                },
                {
                    id: 2,
                    price: 500000,
                    lands: 500,
                    bonus: 20,
                    expire: 365
                }
            ]
        },
        {
            id: 2,
            type: 2,
            name: 'Gói VIP',
            packages: [
                {
                    id: 3,
                    price: 1000000,
                    lands: 1000,
                    bonus: 25,
                    expire: 500
                },
                {
                    id: 4,
                    price: 2000000,
                    lands: 2000,
                    bonus: 35,
                    expire: 500
                },
                {
                    id: 5,
                    price: 3000000,
                    lands: 300,
                    bonus: 50,
                    expire: 500
                }
            ]
        }
    ];
    const paymentMethods = [
        {
            id: 1,
            name: 'VNPay',
            logo: vnpay
        },
        {
            id: 2,
            name: 'MoMo',
            logo: momo
        },
        {
            id: 3,
            name: 'Thẻ ATM - Banking',
            logo: atm
        },
    ];
    const paymentInfor = [
        {
            id: 1,
            methodId: 1,
            name: 'Nguyễn Văn A',
            code: '0941950699'
        },
        {
            id: 2,
            methodId: 2,
            name: 'Nguyễn Văn A',
            code: '0941950699'
        },
        {
            id: 3,
            methodId: 3,
            name: 'Nguyễn Văn A',
            code: '0941950699',
            bank: 'MBBank'
        },
    ];
    const paymentCode = [
        {
            id: 1,
            methodId: 1,
            img: vnpaycode
        },
        {
            id: 2,
            methodId: 2,
            img: momocode
        },
        {
            id: 3,
            methodId: 3,
            img: atmcode
        },
    ]
    return (
        <section id='payment-container'>
            <div className='payment-wrapper'>
                <div className='payment-header'>
                    <Steps model={steps} activeIndex={activeStep} />
                </div>
                {(activeStep > 0) && (
                    <div className='payment-actions'>
                        <Button icon="pi pi-arrow-left" rounded outlined severity="info" aria-label="Back" onClick={() => {
                            setActiveStep(activeStep - 1);
                            setSelectedPaymentMethod(0);
                        }} />
                    </div>
                )}
                <div className='payment-content'>
                    {activeStep === 0 && (
                        <div className='grid'>
                            {packages.map(item => (
                                <div className='col-6' key={item.id}>
                                    <div className='package-container'>
                                        <div className='grid' onClick={() => {
                                            setActiveStep(activeStep + 1);
                                            setSelectedPakage(item.id)
                                        }}>
                                            <div className='col-4'>
                                                <div className='package-icon-container'>
                                                    <img src={item.icon} alt='' />
                                                </div>
                                            </div>
                                            <div className='col-8'>
                                                <div className='package-content-container'>
                                                    <h2>{item.name}</h2>
                                                    <p>{item.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {activeStep === 1 && paymentPackages.map(item => (
                        <BlockUI blocked={selectedPackage !== item.type} key={item.id}>
                            <Panel header={item.name} style={{ width: '100%', marginTop: 20 }}>
                                <div className='grid'>
                                    {item.packages.map(it => (
                                        <div className='col-3' key={it.id}>
                                            <div className='payment-packages-item' onClick={() => {
                                                setActiveStep(activeStep + 1);
                                                setSelectedPaymentPackage(it)
                                            }}>
                                                <div className='payment-packages-item-price'>
                                                    <h3 className='font-medium'>{it.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</h3>
                                                </div>
                                                <p>{it.lands} Đơn vị</p>
                                                <Tag severity="success" value={`+${it.bonus} %`} rounded></Tag>
                                                <p>Thời hạn: {it.expire} ngày</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Panel>
                        </BlockUI>
                    ))}
                    {(activeStep === 2) && (
                        <div className='grid payment-method-container'>
                            <div className='col-12'>
                                <div className="grid">
                                    {paymentMethods.map(item => (
                                        <div className="col-2">
                                            <div className={(selectedPaymentMethod === item.id) ? 'payment-method-item payment-method-item-active' : 'payment-method-item'} onClick={() => setSelectedPaymentMethod(item.id)}>
                                                <img src={item.logo} alt={item.name} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <p className='text-left'>Chọn hình thức thanh toán và sử dụng app ngân hàng đang sử dụng để thanh toán tiện lợi và đơn giản nhất.</p>
                            <div className='col-12'>
                                {selectedPaymentMethod !== 0 ?
                                    (
                                        <div className="grid">
                                            <div className="col-6">
                                                <div className="payment-info">
                                                    {paymentInfor.map(item => {
                                                        if (item.methodId === selectedPaymentMethod) {
                                                            return (
                                                                <>
                                                                    <h3>Thông tin chuyển khoản</h3>
                                                                    <p>Chủ tài khoản: <span className='font-semibold'>{item.name}</span></p>
                                                                    <p>Số tài khoản: <span className='font-semibold'>{item.code}</span></p>
                                                                    <p>Nội dung chuyển khoản: <span className='font-semibold text-green-700'>U{user.id}P{selectedPaymentPackage.id}M{item.methodId}A{selectedPaymentPackage.price}</span></p>
                                                                    <p>Số tiền cần chuyển: <span className='font-semibold'>{selectedPaymentPackage.price.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })}</span></p>
                                                                    {item.bank && <p>Ngân hàng: {item.bank}</p>}
                                                                    <Button label='Hoàn thành thanh toán'/>
                                                                </>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <h3>Quét mã</h3>
                                                <div className="payment-code">
                                                    {paymentCode.map(item => {
                                                        if (item.methodId === selectedPaymentMethod) {
                                                            return (
                                                                <Image src={item.img} width='270'/>
                                                            )
                                                        }
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <div className="grid">
                                            <h4 className='font-medium'>Vui lòng chọn phương thức thanh toán</h4>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Payment;