// 会员信息管理路由文件
var express = require('express');
var student = require('../model/student')
var router = express.Router();

//  浏览用户信息
router.get('/', function (req, res, next) {
  student.findAll((err, data) => {
    if (err) {
      res.status(500).send({ error: '获取用户信息失败' })
    }
    res.render("student/index.html", { stulist: data });
  })
});

// 加载用户信息
router.get('/add', function (req, res, next) {
  // res.send('加载添加用户信息表单');
  res.render("student/add.html")

});

//添加用户信息
router.post('/add', function (req, res, next) {
  student.save(req.body, (err) => {
    if (err) {
      res.status(500).send({ error: '用户信息添加失败' })
    }
    // 添加成功后返回首页
    res.redirect('/student')
  })
})

// 修改用户信息
router.get('/edit', function (req, res, next) {
  student.findById(req.query.id, (err, data) => {
    if (err) {
      res.status(500).send({ error: '没有找到需要修改的用户信息' })
    }
    // 加载修改表单模板，将获取的信息放置进去
    res.render('student/edit.html', { student: data });
  })
});

// 执行用户信息修改
router.post('/edit', function (req, res, next) {
  student.updateById(req.body, (err) => {
    if (err) {
      res.status(500).send({ error: '用户信息修改失败' })
    }
    // 修改成功后返回首页
    res.redirect('/student')
  })
});

// 删除用户信息
router.get('/delete', function (req, res, next) {
  student.deleteById(req.query.id, (err) => {
    if (err) {
      res.status(500).send({ error: '删除用户信息失败' })
    }
    // 删除后返回首页
    res.redirect('/student')
  })
});
// 5.查询用户信息  
router.get('/student', function (req, res, next) {
  student.findByQuery(req.query.search, (err, data) => {
    if (err) {
      res.status(500).send({ error: '获取会员信息失败！' });
    } else if (data[0] == undefined) {
      res.status(500).send({ error: '没有找到该会员！' });
    } else {
      res.render('/student', { student: data, query: req.query.student });
    }
  })
})
module.exports = router;
