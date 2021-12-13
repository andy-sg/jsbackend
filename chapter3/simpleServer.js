const http = require("http");
const url = require("url");

const userTemplate = (user) => {
  return `
  <html>
  <body>
  <h1>User info </h1>
  name : ${user.name} <br />
  age : ${user.age}
  </body>
  </html>
  `;
};

const user = (req, res) => {
  console.log(req);
  const query = url.parse(req.url, true).query;
  console.log(query);
  // const user = {
  //   name: "andy",
  //   age: "30",
  // };

  res.end(userTemplate(query));
};

const loginTemplate = `<html>
<input type="text" placeholer="userid" /> <br />
<input type="password" /> <br />
<input type="submit" value="login">  
</html>`;
const login = (req, res) => {
  res.end(loginTemplate);
};

const notFoundTemplate = `
<h1>404 page not found</h1>
`;

const notFound = (req, res) => {
  res.end(notFoundTemplate);
};

const notAllowdMethod = (req, res) => {
  res.end(`${req.method} is not allowed http method`);
};

http
  .createServer((req, res) => {
    const path = url.parse(req.url, true).pathname;
    res.setHeader("Content-Type", "text/html");

    if (req.method !== "GET") {
      notAllowdMethod(req, res);
      return;
    }

    if (path === "/user") {
      user(req, res);
    } else if (path === "/login") {
      login(req, res);
    } else {
      notFound(req, res);
    }
  })
  .listen(3000, () => {
    console.log("서버 시작! 3000번 포트 사용");
  });
