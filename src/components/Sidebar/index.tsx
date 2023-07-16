import { Sidebar } from 'primereact/sidebar';
import { useAppSelector, useAppDispatch } from '../../redux/hook';
import { saveSidebar } from '../../redux/slices/Common';
import { Tag } from 'primereact/tag';
import { DataView } from 'primereact/dataview';
import { Badge } from 'primereact/badge';
import { Image } from 'primereact/image';
import './style.scss';

interface SideDrawerProps {
    handleOnClick: (Id: number) => void;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ handleOnClick }) => {
    const dispatch = useAppDispatch();
    const listPlanning = useAppSelector(state => state.planning.list);
    const sidebar = useAppSelector(state => state.common.sidebar);
    const getSeverity = (item: any) => {
        switch (item.status_post) {
            case 1:
                return 'success';

            case 2:
                return 'warning';

            case 3:
                return 'danger';

            default:
                return null;
        }
    };
    const itemTemplate = (item: any) => (
        <div className="col-12">
            <div className="flex flex-column xl:flex-row xl:align-items-start p-1 gap-4 relative">
                <Badge value={`${item.distance.toFixed(1)}km`} style={{ position: 'absolute', borderRadius: '6px 0 0 0', zIndex: 1 }}></Badge>
                <Image className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" width='100%' src={item.url_image ? item.url_image : ''} alt={item.Image ? item.Image : ''} preview/>
                <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                    <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                        <div className="text-sm font-bold text-900 cursor-pointer" onClick={() => handleOnClick(item?.Id)}>{item.title}</div>
                        <div className="flex align-items-center gap-3">
                            <div className="text-xs font-bold text-600">{item?.price_view} / lượt xem</div>
                            <Tag value={item?.status_name_post} severity={getSeverity(item)}></Tag>
                        </div>
                        <span className="flex align-items-center gap-2">
                            <i className="pi pi-map-marker"></i>
                            <span className="font-semibold" style={{ fontSize: 12 }}>{item?.address}</span>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
    return (
        <Sidebar className='side_list shadow-5 w-full md:w-20rem lg:w-30rem' visible={sidebar} dismissable modal={false} showCloseIcon={false} onHide={() => dispatch(saveSidebar(false))}>
            <h3>Danh sách quy hoạch</h3>
            <DataView value={listPlanning} itemTemplate={itemTemplate} header={null} />
        </Sidebar>
    );
}

export default SideDrawer;