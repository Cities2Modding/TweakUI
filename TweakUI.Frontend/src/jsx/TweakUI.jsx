import React from 'react';
import { useDataUpdate } from 'hookui-framework';
import $TabWindow from './components/_tab-window';
import $Settings from './tabs/_settings';

const $TweakUI = ({ react }) => {
    const [data, setData] = react.useState({});
    const [tabs, setTabs] = react.useState([]);

    useDataUpdate(react, "cities2modding_tweakui.config", setData);

    //defaultThemes
    const triggerUpdate = (prop, val) => {
        engine.trigger("cities2modding_tweakui.updateProperty", JSON.stringify({ property: prop, value: val }) );
    };

    const toggleVisibility = () => {
        const visData = { type: "toggle_visibility", id: "cities2modding.tweakui" };
        const event = new CustomEvent('hookui', { detail: visData });
        window.dispatchEvent(event);

        engine.trigger("audio.playSound", "close-panel", 1);
    };
    
    return <$TabWindow react={react} title="TweakUI" tabs={[
        {
            name: "SETTINGS",
            label: "Settings",
            content: <div style={{ display: 'flex', width: '100%' }}>
                <$Settings react={react} data={data} setData={setData} triggerUpdate={triggerUpdate} />
            </div>
        }
    ]} onClose={toggleVisibility} />
};

// Registering the panel with HookUI
window._$hookui.registerPanel({
    id: "cities2modding.tweakui",
    name: "TweakUI",
    icon: "Media/Game/Icons/Build.svg",
    component: $TweakUI
});

engine.trigger("cities2modding_tweakui.inject");