import { useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { useAppSelector } from '../../redux/hook';

const ToastMessage = () => {
    const toast = useRef<any>(null);
    const { show, severity, summary, detail } = useAppSelector(state => state.toast);
    useEffect(() => {
        if(show) {
            toast.current.show({severity, summary, detail, life: 3000});
        }
    }, [show])
    return ( 
        <Toast ref={toast}/>
    );
}

export default ToastMessage;