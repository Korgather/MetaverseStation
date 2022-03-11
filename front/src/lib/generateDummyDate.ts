import shortId from 'shortid';
import faker from 'faker';

export const generateDummyPost = (number: number) =>
  Array(number)
    .fill('')
    .map(() => ({
      id: shortId.generate(),
      User: {
        id: shortId.generate(),
        nickname: faker.name.findName(),
        profile_image: faker.image.cats(),
      },
      content: faker.lorem.paragraph(),
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
      Comments: [
        {
          User: {
            id: 'eungwang',
            nickname: faker.name.findName(),
            profile_image: faker.image.cats(),
          },
          content: faker.lorem.sentence(),
          created_at: '2022-03-11',
          replies: [
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
          ],
        },
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
            profile_image: faker.image.cats(),
          },
          content: faker.lorem.sentence(),
          created_at: '2022-03-11',
          replies: [
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: 'eungwang',
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
          ],
        },
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
            profile_image: faker.image.cats(),
          },
          content: faker.lorem.sentence(),
          created_at: '2022-03-11',
          replies: [
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
          ],
        },
        {
          User: {
            id: shortId.generate(),
            nickname: faker.name.findName(),
            profile_image: faker.image.cats(),
          },
          content: faker.lorem.sentence(),
          created_at: '2022-03-11',
          replies: [
            {
              content: faker.lorem.sentence(),
              created_at: '2022-03-11',
              User: {
                id: shortId.generate(),
                nickname: faker.name.findName(),
                profile_image: faker.image.cats(),
              },
            },
          ],
        },
      ],
    }));
