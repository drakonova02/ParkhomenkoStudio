// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const img = ['/img/banner/Пархоменко_Ранок_2006,_20_30,_ДВП,_олія.jpg']

module.exports = {
  async up(db) {
    return db.collection('blog').insertMany(
      [...Array(10)].map(() => {
        return {
          category: 'blog',
          date: faker.date.past(),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          author: faker.internet.userName(),
          images: getRandomArrayValue(img),
        }
      })
    )
  },

  async down(db, client) {
    return db.collection('blog').updateMany([])
  },
}
