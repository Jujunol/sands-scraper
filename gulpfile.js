const gulp = require('gulp');

const pump = require('pump');
const livereload = require('gulp-livereload');
const ts = require('gulp-typescript');

const config = {
    ts: {
        src: "app/**/*.ts",
        dest: "build/"
    },
};


gulp.task('server', function(callback) {
    pump([
        gulp.src(config.ts.src),
        ts({
            module: "commonjs",
            noImplicitAny: false
        }),
        gulp.dest(config.ts.dest),
        livereload()
    ], callback)
});

gulp.task('watch', () => {
    gulp.watch(config.ts.src, ['server']);
});

gulp.task('default', ['server']);