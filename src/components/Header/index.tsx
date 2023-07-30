import { InputText } from "primereact/inputtext";
import { Button } from 'primereact/button';
import { useAppDispatch, useAppSelector } from "../../redux/hook";
import { saveModalHistory, saveSidebar } from "../../redux/slices/Common";
import { useRef, useState } from "react";
import { Menu } from 'primereact/menu';
import { Avatar } from 'primereact/avatar';
import { MenuItem } from 'primereact/menuitem';
import { classNames } from "primereact/utils";
import LoginModal from "../Login";
import { Tag } from 'primereact/tag';
import { Logout } from "../../redux/apis/Auth";
import { useNavigate, useLocation } from "react-router-dom";
import './style.scss';
import { router } from "../../configs/router";
import SignupDialog from "../Signup";
import ModalSearch from "../ModalSearch";


const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useAppDispatch();
    const menuRef: any = useRef<Menu>(null);
    const sidebar = useAppSelector(state => state.common.sidebar);
    const user = useAppSelector(state => state.auth.user);
    const [displayModalLogin, setDisplayModalLogin] = useState<boolean>(false);
    const [displayModalSignup, setDisplayModalSignup] = useState<boolean>(false);
    const [displayModalSearch, setDisplayModalSearch] = useState<boolean>(false);
    let items: MenuItem[] = [
        {
            command: () => { console.log('aaa') },
            template: (item, options) => {
                return (
                    <button onClick={(e) => options.onClick(e)} className={classNames(options.className, 'w-full p-link flex align-items-center')}>
                        <Avatar image={user?.url_image ? user?.url_image : ''} className="mr-2" shape="circle" />
                        <div className="flex flex-column align">
                            <span className="font-bold">{user?.Username}</span>
                            <Tag severity={(user?.Status === 'ACTIVE') ? 'success' : 'warning'} value={(user?.Status === 'ACTIVE') ? 'Hoạt động' : 'Khóa'} icon={(user?.Status === 'ACTIVE') ? 'pi pi-check' : 'pi pi-exclamation-triangle'}></Tag>
                        </div>
                    </button>
                )
            }
        },
        { separator: true },
        { label: 'Cá nhân', icon: 'pi pi-fw pi-user', command: () => navigate(router.USER) },
        { label: 'Lịch sử xem', icon: 'pi pi-stopwatch', command: () => dispatch(saveModalHistory(true)) },
        { label: 'Nạp tiền', icon: 'pi pi-ticket', command: () => navigate(router.PAYMENT) },
        { label: 'Đăng xuất', icon: 'pi pi-sign-out', command: () => dispatch(Logout({})) },
    ];
    const handleFinishSearch = () => {
        setDisplayModalSearch(false);
        dispatch(saveSidebar(true));
    }
    return (
        <>
            <ModalSearch visible={displayModalSearch} closeModal={() => setDisplayModalSearch(false)} finishSearch={handleFinishSearch} />
            <SignupDialog visible={displayModalSignup} onHide={() => setDisplayModalSignup(false)} />
            <LoginModal visible={displayModalLogin} onHide={() => setDisplayModalLogin(false)} openSignup={() => {
                setDisplayModalLogin(false);
                setDisplayModalSignup(true);
            }} />
            <section className="header_container">
                <div className="header_left">
                    <Button className="header_btn header_left_btn" onClick={() => navigate(router.HOME)} style={{ fontSize: 25 }} label="CHATLAND" />
                </div>
                <div className="header_right">
                    {(location.pathname === router.HOME) && (
                        <Button className="header_btn header_right_btn" onClick={() => dispatch(saveSidebar(!sidebar))} id="btn_sidebar_collapse" icon={sidebar ? 'pi pi-angle-left' : 'pi pi-angle-right'} />
                    )}
                    <ul className="header_controls fadeindown">
                        <li>
                            <Button icon={'pi pi-user'} className="header_btn" onClick={(e) => {
                                if (Object.keys(user).length > 0) {
                                    menuRef.current.toggle(e);
                                } else {
                                    setDisplayModalLogin(true);
                                }
                            }} />
                            <Menu popup model={items} ref={menuRef} />
                        </li>
                        <li>
                            <Button icon={'pi pi-book'} onClick={() => navigate(router.POST)} className="header_btn" label="Tin đăng" tooltip="Đến tin đăng" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
                        </li>
                        {(location.pathname !== router.HOME) && (
                            <li>
                                <Button icon={'pi pi-map'} onClick={() => navigate(router.HOME)} className="header_btn" label="Quy hoạch" tooltip="Đến quy hoạch" tooltipOptions={{ position: 'bottom', mouseTrack: true, mouseTrackTop: 15 }} />
                            </li>
                        )}
                        {(location.pathname === router.HOME) && (
                            <li>
                                <span className="p-input-icon-right search_container" onClick={() => setDisplayModalSearch(true)}>
                                    <InputText type="text" className="p-inputtext-sm" placeholder="Tìm kiếm" tooltip="Nhập tìm kiếm" tooltipOptions={{ position: 'bottom' }} />
                                    <i className="pi pi-search" />
                                </span>
                                <Button icon={'pi pi-search'} className="header_btn responsive_btn_search" onClick={() => setDisplayModalSearch(true)} />
                            </li>
                        )}
                    </ul>
                </div>
            </section>
        </>
    );
}

export default Header;