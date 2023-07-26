import { useAppSelector } from "../../redux/hook";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { router } from "../../configs/router";
import './style.scss';

const ProtectedRoute = ({ children }: any) => {
    const navigate = useNavigate();
    const user = useAppSelector(state => state.auth.user);
    return ( 
        <>
            {(Object.keys(user).length > 0) ? children : <>
                <section className="notfound-header">
                    <h4>404 - Page not found</h4>
                    <div className="notfound-content">
                        <h3>The page you are looking for is not found</h3>
                        <p>The page you are looking for does not exist. It may have been moved, or removed altogether. Perhaps you can return back to the site's homepage and see if you can find what you are looking for.</p>
                        <Button onClick={() => navigate(router.HOME)}>Trang chủ</Button>
                    </div>
                </section>
            </>}
        </>
    );
}

export default ProtectedRoute;