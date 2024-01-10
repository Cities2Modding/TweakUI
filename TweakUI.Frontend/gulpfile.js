const gulp = require('gulp');
const esbuild = require('esbuild');
const fs = require('fs-extra'); // fs-extra is an extended version of Node's fs module

gulp.task('build-jsx', function (done) {
    esbuild.build({
        entryPoints: ['src/jsx/TweakUI.jsx'],
        outdir: '../TweakUI/Resources',
        bundle: true,
        platform: 'browser',
        loader: {
            '.js': 'jsx',
            '.jsx': 'jsx'
        }
        // Add other esbuild options as needed
    }).then(() => {
        // After successful build, copy the file to the target directory
        fs.copySync(
            '../TweakUI/Resources/TweakUI.js',
            'G:/SteamLibrary/steamapps/common/Cities Skylines II/Cities2_Data/StreamingAssets/~UI~/HookUI/Extensions/panel.cities2modding.tweakui.js'
        );
        done();
    }).catch((error) => {
        console.error(error);
        done(new Error('Build failed'));
    });
});

gulp.task('default', gulp.series('build-jsx'));
