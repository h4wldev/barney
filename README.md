<p align="center">
    <img height="70" src="https://cloud.githubusercontent.com/assets/14465407/26382772/b991861e-4069-11e7-99fe-bb90e885b5b7.png"/><br>
    <span style>you can make restful api router, easier with Barney</span><br><br>
    <a href="https://github.com/h4wldev/cardly/blob/master/LICENSE"><img src="https://img.shields.io/github/license/mashape/apistatus.svg?style=flat-square"></a>
</p>

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
    // this.res => koa.Response
    
    get() {
        // Do something!
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

router.use('/', new Index());

app.listen(8080);
```

## Documentations
- API Documentation *TBA*
- Samples *TBA*

## License : MIT
