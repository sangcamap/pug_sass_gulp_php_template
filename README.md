# Quick start dự  án Pug, Sass, Gulp, PHP

<p align="center">
<img src="build/images/empty.png" width = "1000"/>
</p>

## Bắt đầu nhanh một dự án sử dụng Pug, Sass, Gulp, PHP

### :hash: Setup

- Cài đặt [Node js](https://nodejs.org/en/)
- Tới thư mục project cài template và các modules


 ```diff
 @@ Sử dụng cmd @@
```
 ```
 
  git clone https://github.com/sangcamap/pug_sass_gulp_php_template
  
 ```
 
 ```
 
  npm install gulp-cli -g
  
 ```
 
 ```
 
  npm install
  
 ```
 
 ```
 
  gulp rmEmpty
  
 ```

### :hash: Sử dụng

| Command                 | Chức năng          
| ----------------------- |-----------------------------------|
| `gulp styles`           | build thư mục styles sass -> css 
| `gulp views`            | build thư mục styles pug  -> php
| `gulp scripts`          | build thư mục scripts       
| `gulp images`           | build thư mục images và thu gọn ảnh
| `gulp fonts`            | build thư mục fonts
| `gulp sounds`           | build thư mục sounds
| `gulp videos`           | build thư mục videos
| `gulp clean`            | xóa thư mục public
| `gulp rmEmpty`          | xóa các file empty.* 
| `gulp build` hoặc `gulp`| build tất cả thư mục
| `gulp watch`            | browsersync ở port 3000

### :hash: Documentation
- [PUG](https://pugjs.org/language/attributes.html)
- [SASS](https://sass-lang.com/guide)
- [GULP](https://gulpjs.com/docs/en/getting-started/quick-start)
