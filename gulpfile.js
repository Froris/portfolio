const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require('browser-sync').create();
sass.compiler = require("node-sass");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const webpack = require("webpack-stream");
const webConfig = require("./webpack.config");

const cssFiles = [
    "./src/scss/header.scss",
    "./src/scss/footer.scss"
]

function gulpSass(){
    return gulp.src("./src/scss/main.scss")
        .pipe(sass().on("error", sass.logError))
        /* .pipe(concat("main.css")) */
        .pipe(cleanCSS({level: 2}))
        .pipe(gulp.dest("./public/css"))
        .pipe(browserSync.stream())
}

function scripts(){
    return gulp.src(webConfig.entry)
        .pipe(webpack(webConfig))
        .pipe(gulp.dest("./public/scripts/"))
}

function gulpWatch(){
    browserSync.init({
        server: {
            baseDir: "./public"
        }
    });

    gulp.watch("./src/scss/**/*.scss", gulpSass);
    gulp.watch("./src/scripts/index.js", gulpDev).on('change', browserSync.reload);
    gulp.watch("./public/**/*.html").on('change', browserSync.reload);
}

function clean(){
    return del(["./public/css/main.css", "./public/scripts/**/*.js"]);
}



// ======================= PROJECT BUILDING ==========================

let isDev = true;
let isProd = !isDev;

// Запуск сборщика в режиме "Production"
function gulpBuild(){
    isDev = false;
    webConfig.mode = isDev ? "development" : "production";
    clean();
    gulpSass();
    return scripts();
}

// Запуск сборщика в режиме "Development"
function gulpDev(){
    isDev = true;
    webConfig.mode = isDev ? "development" : "production";
    gulpSass()
    return scripts();
}

exports.clean = clean;
exports.watch = gulpWatch;
exports.webpack = scripts;
exports.build = gulpBuild;
exports.dev = gulpDev;