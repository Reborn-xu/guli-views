'use strict';

var a = 2;
{
  var _a = 3;
  document.write(_a); // 3
}
document.write('<br>');
document.write(a); // 2