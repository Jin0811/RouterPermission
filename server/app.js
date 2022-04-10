const express = require('express');
const app = express();
const port = 3000;

// 测试接口
app.get('/', (req, res) => {
  res.send('Hello World!')
});


/**
 * 登录接口
 * 登录成功之后，会返回一个token
 * 
 * 注意：这里的token，由于是演示项目，直接采用了用户名 + 时间戳的方式
 * 真实项目当中，token应该是根据用户id、用户信息、过期时间等生成的
 */
app.get('/api/login', (req, res) => {
  let { query: { userName } } = req;
  res.send({
    code: 200,
    success: true,
    token: `${userName}/${Date.now()}`,
  });
});


/**
 * 获取用户信息接口
 * 携带token，请求此接口后，会返回当前这个用户的信息，如权限等
 * 
 * 用户名和角色对应关系：
 * user1  -->  admin
 * user2  -->  teacher
 * user3  -->  student
 */
app.get('/api/getUserInfo', (req, res) => {
  let { headers: { token } } = req;
  if(!token){
    res.send({ code: 401, success: false, msg: "token不存在" });
    return;
  }
  // 因为生成token的时候，采用的是用户名+时间戳的形式，所以这里分割一下，得到用户名
  let userName = token.split("/")[0];
  let role = "";
  switch (userName) {
    case "user1":
      role = "admin";
      break;
    case "user2":
      role = "teacher";
      break;
    case "user3":
      role = "student";
      break;
    default:
      break;
  }
  if(role){
    res.send({ code: 200, success: true, role });
  }else{
    res.send({ code: 401, success: false, msg: "用户不存在" });
  }
});


// 监听端口
app.listen(port, () => {
  console.log(`App listening on port ${port} http://127.0.0.1:3000`)
});
