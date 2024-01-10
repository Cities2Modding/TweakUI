import React from 'react'

const $TabControl = ({ react, tabs, style }) => {
    const [activeTab, setActiveTab] = react.useState(tabs.length > 0 ? tabs[0].name : '');

    return (
        <div style={style} >
            <div className="panel_YqS" style={{ marginLeft: 'auto', marginRight: 'auto', width: '100%' }}>
                <div className="tab-bar_oPw">
                    {tabs.map(tab => (
                        <div
                            key={tab.name}
                            className={`tab_Hrb ${activeTab === tab.name ? 'selected' : ''}`}
                            onClick={() => setActiveTab(tab.name)} style={{ marginLeft: '2.5rem', marginRight: '2.5rem' }}
                        >
                            {tab.label}
                        </div>
                    ))}
                </div>
                <div>
                    {tabs.map(tab => (
                        <div
                            key={tab.name}
                            style={{ display: activeTab === tab.name ? 'flex' : 'none', flexDirection: 'row', paddingTop: '10rem' }}
                        >
                            {tab.content}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default $TabControl;
