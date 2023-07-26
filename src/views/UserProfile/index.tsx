import MenuCard from '../../components/MenuCard';
import { useAppSelector } from '../../redux/hook';
import './style.scss';

const UserProfile = () => {
    const user = useAppSelector(state => state.auth.user);
    const menus = [
        {
            id: 1,
            icon: 'pi-user',
            title: 'Thông tin cá nhân',
            url: '/information',
            description: 'Cung cấp thông tin cá nhân liên lệ của bạn'
        },
        {
            id: 2,
            icon: 'pi-shield',
            title: 'Bảo mật',
            url: '/security',
            description: 'Cập nhật mật khẩu và bảo mật tài khoản'
        },
        {
            id: 3,
            icon: 'pi-ticket',
            title: 'Nạp tiền',
            url: '/payment',
            description: 'Nạp tiền vào tài khoản và mua các gói dịch vụ'
        },
        {
            id: 4,
            icon: 'pi-bell',
            title: 'Thông báo',
            url: '/notification',
            description: 'Danh sách thông báo và tùy chọn'
        },
    ]
    return (
        <div className="user-profile-container">
            <div className="user-profile-wrapper">
                <div className="content">
                    <h3 className='text-left'>Tài khoản, <span>{user.Username}</span></h3>
                    <div className="grid">
                        {menus.map(item => (
                            <div className="col-4">
                                <MenuCard id={item.id} description={item.description} icon={item.icon} title={item.title} url={item.url} key={item.id}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;