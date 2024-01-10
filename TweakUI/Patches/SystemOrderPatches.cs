using Game;
using HarmonyLib;
using TweakUI.Systems;
using Game.Common;

namespace TweakUI.Patches
{
    [HarmonyPatch( typeof( SystemOrder ), "Initialize" )]
    class SystemOrder_InitializePatch
    {
        static void Postfix( UpdateSystem updateSystem )
        {
            updateSystem.UpdateAt<TweakUISystem>( SystemUpdatePhase.LateUpdate );
        }
    }
}
