import mongoose from 'mongoose';

//스키마 생성
const { Schema } = mongoose;
const PostSchema = new Schema({
  title: String,
  body: String,
  tags: [String],
  publishedDate: {
    type: Date,
    default: Date.now,
  },
  //포스트 작성시 로그인을 해야만 작성할 수 있음.
  user: {
    _id: mongoose.Types.ObjectId,
    username: String,
  },
});

//모델 생성
const Post = mongoose.model('Post', PostSchema);
export default Post;
