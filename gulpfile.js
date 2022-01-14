const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass");
const imagemin = require("gulp-imagemin");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const browsersync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const cache = require("gulp-cache");
const del = require("del");
const plumber = require("gulp-plumber");
const rename = require("gulp-rename");

/* Options
 * ------ */
const options = {
	pug: {
		src: ["build/views/*.pug", "build/views/!blocks/**", "build/views/!layout/**"],
		all: "build/views/**/*.pug",
		dest: "public"
	},
	scripts: {
		src: "build/scripts/**/*.js",
		dest: "public/scripts"
	},
	styles: {
		src: "build/styles/**/*.scss",
		dest: "public/styles"
	},
	images: {
		src: "build/images/*.+(png|jpeg|jpg|gif|svg)",
		dest: "public/images"
	},
	fonts: {
		src: "build/fonts/*",
		dest: "public/fonts"
	},
	sounds: {
		src: "build/sounds/*",
		dest: "public/sounds"
	},
	videos: {
		src: "build/videos/*",
		dest: "public/videos"
	},
	browserSync: {
		baseDir: "public"
	}
};

/* Browser-sync
 * ------------ */
function browserSync(done) {
	browsersync.init({
		server: {
			baseDir: options.browserSync.baseDir
		},
		port: 3000
	});
	done();
}

/* Styles
 * ------ */

function styles() {
	return gulp
		.src(options.styles.src)
		.pipe(
			plumber(function(err) {
				console.log("Styles Task Error");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(sass().on("error", sass.logError))
		.pipe(
			autoprefixer({
				browsers: ["last 2 versions"],
				cascade: false,
				grid: true
			})
		)
		.pipe(gulp.dest(options.styles.dest))
		.pipe(
			browsersync.reload({
				stream: true
			})
		);
}

/* Scripts
 * ------ */

function scripts() {
	return gulp
		.src(options.scripts.src)
		.pipe(
			plumber(function(err) {
				console.log("Scripts Task Error");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(babel())
		.pipe(uglify())
		.pipe(gulp.dest(options.scripts.dest))
		.pipe(
			browsersync.reload({
				stream: true
			})
		);
}

/* Views
 * ------ */

function views() {
	return gulp
		.src(options.pug.src)
		.pipe(
			plumber(function(err) {
				console.log("Pug Task Error");
				console.log(err);
				this.emit("end");
			})
		)
		.pipe(pug({ pretty: true }))
		.pipe(rename({
            extname: '.php'
        }))
		.pipe(gulp.dest(options.pug.dest))
		.pipe(
			browsersync.reload({
				stream: true
			})
		);
}

/* Images
 * ------ */

function images() {
	return gulp
		.src(options.images.src)
		.pipe(
			cache(
				imagemin({
					interlaced: true
				})
			)
		)
		.pipe(gulp.dest(options.images.dest));
}

/* Fonts
 * ------ */

function fonts() {
	return gulp.src(options.fonts.src).pipe(gulp.dest(options.fonts.dest));
}
/* Sounds
 * ------ */

function sounds() {
	return gulp.src(options.sounds.src).pipe(gulp.dest(options.sounds.dest));
}
/* Videos
 * ------ */

function videos() {
	return gulp.src(options.videos.src).pipe(gulp.dest(options.videos.dest));
}

/* Clean up
 * ------ */

async function clean() {
	return Promise.resolve(del.sync("public"));
}

function removeEmptyTemplateFile(){
	del([
		'build/fonts/empty.txt',
		'build/images/empty.png',
		'build/sounds/empty.txt',
		'build/videos/empty.txt',
		'build/views/blocks/empty.pug',
		'build/views/layout/empty.pug',
		'build/styles/themes/empty.txt',
		'build/styles/vendors/empty.txt',
		'build/styles/pages/empty.txt',
		'LICENSE',
		'README.md',
		'.git'
	])
}

function watchFiles() {
	gulp.watch(options.pug.all, views);
	gulp.watch(options.styles.src, styles);
	gulp.watch(options.scripts.src, scripts);
}

/* Build
 * ------ */
const build = gulp.series(
	clean,
	gulp.parallel(styles, views, scripts, images, fonts, sounds, videos)
);
const watch = gulp.parallel(watchFiles, browserSync);
// export tasks
exports.styles = styles;
exports.views = views;
exports.scripts = scripts;
exports.images = images;
exports.fonts = fonts;
exports.sounds = sounds;
exports.videos = videos;
exports.clean = clean;
exports.rmEmpty = removeEmptyTemplateFile;
exports.build = build;
exports.watch = watch;
exports.default = build;