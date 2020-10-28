# 数据库创建SQL

```sql
-- 数据库Database of PaperHub
CREATE DATABASE DBPH CHARACTER SET gbk COLLATE gbk_chinese_ci;
use DBPH;
-- 表users
CREATE TABLE users (
      userID CHAR(10) PRIMARY KEY NOT NULL,
      password CHAR(25) NOT NULL
);
-- 表admin
CREATE TABLE admin (
      adminID CHAR(10) PRIMARY KEY NOT NULL,
      password CHAR(25) NOT NULL
);
-- 表categories
CREATE TABLE categories (
      categoryID INTEGER PRIMARY KEY AUTO_INCREMENT,
      categoryName CHAR(100) NOT NULL,
      isPublic TINYINT NOT NULL,
      userID CHAR(10) REFERENCES users(userID)
);
-- 表papers
CREATE TABLE papers (
      paperID INTEGER PRIMARY KEY AUTO_INCREMENT,
      url CHAR(100) NOT NULL,
      title CHAR(50) NOT NULL,
      author CHAR(50) NOT NULL,
      description VARCHAR(250) NOT NULL,
      categoryID CHAR(10) REFERENCES categories(categoryID)
);
-- 表comments
CREATE TABLE comments (
      commentID INTEGER PRIMARY KEY AUTO_INCREMENT,
      content  VARCHAR(500) NOT NULL,
      date TIMESTAMP DEFAULT CURRENT_TIMESTAMP(),
      userID CHAR(10) REFERENCES users(userID),
      categoryID CHAR(10) REFERENCES categories(categoryID)
);
```



# 管理员相关操作

## API

| 序号 | 作用         | 接口地址    | 请求方式 | 参数              | 返回信息             |
| ---- | ------------ | ----------- | -------- | ----------------- | -------------------- |
| 1    | 管理员登录   | /adminLogin | post     | adminID, password | 'success' or 'error' |
| 2    | 查看所有文章 |             |          |                   |                      |

## SQL

| 序号 | SQL                                                 | 备注           |
| ---- | --------------------------------------------------- | -------------- |
| 1    | `select password from admin where adminID='admin';` | 对密码逻辑验证 |

# 用户相关操作

## API

| 序号 | 作用         | 接口地址    | 请求方式 | 参数             | 返回信息             |
| ---- | ------------ | ----------- | -------- | ---------------- | -------------------- |
| 2    | 用户登录     | /signIn     | post     | userID, password | 'success' or 'error' |
| 3    | 用户注册     | /signUp     | post     | userID, password | 'success' or 'error' |
| 4    | 用户信息修改 | /updateUser | post     | password         | 'success' or 'error' |
| 5    | 用户删除     | /deleteUser | post     | userID           | 'success' or 'error' |

## SQL

| 序号 | SQL                                                    | 备注 |
| ---- | ------------------------------------------------------ | ---- |
| 2    | `select password from users where userID='user1';`     |      |
| 3    | `insert into users values ('user', 'pwd');`            |      |
| 4    | `update users set password='pwd' where userID='user';` |      |
| 5    | `delete from users where userID='user';`               |      |

# 分类相关

* `categoryInfo = {categoryID, categoryName, isPublic, userID}`

## API

| 序号 | 作用         | 接口地址                | 请求方式 | 参数                               | 返回信息             |
| ---- | ------------ | ----------------------- | -------- | ---------------------------------- | -------------------- |
| 6    | 增加分类     | /createCategory         | post     | categoryName, userID, isPublic     | categoryID           |
| 7    | 删除分类     | /deleteCategory         | post     | categoryID                         | 'success' or 'error' |
| 8    | 查看分类     | /retrieveCategory       | get      | userID                             | categoryInfo list    |
| 9    | 查看公共分类 | /retrievePublicCategory | get      | isPublic('True' or 'False')        | categoryInfo list    |
| 10   | 更改分类     | /updateCategory         | post     | categoryID, categoryName, isPublic | 'success' or 'error' |

## SQL

| 序号 | SQL                                                          | 备注 |
| ---- | ------------------------------------------------------------ | ---- |
| 6    | `insert into categories values (null, categoryName, isPublic, userID);` |      |
| 7    | `delete from categories where categoryID='c';`               |      |
| 8    | `select * from categories where userID='user';`              |      |
| 9    | `select * from categories where isPublic='True';`            |      |
| 10   | `update categories set category set categoryName="c", isPublic="True";` |      |

# 论文相关

* `paperInfo = {paperID, url, title, author, description, categoryID}`

## API

| 序号 | 作用     | 接口地址       | 请求方式 | 参数                                     | 返回信息             |
| ---- | -------- | -------------- | -------- | ---------------------------------------- | -------------------- |
| 10   | 增加论文 | /createPaper   | post     | url, title, author, description          | paperID              |
| 11   | 删除论文 | /deletePaper   | post     | paperID                                  | 'success' or 'error' |
| 12   | 查看论文 | /retrievePaper | get      | categoryID                               | paperInfo list       |
| 13   | 更改论文 | /updatePaper   | post     | paperID, url, title, author, description | 'success' or 'error' |

## SQL

| 序号 | SQL  | 备注 |
| ---- | ---- | ---- |
| 10   |      |      |
| 11   |      |      |
| 12   |      |      |
| 13   |      |      |

# 评论相关

## API

| 序号 | 作用     | 接口地址         | 请求方式 | 参数                                | 返回信息         |
| ---- | -------- | ---------------- | -------- | ----------------------------------- | ---------------- |
| 14   | 发布评论 | /creatComment    | post     | userName, content, data, categoryID | commentID        |
| 15   | 查看评论 | /retrieveComment | get      | categoryID                          | commentInfo list |

## SQL

| 序号 | SQL  | 备注 |
| ---- | ---- | ---- |
| 14   |      |      |
| 15   |      |      |

# 数据库功能添加

1. 为表添加 优化，索引，在表的设计体现
2. 实体完整性&参照完整性，表的设计已体现
3. 存储过程，触发器
4. 管理员界面一键数据库备份，一键加载数据库
5. 并发控制

