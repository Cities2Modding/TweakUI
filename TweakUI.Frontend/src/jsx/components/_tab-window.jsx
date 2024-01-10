import React from 'react'

const $TabWindow = ({ react, tabs, style, onClose, title }) => {
    const [activeTab, setActiveTab] = react.useState(tabs.length > 0 ? tabs[0].name : '');

    react.useEffect(() => {
        if (activeTab === '')
            setActiveTab(tabs.length > 0 ? tabs[0].name : '');
    }, [tabs]);

    return (
        <div style={{ position: 'fixed', width: '100vw', height: '100vh', pointerEvents: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', ...style }}>
            <div className="panel_YqS economy-panel_e08" style={{ marginLeft: 'auto', marginRight: 'auto', width: '1000rem', height: '775rem' }}>
                <div className="header_H_U header_Bpo child-opacity-transition_nkS">
                    <div className="title-bar_PF4">
                        <div className="icon-space_h_f"></div>
                        <div className="title_SVH title_zQN">{title}</div>
                        <button className="button_bvQ button_bvQ close-button_wKK" onClick={onClose}>
                            <div className="tinted-icon_iKo icon_PhD" style={{ maskImage: 'url(Media/Glyphs/Close.svg)' }}></div>
                        </button>
                    </div>
                    <div className="tab-bar_oPw">
                        {tabs.map(tab => (
                            <div
                                key={tab.name}
                                className={`tab_Hrb ${activeTab === tab.name ? 'selected' : ''}`}
                                onClick={() => setActiveTab(tab.name)} style={{ marginLeft: '2.5rem', marginRight: '2.5rem'}}
                            >
                                {tab.label}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="content_XD5 content_AD7 child-opacity-transition_nkS">
                    {tabs.map(tab => (
                        <div
                            key={tab.name}
                            style={{ display: activeTab === tab.name ? 'flex' : 'none', flexDirection: 'row' }}
                        >
                            {tab.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default $TabWindow;
