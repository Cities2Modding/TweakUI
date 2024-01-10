import React from 'react';

const $FancySlider = ({ react, value, fromColour, toColour, onValueChanged, isColorSpectrum, style }) => {
    const sliderRef = react.useRef(null); // Reference to the slider element
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
    };

    const handleMouseMove = (e) => {
        if (isMouseDown) {
            updateValue(e);
        }
    };

    const handleMouseUp = () => {
        setIsMouseDown(false);
    };

    const sliderColours = isColorSpectrum ? {
        '--endColor': 'rgba(255,0,0,1)',
        '--startColor': 'rgba(255,0,0,1)',
        '--gradient': 'linear-gradient(to right, rgba(255,0,0,1) 0%, rgba(255,42,0,1) 2.7777777777777777%, rgba(255,85,0,1) 5.555555555555555%, rgba(255,128,0,1) 8.333333333333332%, rgba(255,170,0,1) 11.11111111111111%, rgba(255,213,0,1) 13.88888888888889%, rgba(255,255,0,1) 16.666666666666664%, rgba(212,255,0,1) 19.444444444444446%, rgba(170,255,0,1) 22.22222222222222%, rgba(128,255,0,1) 25%, rgba(85,255,0,1) 27.77777777777778%, rgba(42,255,0,1) 30.555555555555557%, rgba(0,255,0,1) 33.33333333333333%, rgba(0,255,42,1) 36.11111111111111%, rgba(0,255,85,1) 38.88888888888889%, rgba(0,255,128,1) 41.66666666666667%, rgba(0,255,170,1) 44.44444444444444%, rgba(0,255,212,1) 47.22222222222222%, rgba(0,255,255,1) 50%, rgba(0,212,255,1) 52.77777777777778%, rgba(0,170,255,1) 55.55555555555556%, rgba(0,128,255,1) 58.333333333333336%, rgba(0,85,255,1) 61.111111111111114%, rgba(0,43,255,1) 63.888888888888886%, rgba(0,0,255,1) 66.66666666666666%, rgba(42,0,255,1) 69.44444444444444%, rgba(85,0,255,1) 72.22222222222221%, rgba(128,0,255,1) 75%, rgba(170,0,255,1) 77.77777777777779%, rgba(213,0,255,1) 80.55555555555556%, rgba(255,0,255,1) 83.33333333333334%, rgba(255,0,212,1) 86.11111111111111%, rgba(255,0,170,1) 88.88888888888889%, rgba(255,0,128,1) 91.66666666666666%, rgba(255,0,85,1) 94.44444444444444%, rgba(255,0,43,1) 97.22222222222221%, rgba(255,0,0,1) 100%)'
    } : {
        '--endColor': toColour,
        '--startColor': fromColour,
        '--gradient': 'linear-gradient(to right, ' + fromColour + ' 0%, ' + toColour + ' 100%)'
    };

    const valuePercent = value + "%";
    return (
        <div className="slider_xgT" style={style}>
            <div className="slider-container_NuQ">
                <div className="slider_fer slider_pUS horizontal" style={sliderColours}                
                    ref={sliderRef}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}>
                    <div className="start-edge_nii edge_xBb"></div>
                    <div className="end-edge_egi edge_xBb"></div>
                    <div className="track-bounds_hs9 track-bounds_H8_">
                        <div className="range-bounds_lNt" style={{ width: valuePercent }}>
                            <div className="range_iUN"></div>
                            <div className="thumb-container_aso">
                                <div className="thumb_z1a"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>        
    );
}

export default $FancySlider;
