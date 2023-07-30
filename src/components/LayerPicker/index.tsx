import { Button } from 'primereact/button';
import road from '../../assets/layers/road.png';
import satellite from '../../assets/layers/satellite.png';
import './style.scss';

interface LayerPickerProps {
    current: 'road' | 'satellite',
    setCurrent: () => void
    style: any
}

const LayerPicker: React.FC<LayerPickerProps> = ({ current, setCurrent, style }) => {
    return (
        <Button onClick={setCurrent} className='btn-layer-picker' style={style}>
            {(current === 'road') ?
                <>
                    <img alt='' src={satellite} style={{ width: '100%', borderRadius: 6 }} />
                    <span style={{ backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.6))', position: 'absolute', bottom: 2, left: 0, textAlign: 'left', width: '100%', fontSize: 12, padding: '2px 6px', borderRadius: '0 0 6px 6px' }}>Vệ tinh</span>
                </>
                :
                <>
                    <img alt='' src={road} style={{ width: '100%', borderRadius: 6 }} />
                    <span style={{ backgroundImage: 'linear-gradient(transparent,rgba(0,0,0,.6))',position: 'absolute', bottom: 0, left: 0, textAlign: 'left', width: '100%', fontSize: 12, padding: '2px 6px', borderRadius: '0 0 6px 6px' }}>Bản đồ</span>
                </>
            }
        </Button>
    );
}

export default LayerPicker;