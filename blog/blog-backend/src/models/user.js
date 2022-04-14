import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const UserSchema = new Schema({
  username: String,
  hashedPassword: String,
});
// 인스턴스 메서드 생성, 화살표 함수가 아닌 function 키워드를 사용하여 구현한다. 이유는 this에 접근하기 위해서
// 비밀번호 설정
UserSchema.methods.setPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.hashedPassword = hash;
};
// 비밀번호가 일치하는지 검증
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.hashedPassword);
  return result;
};

// 스태틱 메서드 생성
// 스태틱 메서드 내에서 this는 모델을 가리킨다.
UserSchema.statics.findByUsername = function (username) {
  return this.findOne({ username });
};

UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.hashedPassword;
  return data;
};

UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    //payload : 토큰안에 집어 넣고 싶은 데이터를 넣는다.
    {
      _id: this.id,
      username: this.username,
    },
    //JWT 암호를 넣는다.
    process.env.JWT_SECRET,
    //Option :
    {
      expiresIn: '7d', //7일동안 유효
    },
  );
  return token;
};

const User = mongoose.model('User', UserSchema);
export default User;
