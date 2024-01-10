import React from 'react';

const $Slider = ({ react, value, onValueChanged, style }) => {
    const sliderRef = react.useRef(null);
    const [isMouseDown, setIsMouseDown] = react.useState(false);

    const updateValue = (e) => {
        const slider = sliderRef.current;
        if (!slider) return;

        const rect = slider.getBoundingClientRect();
        const position = e.clientX - rect.left;
        let newValue = (position / rect.width) * 100;
        newValue = Math.max(0, Math.min(100, Math.round(newValue)));

        if (onValueChanged)
            onValueChanged(newValue);

        engine.trigger("audio.playSound", "drag-slider", 1);
    };

    const handleMouseDown = (e) => {
        setIsMouseDown(true);
        updateValue(e);
        engine.trigger("audio.playSound", "grabSlider", 1);
    };

    const handleMouseMove = (e) => {
        if (isMouseDown) {
            updateValue(e);
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const valuePercent = value + "%";
    return (
        <div style={{ width: '100%', ...style }}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '10rem', marginTop: '0' }}>
                <div className="value_jjh" style={{ display: 'flex', width: '45rem', alignItems: 'center', justifyContent: 'center' }}>{valuePercent}</div>
                <div
                    className="slider_fKm slider_pUS horizontal slider_KjX"
                    style={{ flex: 1, margin: '10rem' }}
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}>
                    <div className="track-bounds_H8_">
                        <div className="range-bounds_lNt" style={{ width: valuePercent }}>
                            <div className="range_KXa range_iUN"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default $Slider;