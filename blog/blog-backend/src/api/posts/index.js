import Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';
import checkLoggedIn from '../../lib/checkLoggedIn';
import { getPostById } from './posts.ctrl';

const posts = new Router();

posts.get('/', postsCtrl.list);
posts.post('/', checkLoggedIn, postsCtrl.write);

const post = new Router();
posts.get('/', postsCtrl.read);

posts.delete('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.remove);
posts.patch('/', checkLoggedIn, postsCtrl.checkOwnPost, postsCtrl.update);

posts.user('/:id', postsCtrl.getPostById, post.routes());

export default posts;
