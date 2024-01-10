import React from 'react'
import $ToggleButton from './_toggle-button';

const $ToggleGroup = ({ react, style, options, isHorizontal, checked, onChecked }) => {
    const [checkedItem, setCheckedItem] = react.useState(checked);

    let groupStyle = isHorizontal ? { flexDirection: 'row' } : { flexDirection: 'column' };

    const onToggle = (option) => {
        if (checkedItem === option)
            return;

        if (onChecked)
            onChecked(option);

        setCheckedItem(option);
    };
    
    return <div style={{ display: 'flex', width: '100%', ...groupStyle, ...style }}>
        {
            options.map((option, index) => {
                let optionStyle = {
                    flex: 1,
                    marginRight: index === options.length - 1 ? 0 : '2.5rem',
                    marginLeft: index === 0 ? 0 : '2.5rem'
                };
                let optionExtraStyle = isHorizontal ? {
                    alignItems: 'center',
                    justifyContent: 'center'
                } : {};
                let optionLabelStyle = isHorizontal ? {
                    textAlign: 'center'
                } : {};
                return (
                    <$ToggleButton key={option.value}
                        label={option.label}
                        checked={option.value === checkedItem}
                        style={{ ...optionStyle, ...optionExtraStyle }}
                        labelStyle={optionLabelStyle}
                        onToggle={() => onToggle(option.value)}
                    />
                );
            })
        }
    </div>
}

export default $ToggleGroup