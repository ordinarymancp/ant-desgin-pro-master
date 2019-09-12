import { Request, Response } from 'express';
import {
  readdirSync,
  statSync,
  writeFile,
  readFile,
  createReadStream,
  createWriteStream,
  stat,
  readdir,
  ensureDirSync,
  rename,
} from 'fs';
import { resolve, join } from 'path';
import { formidable } from 'formidable/lib/index';
import { createServer } from 'http';
// 代码中会兼容本地 service mock 以及部署站点的静态数据s
// const {readFile} = require('fs');
export default {
  // // 支持值为 Object 和 Array
  // 'POST /api/files': (req,res) =>{
  //   console.log(req.body)
  //     readFile(  __dirname + '/1.jpg', ( respon )=> {
  //     res.send({
  //       status: 'ok',
  //       name: respon,
  //     })
  //   })
  // },
  'POST /upload': (req, resp) => {
    console.log('_________________uploadStart!');
    var form = new formidable.IncomingForm({
      uploadDir: __dirname,
    });
    console.log('_________________uploadStart!!!!!!!');
    form.parse(req, function(err, fields, file) {
      let index = fields.index;
      let total = fields.total;
      let fileMd5Value = fields.fileMd5Value;
      let folder = resolve(__dirname, fileMd5Value);
      folderIsExit(folder).then(val => {
        let destFile = resolve(folder, fields.index);
        console.log('_________________uploadLoading!!!!!111111111111');
        console.log('----------->', file.data.path, destFile);
        copyFile(file.data.path, destFile).then(
          successLog => {
            resp.send({
              stat: 1,
              desc: index,
            });
          },
          errorLog => {
            resp.send({
              stat: 0,
              desc: 'Error',
            });
          },
        );
      });
    });
    // 文件夹是否存在, 不存在则创建文件
    function folderIsExit(folder) {
      console.log('folderIsExit', folder);
      return new Promise(async (resolve, reject) => {
        let result = await ensureDirSync(join(folder));
        console.log('result----', result);
        resolve(true);
      });
    }
    // 把文件从一个目录拷贝到别一个目录
    function copyFile(src, dest) {
      let promise = new Promise((resolve, reject) => {
        rename(src, dest, err => {
          if (err) {
            reject(err);
          } else {
            resolve('copy file:' + dest + ' success!');
          }
        });
      });
      return promise;
    }
  },

  'GET /check/file': (req, resp) => {
    let query = req.query;
    let fileName = query.fileName;
    let fileMd5Value = query.fileMd5Value;
    let uploadDir = __dirname;
    // 获取文件Chunk列表
    getChunkList(join(uploadDir, fileName), join(uploadDir, fileMd5Value), data => {
      resp.send(data);
    });
    // 文件或文件夹是否存在
    function isExist(filePath) {
      return new Promise((resolve, reject) => {
        stat(filePath, (err, stats) => {
          // 文件不存在
          if (err && err.code === 'ENOENT') {
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    }

    // 列出文件夹下所有文件
    function listDir(path) {
      return new Promise((resolve, reject) => {
        readdir(path, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          // 把mac系统下的临时文件去掉
          if (data && data.length > 0 && data[0] === '.DS_Store') {
            data.splice(0, 1);
          }
          resolve(data);
        });
      });
    }
    function concat(files, destination, cb) {
      var async = require('async');

      async.waterfall([async.apply(read, files), async.apply(write, destination)], cb);
    }
    function write(destination, buffers, cb) {
      writeFile(destination, Buffer.concat(buffers), cb);
    }

    function read(files, cb) {
      require('async').mapSeries(files, readFile, cb);
    }
    // 合并文件
    async function getChunkList(filePath, folderPath, callback) {
      let isFileExit = await isExist(filePath);
      let result = {};
      // 如果文件(文件名, 如:node-v7.7.4.pkg)已在存在, 不用再继续上传, 真接秒传
      if (isFileExit) {
        result = {
          stat: 1,
          file: {
            isExist: true,
            name: filePath,
          },
          desc: 'file is exist',
        };
      } else {
        let isFolderExist = await isExist(folderPath);
        console.log(folderPath);
        // 如果文件夹(md5值后的文件)存在, 就获取已经上传的块
        let fileList = [];
        if (isFolderExist) {
          fileList = await listDir(folderPath);
        }
        result = {
          stat: 1,
          chunkList: fileList,
          desc: 'folder list',
        };
      }
      callback(result);
    }
  },
  'GET /merge': (req, resp) => {
    let query = req.query;
    let md5 = query.md5;
    let size = query.size;
    let fileName = query.fileName;
    let uploadDir = __dirname;
    function concat(files, destination, cb) {
      var async = require('async');

      async.waterfall([async.apply(read, files), async.apply(write, destination)], cb);
    }
    function write(destination, buffers, cb) {
      writeFile(destination, Buffer.concat(buffers), cb);
    }

    function read(files, cb) {
      require('async').mapSeries(files, readFile, cb);
    }
    function listDir(path) {
      return new Promise((resolve, reject) => {
        readdir(path, (err, data) => {
          if (err) {
            reject(err);
            return;
          }
          // 把mac系统下的临时文件去掉
          if (data && data.length > 0 && data[0] === '.DS_Store') {
            data.splice(0, 1);
          }
          resolve(data);
        });
      });
    }
    async function mergeFiles(srcDir, targetDir, newFileName, size) {
      console.log(...arguments);
      let targetStream = createWriteStream(join(targetDir, newFileName));
      let fileArr = await listDir(srcDir);
      // 把文件名加上文件夹的前缀
      for (let i = 0; i < fileArr.length; i++) {
        fileArr[i] = srcDir + '/' + fileArr[i];
      }
      console.log(fileArr);
      concat(fileArr, join(targetDir, newFileName), () => {
        console.log('Merge Success!');
      });
    }
    mergeFiles(join(uploadDir, md5), uploadDir, fileName, size);
    resp.send({
      stat: 1,
    });
  },
  'GET /api/currentUser': {
    name: 'Serati Ma',
    avatar: 'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
    userid: '00000001',
    email: 'antdesign@alipay.com',
    signature: '海纳百川，有容乃大',
    title: '交互专家',
    group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
    tags: [
      {
        key: '0',
        label: '很有想法的',
      },
      {
        key: '1',
        label: '专注设计',
      },
      {
        key: '2',
        label: '辣~',
      },
      {
        key: '3',
        label: '大长腿',
      },
      {
        key: '4',
        label: '川妹子',
      },
      {
        key: '5',
        label: '海纳百川',
      },
    ],
    notifyCount: 12,
    unreadCount: 11,
    country: 'China',
    geographic: {
      province: {
        label: '浙江省',
        key: '330000',
      },
      city: {
        label: '杭州市',
        key: '330100',
      },
    },
    address: '西湖区工专路 77 号',
    phone: '0752-268888888',
  },
  // GET POST 可省略
  'GET /api/users': [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park',
    },
  ],
  'POST /api/login/account': (req: Request, res: Response) => {
    const { password, userName, type } = req.body;
    if (password === 'ant.design' && userName === 'admin') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'admin',
      });
      return;
    }
    if (password === 'ant.design' && userName === 'user') {
      res.send({
        status: 'ok',
        type,
        currentAuthority: 'user',
      });
      return;
    }
    res.send({
      status: 'error',
      type,
      currentAuthority: 'guest',
    });
  },
  'POST /api/save': (req: Request, res: Response) => {
    var inputFile =
      'C:\\前端文件\\React资料\\第三章 ：构建可维护可扩展的前端应用\\22  前端项目的理想架构：可维护，可扩展，可测试，易开发，易建构.mp4';
    var outputFile = './public/video/1.mp4';

    var input = createReadStream(inputFile);
    var output = createWriteStream(outputFile);
    const timer = setInterval(printMemoryUsage, 1000);
    input.on('data', function(chunk) {
      output.write(chunk);
    });

    input.on('end', function() {
      output.end(function() {
        printMemoryUsage();
        clearInterval(timer);
      });
    });

    // 打印内存占用情况
    function printMemoryUsage() {
      var info = process.memoryUsage();
      function mb(v) {
        return (v / 1024 / 1024).toFixed(2) + 'MB';
      }
      console.log(
        'rss=%s, heapTotal=%s, heapUsed=%s',
        mb(info.rss),
        mb(info.heapTotal),
        mb(info.heapUsed),
      );
    }
    // var imgData = req.body.url;
    // console.log(imgData)
    // //过滤data:URL
    // var base64Data = imgData.replace(/^data:image\/\w+;base64,/, "");
    // var dataBuffer = new Buffer(base64Data, 'base64');
    // readFile('./public/image/index.jpg',(error,data) => {
    //   res.send(data)
    // })
    // writeFile('./public/image/' + req.url.name, req.url, () => {
    //   console.log('11111111')
    // })
  },
  'POST /api/register': (req: Request, res: Response) => {
    res.send({ status: 'ok', currentAuthority: 'user' });
  },
  'GET /api/500': (req: Request, res: Response) => {
    res.status(500).send({
      timestamp: 1513932555104,
      status: 500,
      error: 'error',
      message: 'error',
      path: '/base/category/list',
    });
  },
  'GET /api/404': (req: Request, res: Response) => {
    res.status(404).send({
      timestamp: 1513932643431,
      status: 404,
      error: 'Not Found',
      message: 'No message available',
      path: '/base/category/list/2121212',
    });
  },
  'GET /api/403': (req: Request, res: Response) => {
    res.status(403).send({
      timestamp: 1513932555104,
      status: 403,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
  'GET /api/401': (req: Request, res: Response) => {
    res.status(401).send({
      timestamp: 1513932555104,
      status: 401,
      error: 'Unauthorized',
      message: 'Unauthorized',
      path: '/base/category/list',
    });
  },
};
