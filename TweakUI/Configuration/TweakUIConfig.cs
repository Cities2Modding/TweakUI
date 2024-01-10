namespace TweakUI.Configuration
{
    public class TweakUIConfig : ConfigBase
    {
        protected override string ConfigFileName => "config.json";

        public string TransportationOverviewSize
        {
            get;
            set;
        } = "tu-transportation-overview-60";

        public string AssetMenuRows
        {
            get;
            set;
        } = "tu-asset-menu-rows-2";
    }
}
