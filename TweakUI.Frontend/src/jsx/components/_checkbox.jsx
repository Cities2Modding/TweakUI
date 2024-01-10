import React from 'react'

const $CheckBox = ({ react, style, checked, onToggle }) => {
    const [isChecked, setIsChecked] = react.useState(checked);

    const handleClick = () => {
        onToggle(!checked)
        engine.trigger("audio.playSound", "select-toggle", 1);
    }

    react.useEffect(() => {
        setIsChecked(checked);
    }, [checked]);

    const checked_class = isChecked ? 'checked' : 'unchecked';

    const many = (...styles) => {
        return styles.join(' ')
    }

    return <div className={many('toggle_cca toggle_ATa', checked_class)} style={style} onClick={handleClick}>
        <div className={many('checkmark_NXV', checked_class)}></div>
    </div>
}

export default $CheckBox