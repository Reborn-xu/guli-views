"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getList = getList;
exports.save = save;
//export声明的方法 可以被别的js调用
function getList() {
    console.log("getList");
}

function save() {
    console.log("savd");
}