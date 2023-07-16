import React, { useMemo } from "react";
import { REGEXDIGIT } from "../../configs/constants";

interface InputOTPProps {
    value: string;
    valueLength: number;
    onChange: (value: string) => void;
}

const InputOTP: React.FC<InputOTPProps> = ({ value, valueLength, onChange }) => {
    const valueItems = useMemo(() => {
        const valueArray = value.split('');
        const items: Array<string> = [];
        for(let i=0; i<valueLength; i++){
            const char = valueArray[i];
            if(REGEXDIGIT.test(char)) {
                items.push(char);
            } else {
                items.push('');
            }
        }
        return items;
    },[value, valueLength]);
    const onChangeTyping = (e: React.ChangeEvent<HTMLInputElement>,idx: number) => {
        let targetVal = e.target.value.trim();
        const isTargetVal = REGEXDIGIT.test(targetVal);
        if(!isTargetVal && targetVal !== '') {
            return;
        }
        targetVal = isTargetVal ? targetVal : '';
        const newValue = value.substring(0, idx) + targetVal + value.substring(idx+1);
        onChange(newValue);
        if(!isTargetVal) {
            return;
        }
        const nextElm = e.target.nextElementSibling as HTMLInputElement | null;
        if(nextElm) {
            nextElm.focus();
        }
        e.target.blur();
    }
    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement;
        if(e.key !== 'Backspace' || target.value !== '') {
            return;
        }
        const prevElmSibling = target.previousElementSibling as HTMLInputElement | null;
        if(prevElmSibling) {
            prevElmSibling.focus();
        }
        target.setSelectionRange(0, target.value.length);
    }
    const onFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        e.target.setSelectionRange(0, e.target.value.length);
    }
    return (
        <div className="otp_group_container">
            <div className="otp_group">
                {valueItems.map((item, idx) => (
                    <input key={idx} 
                    type={'text'} 
                    inputMode='numeric' 
                    autoComplete="one-time-code" 
                    pattern="\d{1}" 
                    maxLength={valueLength} 
                    className='otp_input' 
                    value={item} 
                    onKeyDown={onKeyDown}
                    onFocus={onFocus}
                    onChange={(e) => onChangeTyping(e,idx)}
                    />
                ))}
            </div>
        </div>
    );
}

export default InputOTP;