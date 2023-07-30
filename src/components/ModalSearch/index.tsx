import React, { useState } from "react";
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { TabView, TabPanel } from 'primereact/tabview';
import { InputText } from 'primereact/inputtext';
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { searchListPlanning } from "../../redux/apis/Planning";
import { Form, Field } from 'react-final-form';
import { Dropdown } from 'primereact/dropdown';
import { getDistricts, getWards } from "../../redux/apis/Address";
import './style.scss';

interface ModalSearchProps {
    visible: boolean
    closeModal: () => void
    finishSearch: () => void
}

interface FormValues {
    Title: string,
    province_id: any,
    district_id: any,
    wards: any,
    typeMapId: any
}

const ModalSearch: React.FC<ModalSearchProps> = ({ visible, closeModal, finishSearch }) => {
    const dispatch = useAppDispatch();
    const provinces = useAppSelector(state => state.address.provinces);
    const districts = useAppSelector(state => state.address.districts);
    const wards = useAppSelector(state => state.address.wards);
    const typeMap = useAppSelector(state => state.typemap.list);
    const loading = useAppSelector(state => state.loading.loading);
    const coordinates = useAppSelector(state => state.common.coordinates);
    const [inputValid, setInputValid] = useState<boolean>(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [formData, setFormData] = useState<FormValues>({
        district_id: '',
        province_id: '',
        Title: '',
        typeMapId: '',
        wards: ''
    });
    const onSubmit = async (data: FormValues, form: any) => {
        let rs: any = await dispatch(searchListPlanning({
            coordinates: coordinates,
            district_id: formData.district_id.id ? formData.district_id.id : null,
            province_id: formData.province_id.id ? formData.province_id.id : null,
            Title: data.Title ? data.Title : null,
            typeMapId: data.typeMapId ? data.typeMapId.id : null,
            wards: formData.wards.id ? formData.wards.id : null
        }));
        if(rs.payload.action) {
            finishSearch();
        }
    }
    return (
        <Dialog id="modal-search" header={'Tìm kiếm bản đồ'} draggable={false} visible={visible} style={{ width: '50vw' }} onHide={closeModal}>
            <TabView>
                <TabPanel header="Tìm kiếm">
                    <Form onSubmit={onSubmit} initialValues={{ Title: '', province_id: null, district_id: null, wards: null, typeMapId: null }} render={({ handleSubmit }) => (
                        <form onSubmit={handleSubmit} className="p-fluid p-2">
                            <div className="grid">
                                <div className="col-12">
                                    <Field name="Title" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <InputText id="Title" {...input} className="p-inputtext-sm" autoFocus />
                                                <label htmlFor="Title">Tiêu đề</label>
                                            </span>
                                        </div>
                                    )} />
                                </div>
                                <div className="col-6">
                                    <Field name="province_id" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label p-input-icon-right">
                                                <i className="pi pi-envelope" />
                                                <Dropdown id="province_id" {...input} showClear value={formData.province_id} options={provinces} optionLabel="name" onChange={(e) => {
                                                    dispatch(getDistricts(e.value.id));
                                                    setFormData({
                                                        ...formData,
                                                        province_id: e.value
                                                    })
                                                }} />
                                                <label htmlFor="province_id">Tỉnh/Thành phố</label>
                                            </span>
                                        </div>
                                    )} />
                                </div>
                                <div className="col-6">
                                    <Field name="district_id" render={({ input, meta }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown id="district_id" {...input} showClear value={formData.district_id} options={districts} optionLabel="name" onChange={(e) => {
                                                    dispatch(getWards(e.value.id))
                                                    setFormData({
                                                        ...formData,
                                                        district_id: e.value
                                                    })
                                                }} />
                                                <label htmlFor="district_id">Quận/Huyện</label>
                                            </span>
                                        </div>
                                    )} />
                                </div>
                                <div className="col-6">
                                    <Field name="wards" render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown id="wards" {...input} showClear value={formData.wards} onChange={(e) => setFormData({
                                                    ...formData,
                                                    wards: e.value
                                                })} options={wards} optionLabel="name" />
                                                <label htmlFor="wards">Xã/Phường</label>
                                            </span>
                                        </div>
                                    )} />
                                </div>
                                <div className="col-6">
                                    <Field name="typeMapId" render={({ input }) => (
                                        <div className="field">
                                            <span className="p-float-label">
                                                <Dropdown id="typeMap" {...input} showClear options={typeMap} optionLabel="Name" />
                                                <label htmlFor="typeMap">Loại quy hoạch</label>
                                            </span>
                                        </div>
                                    )} />
                                </div>
                                <div className="col-12">
                                    <Button type="submit" label="Tìm kiếm" loading={loading} />
                                </div>
                            </div>
                        </form>
                    )} />
                </TabPanel>
                <TabPanel header="Tọa độ">
                    <div className="font-medium">Tìm tọa độ vị trí trên Google Map</div>
                    <div className="grid">
                        <div className="col-9">
                            <div className="flex flex-column gap-2">
                                <InputText type="text" value={inputVal} onChange={(e) => setInputVal(e.target.value)} className={!inputValid ? "p-inputtext-sm" : "p-inputtext-sm p-invalid"} placeholder="Nhập tọa độ" tooltip="Nhập tọa độ" tooltipOptions={{ position: 'bottom' }} aria-describedby="coordinates-help" />
                                <small id="coordinates-help">
                                    Ví dụ: 10.039678, 105.750170
                                </small>
                            </div>
                        </div>
                        <div className="col-3">
                            <Button label="Tìm kiếm" size="small" onClick={async() => {
                                if (!inputVal) {
                                    setInputValid(true);
                                } else {
                                    let rs: any = await dispatch(searchListPlanning({
                                        coordinates: inputVal,
                                        district_id: null,
                                        province_id: null,
                                        Title: null,
                                        typeMapId: null,
                                        wards: null
                                    }))
                                    if(rs.payload.action){
                                        finishSearch();
                                    }
                                }
                            }} loading={loading} />
                        </div>

                    </div>
                </TabPanel>
            </TabView>
        </Dialog>
    );
}

export default ModalSearch;