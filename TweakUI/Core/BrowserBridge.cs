using cohtml.Net;
using Game.SceneFlow;
using System.Text;
using System;
using TweakUI.IO;
using System.IO;
using TweakUI.Configuration;

namespace TweakUI.Core
{
    internal class BrowserBridge
    {
        private View _gameFace;


        internal BrowserBridge() 
        {
            _gameFace = GameManager.instance.userInterface.view.View;

            InjectPolyfills( );
        }

        private void InjectPolyfills( )
        {
            InjectBase64Function( );
        }

        /// <summary>
        /// Execute Javascript on the main view
        /// </summary>
        /// <param name="javaScript"></param>
        public void ExecuteJS( string javaScript )
        {
            _gameFace?.ExecuteScript( javaScript );
        }

        /// <summary>
        /// Load CSS from an embedded resource in the assembly
        /// </summary>
        public void LoadEmbeddedCSS( )
        {
            var css = EmbeddedResource.LoadText( "TweakUI.Resources.TweakUI.css" );

            if ( css == null )
                return;

            if ( !Directory.Exists( ConfigBase.MOD_PATH ) )
                Directory.CreateDirectory( ConfigBase.MOD_PATH );

            var savePath = Path.Combine( ConfigBase.MOD_PATH, "TweakUI.css" );
            File.WriteAllText( savePath, css );
        }

        /// <summary>
        /// Inject embedded css
        /// </summary>
        public void InjectEmbeddedCSS( )
        {
            var js = EmbeddedResource.LoadText( "TweakUI.Resources.StyleInject.js" );

            if ( js == null )
                return;

            ExecuteJS( js );
        }

        /// <summary>
        /// Injects a base64 decoder that is missing (atob)
        /// </summary>
        /// <remarks>
        /// (To safely escape the HTML and CSS this is the best way due to how we
        /// inject our custom UI)
        /// </remarks>
        private void InjectBase64Function( )
        {
            var base64DecodeFunction = @"
                if (typeof atob !== 'function') {
                    function atob(str) {
                        // Going to use a lookup table to find characters.
                        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
                        var output = '';

                        str = String(str).replace(/=+$/, ''); // Remove any trailing '='s

                        if (str.length % 4 == 1) {
                            throw new Error(""'atob' failed: The string to be decoded is not correctly encoded."");
                        }

                        for (
                            // initialize variables
                            var bc = 0, bs, buffer, idx = 0, output = '';
                            // get next character
                            buffer = str.charAt(idx++);
                            // character found in table? initialize bit storage and add its ascii value;
                            ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
                                // and if not first of each 4 characters,
                                // convert the first 8 bits to one ascii character
                                bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
                        ) {
                            buffer = chars.indexOf(buffer);
                        }

                        return output;
                    }                
                }";

            ExecuteJS( base64DecodeFunction );
        }

        /// <summary>
        /// Convert a string to base64
        /// </summary>
        /// <param name="input"></param>
        /// <returns></returns>
        private string ToBase64( string input )
        {
            return Convert.ToBase64String( Encoding.UTF8.GetBytes( input ) );
        }
    }
}
