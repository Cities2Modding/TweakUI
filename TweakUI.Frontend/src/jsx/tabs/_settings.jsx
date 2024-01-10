import React from 'react'
import $IconPanel from '../components/_icon-panel';
import $Select from '../components/_select';

const $Settings = ({ react, data, setData, triggerUpdate }) => {

    const updateData = (field, val) => {
        if (field === "TransportationOverviewSize") {
            setData({ ...data, TransportationOverviewSize: val });
            triggerUpdate("TransportationOverviewSize", val);
            updateTransportationOverviewSize(val);
        }
        else if (field === "AssetMenuRows") {
            setData({ ...data, AssetMenuRows: val });
            triggerUpdate("AssetMenuRows", val);
            updateAssetMenuRows(val);
        }
    };

    const transportationOverviewSizes = [
        { label: "10%", value: "tu-transportation-overview-10" },
        { label: "20%", value: "tu-transportation-overview-20" },
        { label: "30%", value: "tu-transportation-overview-30" },
        { label: "40%", value: "tu-transportation-overview-40" },
        { label: "50%", value: "tu-transportation-overview-50" },
        { label: "60%", value: "tu-transportation-overview-60" },
        { label: "70%", value: "tu-transportation-overview-70" },
        { label: "80%", value: "tu-transportation-overview-80" },
        { label: "90%", value: "tu-transportation-overview-90" },
        { label: "100%", value: "tu-transportation-overview-100" },
    ];

    const assetMenuRows = [
        { label: "1", value: "tu-asset-menu-rows-1" },
        { label: "2", value: "tu-asset-menu-rows-2" },
        { label: "3", value: "tu-asset-menu-rows-3" },
        { label: "4", value: "tu-asset-menu-rows-4" },
        { label: "5", value: "tu-asset-menu-rows-5" },
        { label: "6", value: "tu-asset-menu-rows-6" },
    ];

    const updateTransportationOverviewSize = (val) => {
        transportationOverviewSizes.forEach((item) => {
            if (item.value !== val)
                document.body.classList.remove(item.value);
            else
                document.body.classList.add(item.value);
        });
    };

    const updateAssetMenuRows = (val) => {
        assetMenuRows.forEach((item) => {
            if (item.value !== val)
                document.body.classList.remove(item.value);
            else
                document.body.classList.add(item.value);
        });
    };

    return <div style={{ width: '100%', display: 'flex', flexDirection: 'row' }}>
        <div style={{ flex: 1, width: '50%' }}>
            <div style={{ flex: 1, paddingRight: '5rem' }}>
                <$IconPanel label="Transportation Overview Height"
                    description="Change the height of the transportation overview."
                    icon="Media/Editor/Edit.svg" fitChild="true">
                    <$Select react={react} selected={data.TransportationOverviewSize} options={transportationOverviewSizes} style={{ margin: '10rem', flex: '1' }} onSelectionChanged={(val) => updateData("TransportationOverviewSize", val)}></$Select>
                </$IconPanel>
                <$IconPanel label="Asset Menu Rows"
                    description="Change the number of rows on the tool asset menu."
                    icon="Media/Editor/Edit.svg" fitChild="true">
                    <$Select react={react} selected={data.AssetMenuRows} options={assetMenuRows} style={{ margin: '10rem', flex: '1' }} onSelectionChanged={(val) => updateData("AssetMenuRows", val)}></$Select>
                </$IconPanel>
            </div>
        </div>
        <div style={{ flex: 1, width: '50%', paddingLeft: '5rem' }}>
        </div>
    </div>
}

export default $Settings;