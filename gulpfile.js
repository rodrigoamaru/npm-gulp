
// Adiciona os modulos instalados para o projeto
const gulp = require ('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require ('gulp-autoprefixer'); 
const concat = require ('gulp-concat'); 
const babel = require ('gulp-babel');  
const uglify = require('gulp-uglify');  
const pug = require('gulp-pug');  

// Função para compilar o Saas e adicionar o prefixos
function compilaSass() { 
  return gulp
    .src('css/scss/*.scss')
    //.src('css/scss/**/*.scss') /**/ exemplo usando 2 asteriscos para pegar todas as pastas
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer('last 2 version', 'ie 8', 'ie 9')) 
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
};

// Tarefa para a função do Saas
// gulp.task('sass', compilaSass); Modo antigo
exports.compilaSass = compilaSass;

/* forma do codigo para as Tarefas que precisam de parametros
gulp.task('sass', function (argumentos) {
  compilaSass();
  argumentos();
});
*/

// Função para juntar JS
function gulpjs(){
  return gulp
  .src('js/main/*.js')
  //  return gulp.src(['./lib/file3.js', './lib/file1.js', './lib/file2.js']) codigo para escolher uma ordem dos arquivos, array
  //  return gulp.src(['./lib/file3.js', '!./lib/file1.js', './lib/file2.js']) ponto de exclamação faz com que o arquivo seja negado
  .pipe(concat('main.js')) 
  .pipe(babel({
    presets: ['@babel/env']
}))
  .pipe(uglify())
  .pipe(gulp.dest('js/'))
  .pipe(browserSync.stream());
};
// Tarefa para a função do Saas
//gulp.task('mainjs', gulpJS); 
exports.gulpjs = gulpjs; 


// JS Plugins
function pluginjs() {
  return gulp
    .src([
      'node_modules/jquery/dist/jquery.min.js',
      'node_modules/jquery.nicescroll/dist/jquery.nicescroll.min.js',
      'js/plugins/*.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream()); 
    
}
// Tarefa para a função do splugins
//gulp.task('pluginjs', pluginjs);
exports.pluginjs = pluginjs;

// Função para iniciar browserSync 
function browser() {
  browserSync.init({
    server: {
        baseDir: "./"
    }
});
};
// Tarefa do browser-sync
//gulp.task('browser-sync', browser);  
exports.browser = browser;

// Função para iniciar watch gulp
function watch() {
  gulp.watch ('css/scss/*.scss', compilaSass);
  gulp.watch ('js/main/*.js', gulpjs); 
  gulp.watch('js/plugins/*.js', pluginjs);
  gulp.watch('*.html').on('change', browserSync.reload); 
  //gulp.watch(['*.html', '*.php']).on('change', browserSync.reload);  teste de arrail. para reload de varios arquivos
};

// Inicia tarefa watch
//gulp.task('watch', watch);   
exports.watch = watch;

// Função para compilar o Pug
function compilaPug() {  
  return gulp
    .src('./*.pug')
      .pipe(
        pug({
          // Your options in here.
          pretty: true
        })
      )
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream());
};

// Tarefa para a função do Pug
exports.compilaPug = compilaPug; 


// Tarefa padrão do Gulp, que inicia o watch e o browser-sync
//gulp.task('default',gulp.parallel(watch, browser, compilaSass, gulpjs, pluginjs), ); 

exports.default = gulp.parallel(watch, browser, compilaSass, gulpjs, pluginjs, compilaPug); 