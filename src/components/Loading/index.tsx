import { useAppSelector } from "../../redux/hook";
import './style.scss';

const Loading = () => {
    const loading = useAppSelector(state => state.loading.loading);
    return (
        <>
            {loading && (
                <div className="loader_container">
                    <div className="loader">
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__bar"></div>
                        <div className="loader__ball"></div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Loading;