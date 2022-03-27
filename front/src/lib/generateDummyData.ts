import shortId from "shortid";
import faker from "faker";

export const generateReply = (number: number, postid: string, commentid: string) =>
  Array(number)
    .fill("")
    .map(() => {
      const rand_0_1 = Math.floor(Math.random() * 2);
      const UserId = ["eungwang", shortId.generate()][rand_0_1];
      return {
        postid: postid,
        commentid: commentid,
        id: shortId.generate(),
        content: faker.lorem.sentence(),
        created_at: "2022-03-11",
        User: {
          id: UserId,
          nickname: faker.name.findName(),
          profile_image: faker.image.cats(),
        },
      };
    });

export const generateComment = (number: number, postid: string) =>
  Array(number)
    .fill("")
    .map(() => {
      const rand_0_1 = Math.floor(Math.random() * 2);
      const rand_1_3 = 1 + Math.floor(Math.random() * 3);
      let commentid = shortId.generate();
      const UserId = ["eungwang", shortId.generate()][rand_0_1];
      return {
        postid: postid,
        id: commentid,
        User: {
          id: UserId,
          nickname: faker.name.findName(),
          profile_image: faker.image.cats(),
        },
        content: faker.lorem.sentence(),
        created_at: "2022-03-11",
        replies: generateReply(rand_1_3, postid, commentid),
      };
    });

export const generateDummyPost = (postCount: number, commentCount: number) =>
  Array(postCount)
    .fill("")
    .map(() => {
      let postid = shortId.generate();
      return {
        id: postid,
        User: {
          id: shortId.generate(),
          nickname: faker.name.findName(),
          profile_image: faker.image.cats(),
        },
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraph(),
        tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
        Images: [
          {
            src: faker.image.image(),
          },
          {
            src: faker.image.image(),
          },
          {
            src: faker.image.image(),
          },
          {
            src: faker.image.image(),
          },
        ],
        Comments: generateComment(commentCount, postid),
      };
    });
