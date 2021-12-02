var fs = require('fs');
var path = require('path');


//解析需要遍历的文件夹
const pathList = __dirname.replace(/\\/g, "/").split('/');
pathList.reverse();
pathList.splice(0, 1);
pathList.reverse();
const set_path = pathList.join("/");

var filePath = path.resolve(`${set_path}/src/static/products`);

//调用文件遍历方法

const fileList = [];

/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath, end) {
    //根据文件路径读取文件，返回文件列表
    fs.readdir(filePath, function (err, files) {
        if (err) {
            console.warn(err)
        } else {
            //遍历读取到的文件列表
            files.forEach(function (filename, i) {
                //获取当前文件的绝对路径
                var filedir = path.join(filePath, filename);
                //根据文件路径获取文件信息，返回一个fs.Stats对象
                fs.stat(filedir, function (eror, stats) {
                    if (eror) {
                        console.warn('获取文件stats失败');
                    } else {
                        var isFile = stats.isFile();//是文件
                        var isDir = stats.isDirectory();//是文件夹
                        if (isFile && path.extname(filedir) === ".jpg") {
                            fileList.push(filedir);
                        }
                        if (isDir) {
                            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                        }
                        if (i === files.length - 1) {
                            end(fileList);
                        }
                    }
                })
            });
        }
    });
}


fileDisplay(filePath, (files) => {
    let str = "";
    const obj = {};
    files.forEach(element => {
        const _fileName = path.basename(element);
        str +=`import  img${_fileName.replace(".jpg","")} from '../static/products/${_fileName}'; \r\n`;
        obj[`img${_fileName.replace('.jpg', "")}`] = `img${_fileName.replace('.jpg', "")}`
    });
    fs.writeFile(`${set_path}/src/utils/iconUtil.js`,`${str.replace(/\"/g, "") } export default ${ JSON.stringify(obj).replace(/\"/g, "")}`, (err) => { })
});



