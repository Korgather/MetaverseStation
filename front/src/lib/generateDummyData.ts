import shortId from 'shortid';
import faker from 'faker';

export const generateReply = (number: number, postid: string, commentId: string) =>
  Array(number)
    .fill('')
    .map(() => {
      const rand_0_1 = Math.floor(Math.random() * 2);
      const UserId = ['eungwang', shortId.generate()][rand_0_1];
      return {
        postid: postid,
        commentId: commentId,
        id: shortId.generate(),
        content: faker.lorem.sentence(),
        created_at: '2022-03-11',
        User: {
          id: UserId,
          username: faker.name.findName(),
          profileImageUrl: faker.image.cats(),
        },
      };
    });

export const generateComment = (number: number, postid: string) =>
  Array(number)
    .fill('')
    .map(() => {
      const rand_0_1 = Math.floor(Math.random() * 2);
      const rand_1_3 = 1 + Math.floor(Math.random() * 3);
      const commentId = shortId.generate();
      const userId = ['eungwang', shortId.generate()][rand_0_1];
      return {
        postid: postid,
        id: commentId,
        User: {
          id: userId,
          username: faker.name.findName(),
          profileImageUrl: faker.image.cats(),
        },
        content: faker.lorem.sentence(),
        created_at: '2022-03-11',
        postCommentReplyList: generateReply(rand_1_3, postid, commentId),
      };
    });

export const generateDummyPost = (postCount: number, commentCount: number) =>
  Array(postCount)
    .fill('')
    .map(() => {
      const postid = shortId.generate();
      return {
        id: postid,
        User: {
          userId: shortId.generate(),
          username: faker.name.findName(),
          profileImageUrl: faker.image.cats(),
        },
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        imageList: [faker.image.image(), faker.image.image(), faker.image.image()],
        Comments: generateComment(commentCount, postid),
      };
    });
