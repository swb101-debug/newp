import $ from 'jquery';
import './css/test.css';
import './css/test.less';
import './css/iconfont.css';

$(() => {
  $('li:odd').css('color', 'green');
});

const add = (x, y) => x + y;
// 以下一行eslint检查忽略
// eslint-disable-next-line
console.log(add(3,4));

const promise = new Promise((resolve) => {
  setTimeout(() => {
    console.log('定时器执行完了');
    resolve();
  }, 1000);
});
// 以下一行eslint检查忽略
// eslint-disable-next-line
console.log(promise);
