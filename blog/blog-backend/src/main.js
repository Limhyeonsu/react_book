require('dotenv').config();
import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import mongoose from 'mongoose';
import api from './api';
import jwtMiddleware from './lib/jwtMiddleware';
//비구조화 할당을 통해 process.env 내부 값에 대한 레퍼런스 만들기
//Node.js에서 환경변수는 process.env 값을 통해 조회할 수 있다.
const { PORT, MONGO_URL } = process.env;
const app = new Koa();

const router = new Router();

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });

//라우터 설정
router.use('/api', api.routes());

//라우터 적용 전에 bodyParser 적용
app.use(bodyParser());
app.use(jwtMiddleware);

//app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

//PORT가 지정되어 있지 않다면 4000을 사용
const port = PORT || 4000;
app.listen(port, () => {
  console.log('Listening to port %d', port);
});
