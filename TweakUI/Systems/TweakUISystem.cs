using Colossal.UI.Binding;
using Game;
using Game.UI;
using Newtonsoft.Json;
using System.Collections.Generic;
using System;
using System.Reflection;
using TweakUI.Configuration;
using TweakUI.Core;
using TweakUI.UI;
using System.Linq;
using Game.SceneFlow;
using System.IO;
using Colossal.Serialization.Entities;

namespace TweakUI.Systems
{
    public class TweakUISystem : UISystemBase
    {
        private string kGroup = "cities2modding_tweakui";

        static GetterValueBinding<TweakUIConfig> _binding;
        static FieldInfo _dirtyField = typeof( GetterValueBinding<TweakUIConfig> ).GetField( "m_ValueDirty", BindingFlags.Instance | BindingFlags.NonPublic );

        private BrowserBridge _bridge;
        private readonly TweakUIConfig _config = ConfigBase.Load<TweakUIConfig>( );

        private bool hasInjected;

        public static void EnsureModUIFolder( )
        {
            var resourceHandler = ( GameUIResourceHandler ) GameManager.instance.userInterface.view.uiSystem.resourceHandler;

            if ( resourceHandler == null || resourceHandler.HostLocationsMap.ContainsKey( "tweakui" ) )
                return;

            resourceHandler.HostLocationsMap.Add( "tweakui", new List<string> { ConfigBase.MOD_PATH } );
        }

        protected override void OnCreate( )
        {
            base.OnCreate( );

            EnsureModUIFolder( );

            _bridge = new BrowserBridge( );
            _bridge.LoadEmbeddedCSS( );

            _binding = new GetterValueBinding<TweakUIConfig>( kGroup, "config", ( ) =>
            {
                return _config;
            }, new ValueWriter<TweakUIConfig>( ).Nullable( ) );

            ConfigBase.OnUpdated += ( ) =>
            {
                _dirtyField.SetValue( _binding, true );
            };

            AddUpdateBinding( _binding );
            AddBinding( new TriggerBinding<string>( kGroup, "updateProperty", UpdateProperty ) );
            AddBinding( new TriggerBinding( kGroup, "inject", ( ) =>
            {
                _bridge.InjectEmbeddedCSS( );
                _bridge.ExecuteJS( $"document.body.classList.add('{_config.TransportationOverviewSize}');" );
                _bridge.ExecuteJS( $"document.body.classList.add('{_config.AssetMenuRows}');" );
            } ) );

            UnityEngine.Debug.Log( "TweakUI OnCreate" );
        }

        protected override void OnGameLoadingComplete( Purpose purpose, GameMode mode )
        {
            base.OnGameLoadingComplete( purpose, mode );

            if ( !hasInjected )
            {
                _bridge.InjectEmbeddedCSS( );
                _bridge.ExecuteJS( $"document.body.classList.add('{_config.TransportationOverviewSize}');" );
                _bridge.ExecuteJS( $"document.body.classList.add('{_config.AssetMenuRows}');" );
                UnityEngine.Debug.Log( "TweakUI Injected" );
                hasInjected = true;
            }
        }

        protected override void OnUpdate( )
        {
        }

        /// <summary>
        /// Triggered from UI to C# when a property is updated
        /// </summary>
        /// <param name="json"></param>
        private void UpdateProperty( string json )
        {
            if ( string.IsNullOrEmpty( json ) )
                return;

            // Assuming that propertiesCache is a Dictionary and already populated
            var properties = ModelWriter._propertiesCache[typeof( TweakUIConfig )];
            if ( properties == null )
                return;

            var dic = JsonConvert.DeserializeObject<Dictionary<string, object>>( json );
            if ( dic == null || !dic.TryGetValue( "property", out var propertyName ) )
                return;

            var property = properties.FirstOrDefault( p => p.Name == ( string ) propertyName );
            if ( property == null )
                return;

            if ( !dic.TryGetValue( "value", out var val ) )
                return;

            // Optimize type checks and conversions
            if ( val.GetType( ) != property.PropertyType )
            {
                if ( TryConvertValue( property.PropertyType, val, out var convertedValue ) )
                {
                    property.SetValue( _config, convertedValue );
                }
            }
            else
            {
                property.SetValue( _config, val );
            }

            _config.Save( );
        }


        /// <summary>
        /// Try to convert a property value
        /// </summary>
        /// <param name="propertyType"></param>
        /// <param name="val"></param>
        /// <param name="result"></param>
        /// <returns></returns>
        private bool TryConvertValue( Type propertyType, object val, out object result )
        {
            result = null;
            if ( propertyType == typeof( decimal ) )
            {
                if ( val is string stringValue && int.TryParse( stringValue, out var intValue ) )
                {
                    result = intValue / 100m;
                    return true;
                }
                else if ( val is long longValue )
                {
                    result = longValue / 100m;
                    return true;
                }
                else if ( val is int intValue2 )
                {
                    result = intValue2 / 100m;
                    return true;
                }
            }
            else if ( propertyType.IsEnum && val is string strVal )
            {
                if ( Enum.TryParse( propertyType, strVal, out var enumValue ) )
                {
                    result = enumValue;
                    return true;
                }
            }
            return false;
        }
    }
}
