import {useState, ChangeEventHandler, useRef} from 'react';
import {Form, InputGroup} from 'react-bootstrap';
import {FormControlElement} from '../../types';
import {INTERACTION_KEYS} from '../../util/interactionKeys';
import {last2CharsNoWhitespace} from '../../util/last2CharsNoWhitespace';
import './HhMmDurationInput.css';

export const HhMmDurationInput = ({ inputId }: { inputId?: string }) => {
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [toggleSlot, setToggleSlot] = useState(false);

    const hhRef = useRef<any>();
    const mmRef = useRef<any>();

    const focusOnHoursSlot = () => hhRef?.current?.focus?.();
    const selectHoursSlot = () => hhRef?.current?.select?.();
    const focusOnMinutesSlot = () => mmRef?.current?.focus?.();
    const selectMinutesSlot = () => mmRef?.current?.select?.();

    const onHoursChange: ChangeEventHandler<FormControlElement> = ({ target: { value } }) => {
        let substring = last2CharsNoWhitespace(value);
        let newNumber = Number(substring);

        if (Number.isNaN(newNumber)) {
            return;
        }

        setHours(newNumber);

        if (!toggleSlot) {
            setToggleSlot(true);

            return;
        }

        focusOnMinutesSlot();
    };

    const onMinutesChange: ChangeEventHandler<FormControlElement> = ({target: {value}}) => {
        let substring = last2CharsNoWhitespace(value);
        let newNumber = Number(substring);

        if (Number.isNaN(newNumber)) {
            return;
        }

        if (newNumber > 59) {
            substring = '0' + substring[1];
            newNumber = Number(substring);
        }

        setMinutes(newNumber);

        if (!toggleSlot) {
            setToggleSlot(true);

            return;
        }

        focusOnHoursSlot();
    };

    return (
        <InputGroup bsPrefix='hhmm-duration-input'>
            <Form.Control
                id={inputId}
                bsPrefix='hhmm-duration-input-slot'
                value={String(hours).padStart(2, '0')}
                onChange={onHoursChange}
                ref={hhRef}
                type='text'
                onFocus={() => {
                    setToggleSlot(false);
                    selectHoursSlot();
                }}
                onKeyDown={({ key }) => {
                    if (key === INTERACTION_KEYS.ARROW_UP) {
                        setHours(prev => prev === 99 ? 0 : prev + 1);
                    }

                    if (key === INTERACTION_KEYS.ARROW_DOWN) {
                        setHours(prev => prev === 0 ? 99 : prev - 1);
                    }
                }}
                onKeyUp={({ key, currentTarget: { selectionStart }}) => {
                    if (key === INTERACTION_KEYS.ARROW_RIGHT && selectionStart === 2) {
                        setToggleSlot(false);
                        focusOnMinutesSlot();
                    }
                }}
            />
            <InputGroup.Text bsPrefix='hhmm-duration-input-separator'>
                :
            </InputGroup.Text>
            <Form.Control
                bsPrefix='hhmm-duration-input-slot'
                value={String(minutes).padStart(2, '0')}
                onChange={onMinutesChange}
                ref={mmRef}
                type='text'
                onFocus={() => {
                    setToggleSlot(false);
                    selectMinutesSlot();
                }}
                onKeyDown={({ key }) => {
                    if (key === INTERACTION_KEYS.ARROW_UP) {
                        setMinutes(prev => prev === 59 ? 0 : prev + 1);
                    }

                    if (key === INTERACTION_KEYS.ARROW_DOWN) {
                        setMinutes(prev => prev === 0 ? 59 : prev - 1);
                    }
                }}
                onKeyUp={({ key, currentTarget: { selectionStart }}) => {
                    if (key === INTERACTION_KEYS.ARROW_LEFT && selectionStart === 0) {
                        setToggleSlot(false);
                        focusOnHoursSlot();
                    }
                }}
            />
        </InputGroup>
    );
};
