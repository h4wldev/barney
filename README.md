<p align="center">
    <img height="70" src="https://cloud.githubusercontent.com/assets/14465407/26762772/b2ff5d68-4982-11e7-8fc2-6b022a5d319b.png"/><br>
    <span style>you can make restful api router, easier with Barney</span><br><br>
    <a href="https://github.com/h4wldev/cardly/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
</p>


## Decription
Cottage-Barney is a `restful api router` made with [therne/cottage](https://github.com/therne/cottage). this router support middleware, HTTP status, URI param, and etc..

## Get started
### Installation
```bash
$ npm install --save cottage-barney
```

### Example
```js
const cottage = require('cottage');
const Router = require('cottage-barney');

const app = cottage();
const router = new Router(app);

class Index {
    // this.params => URI params object like '/:id'
    // this.query => GET query object
    // this.req => koa.Request
    // this.req.body => Body object
    // this.res => koa.Response

    get() {
        // Do something!
        this.res.status = Router.status.OK; // We're support http status code's with 'david/http-status'
        return 'GET METHOD';
    }
    post() {
        // Do something!
        return 'POST METHOD';
    }
    delete() {
        // Do something!
        return 'DELETE METHOD';
    }
}

router.set('/', new Index());
router.set('/what/:id', new Index()); // barney also support uri param

app.listen(8080);
```

### Middleware Usage
```js
const cottage = require('cottage');
const Router = require('cottage-barney');

const app = cottage();
const router = new Router(app);

const middleware = function(router) { // 1 argument is required
    router.res["status"] = Router.status.CREATED; // You can handling resposne, request, params, query
};

router.use([ middleware ]);
router.set('/', new Route());

/*
Middleware can use with children.
router.set('', {}, [
    {
        path: '/',
        route: new Route(),
        middlewares: [
            function(route) {
                // You can use middleware like this
                console.log("This is index!");
            }
        ]
    }
]);
 */

app.listen(8080);
```


## Documentations
- API Documentation *TBA*
- Samples *TBA*

## License : MIT
