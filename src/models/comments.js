import { maxLengthDescription } from '../ultilites/constant';

class Comment {
  constructor(id, text, createdAt, author) {
    this._id = id;
    this.text = text;
    this._createdAt = createdAt;
    this._author = author;
  }

  get id() {
    return this._id;
  }

  set id(item) {
    throw new Error(`Can't change current id ${this._id}`);
  }

  get createdAt() {
    return this._createdAt;
  }

  set createdAt(item) {
    throw new Error(`Can't change date ${this._createdAt}`);
  }

  get author() {
    return this._author;
  }

  set author(item) {
    throw new Error(`Can't change author ${this._author}`);
  }

  static validate(comment) {
    const keysComment = ['_id', 'text', '_createdAt', '_author'];

    const isAllKey = keysComment.every((item) => Object.keys(comment).includes(item));
    if (!isAllKey) return false;

    const validateId = typeof comment._id === 'string' && comment._id.trim().length;
    const validateText = typeof comment.text === 'string'
      && comment.text.length <= maxLengthDescription
      && comment.text.trim().length;
    // const validateCreatedAt = comment._createdAt instanceof Date;
    const validateAauthor = typeof comment._author === 'string' && comment._author.length;

    return !!(
      validateId
        && validateText
        && validateAauthor
        //  && validateCreatedAt
        && true
    );
  }
}
export default Comment;
