# Expressとは

ExpressとはNode.jsで利用できるWebアプリケーションフレームワークの一つ｡Webやモバイルアプリケーションの開発に必要な機能を提供する｡
主に

- HTTPリクエストに返答するためのミドルウェア
- HTTPとURLに従ってルーティング
- テンプレートを利用したHTMLページのレンダリング

を行う｡

# Expressのインストール

```
npm install express
npm install body-parser cookie-parser multer
```

Expressとそのほか必要なライブラリをインストールする｡

- body-parser - JSON､生データ､テキスト､URLを取得するためのもの
- cookie-parser - クッキーを操作するためのもの
- multer - フォームを扱うためのもの

# Hello World

簡単なサーバーを作成する｡server.jsに以下の内容を書き込む｡

```
var express = require("express")
var app = express()

app.get("/", (req, res) => {
    res.send("Hello World")
})

var server = app.listen(8081, () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

その後､

```
node server.js
```

を実行することで､サーバーを立ち上げることができる｡localhost:8081にアクセスすることで`Hello World`というレスポンスを取得することができる｡

# ResponseオブジェクトとRequestオブジェクト

これらのオブジェクトは以下のようにしたときに受け取ることができる｡

```
app.get("/", (req, res) => {
    ...
})
```

ここで､reqがRequestオブジェクト､resがResponseオブジェクトである｡これらはHTTPのヘッダーやボディ､クッキーなどの情報を含んでいる｡これらを利用することでバックエンドの処理を行う｡

# ルーティング

簡単なルーティングの例を以下に示す｡

```javascript:routing.js
var express = require("express")
var app = express()

app.get("/", (req, res) => {
    console.log("GET a GET request for the homepage.")
    res.send("Hello GET")
})

app.post("/", (req, res) => {
    console.log("Got a POST request for the homepage.")
    res.send("Hello POST")
})

app.delete("/del_user", (req, res) => {
    console.log("Got a DELETE request for homepage.")
    res.send("Hello DELETE")
})

app.get("/list_user", (req, res) => {
    console.log("Got a GET request for /list_user")
    res.send("Page Listing")
})

app.get("/ab*cd", (req, res) => {
    console.log("Got a GET request for /ab*cd")
    res.send("Page Pattern Match")
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

上記の例は

```
node routing.js
```

で実行することができる｡localhost:8081に対してGETやPOSTを行うことで上記の処理に示してあるような動作が行われる｡

# 静的ファイルの配信

`app.use(express.static('フォルダ名'))`を利用することで静的ファイルの配信を行うことができる｡

```
var express = require("express")
var app = express()

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.send("Hello World")
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

上記の内容は

```
node static.js
```

で実行することができる｡実行後､`localhost:8081/text.txt`にアクセスすることで､text.txtの内容をブラウザから閲覧することができる｡

# GETリクエスト

GETリクエストを受けたときに処理を行う例として以下を示す｡

```
const { response } = require("express")
var express = require("express")
var app = express()

app.use(express.static("public"))
app.get("/index.html", (req, res) => {
    res.sendFile(`${__dirname}/index.html`)
})

app.get("/process_get", (req, res) => {
    var response = {
        first_name: req.query.first_name,
        last_name: req.query.last_name,
    }

    console.log(response)
    res.end(JSON.stringify(response))
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

上記の例は

```
node get.js
```

で実行することができる｡`localhost:8081/`にアクセスすることで入力フォームを取得することができ､フォームを入力後､Submitを行うと`localhost:8081/process_get`に移動し､入力内容に合わせたJSONが返答される｡

# POST

POSTメソッドを処理する内容を以下に示す｡

```
var express = require("express")
var app = express()
var bodyParser = require("body-parser")
const { response } = require("express")

var urlencodedParser = bodyParser.urlencoded({extended: false})

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index-post.html`)
})

app.post("/process_post", urlencodedParser, (req, res) => {
    var response = {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
    }
    console.log(response)
    res.end(JSON.stringify(response))
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

上記の内容は

```
node post.js
```

で実行することができる｡get.jsでGETで行っていた内容をPOSTで行っている｡

# File Upload

ファイルアップロードにはmulterを利用する｡multerはreqから送られてくる情報からファイルの部分データを受け取り､1つのファイルに統合するためのモジュールである｡multerを使ったファイルアップロードのプログラムを以下に示す｡

```
var express = require("express")
var app = express()
var fs = require("fs")

var bodyParser = require("body-parser")
var multer = require("multer")

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(multer({dest: "./tmp/"}).single("file"))

app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index-file-upload.html`)
})

app.post("/file_upload", (req, res) => {
    console.log(req.file)
    console.log(req.file.originalname)
    console.log(req.file.path)
    console.log(req.file.mimetype)
    var file = `${__dirname}/public/uploaded/${req.file.originalname}`

    fs.readFile(req.file.path, (err, data) => {
        fs.writeFile(file, data, (err) => {
            if (err) {
                console.log(err)
            } else {
                var response = {
                    message: "File uploaded successfully",
                    filename: req.file.originalname
                }
            }

            console.log(response)
            res.end(JSON.stringify(response))
        })
    })
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

上記のプログラムは

```
node file-upload.js
```

で実行することができる｡これでアップロードしたファイルは一時ファイルが./tmpフォルダに格納され､本体が./public/uploadedに保存される｡

# REST architecture

RESTはREpresentational State Transferの略称｡標準的なアーキテクチャーであり､HTTPプロトコルである｡
RESTサーバーはリソースへの接続と編集をHTTPを通じて可能にする｡RESTは以下の4つのメソッドで使われる｡

- GET - 読み取り専用のリソースへに利用される
- PUT - 新たにリソースを作成するために利用される
- DELETE - リソースを削除するために利用される
- POST - 存在するリソースのアップデートや作成に利用される

以下のJSONに従ってRESTfulサーバーを作成する｡

```json:users.json
{
    "user1": {
        "name": "mahesh",
        "password": "password",
        "profession": "teacher",
        "id": 1
    },

    "user2": {
        "name": "suresh",
        "password": "password2",
        "profession": "librarian",
        "id": 2
    }, 

    "user3": {
        "name": "ramesh",
        "password": "password3",
        "profession": "clerk",
        "id": 3
    }
}
```

上記の情報に合わせて以下の表のようなRESTful APIの作成を行う｡

|Sr.No|URI|HTTP Method|POST body|Result|
|----|----|----|----|----|
|1|listUsers|GET|empty|Show list of all the users.|
|2|addUser|POST|JSON String|Add details of new user.|
|3|deleteUser|DELETE|JSON String|Delete an existing user.|
|4|:id|GET|empty|Show details of a user.|

上記の動作を行うRESTful APIのプログラムを以下に示す｡

```
var express = require("express")
var app = express()
var fs = require("fs")

app.get("/listUsers", (req, res) => {
    fs.readFile(`${__dirname}/public/users.json`, "utf8", (err, data) => {
        console.log(data)
        res.end(data)
    })
})

var user = {
    "user4": {
        "name": "mohit",
        "password": "password4",
        "profession": "teacher",
        "id": 4
    }
}

app.post("/addUser", (req, res) => {
    fs.readFile(`${__dirname}/public/users.json`, "utf8", (err, data) => {
        data = JSON.parse(data)
        data["user4"] = user["user4"]
        console.log(data)
        res.end(JSON.stringify(data))
    })
})

app.get("/:id", (req, res) => {
    fs.readFile(`${__dirname}/public/users.json`, "utf8", (err, data) => {
        var users = JSON.parse(data)
        var user = users["user" + req.params.id]
        console.log(user)
        res.end(JSON.stringify(user))
    })
})

app.delete("/deleteUser", (req, res) => {
    fs.readFile(`${__dirname}/public/users.json`, "utf8", (err, data) => {
        data = JSON.parse(data)
        delete data["user" + 2]

        console.log(data)
        res.end(JSON.stringify(data))
    })
})

var server = app.listen(8081, "localhost", () => {
    var host = server.address().address
    var port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})
```

