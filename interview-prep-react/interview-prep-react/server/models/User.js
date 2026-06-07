import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name:       { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true, minlength: 4 },
  university: { type: String, default: '' },
  joinDate:   { type: String, default: () => new Date().toISOString().split('T')[0] },
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

userSchema.methods.toProfile = function () {
  return {
    id: this._id,
    name: this.name,
    email: this.email,
    university: this.university,
    joinDate: this.joinDate,
  };
};

export default mongoose.model('User', userSchema);
