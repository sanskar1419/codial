import gulp from "gulp";

// styles
import * as sass from "sass";
import gulpSass from "gulp-sass";
const scss = gulpSass(sass);
import autoprefixer from "gulp-autoprefixer";
import cssMinify from "gulp-clean-css";

function styles() {
  return gulp
    .src("./assets/scss/**/*.scss")
    .pipe(scss())
    .pipe(autoprefixer("last 2 versions"))
    .pipe(cssMinify())
    .pipe(gulp.dest("./public/assets/css"));
}

// // scripts
// import jsMinify from "gulp-terser";

// function scripts() {
//   return gulp
//     .src("./frontend/src/scripts/**/*.js")
//     .pipe(jsMinify())
//     .pipe(gulp.dest("./frontend/dist/scripts/"));
// }

// watchTask
function watchTask() {
  gulp.watch(["./assets/scss/**/*.scss"], gulp.series(styles));
}

export default gulp.series(styles, watchTask);
