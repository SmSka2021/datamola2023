const maxLengthDescription = 280;

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
    const validateCreatedAt = comment._createdAt instanceof Date;
    const validateAauthor = typeof comment._author === 'string' && comment._author.length;

    return !!(
      validateId
        && validateText
        && validateAauthor
        && validateCreatedAt
        && true
    );
  }
}

const newComment = new Comment(
  '15',
  'Разработать navigation',
  new Date('2022-12-27T23:00:00'),
  'Сидоренко',
);

const newCommentFalse = new Comment(
  '15',
  'Разработать navigation',
  '2022-12-27T23:00:00',
  'Сидоренко',
);

console.log('validate comment: ', Comment.validate(newComment));
console.log('validate comment: ', Comment.validate(newCommentFalse));
// console.log('idNewComment: ', newComment.id);
// newComment.id = '777';
// console.log('author comment: ', newComment.author);
// newComment.author = 'Вася';
console.log('data comment: ', newComment.createdAt);
newComment.createdAt = new Date();
