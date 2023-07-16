import { MenuCardProps } from "./MenuProps";
import { useNavigate } from "react-router";
import { Card } from 'primereact/card';
import { router } from "../../configs/router";
import './style.scss';

const MenuCard:React.FC<MenuCardProps> = ({ id, title, url, icon, description }) => {
    const navigate = useNavigate();
    return (
        <Card title={<i className={`pi ${icon}`} style={{ fontSize: '2.5rem' }}></i>} className="menu-card" onClick={() => navigate(`${router.USER}${url}`)}>
            <h4>{title}</h4>
            <span>{description}</span>
        </Card>
    );
}

export default MenuCard;