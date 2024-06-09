// eslint-disable-next-line @typescript-eslint/no-var-requires
const { faker } = require('@faker-js/faker')

const getRandomArrayValue = (arr) => arr[Math.floor(Math.random() * arr.length)]

const year     = ['2003', '2004', '2005', '2006']
const material = ['oil', 'acril', 'paper', 'aquarel']
const size     = ['80-90 ', '55-90', '40-60', '70-50']
const img      = ['/img/banner/Пархоменко_Ранок_2006,_20_30,_ДВП,_олія.jpg'];

module.exports = {
  async up(db) {
    return db.collection('arts').insertMany(
      [...Array(10)].map(() => {
        return {
          category: 'arts',
          price: +faker.string.numeric(4).replace(/.{0,2}$/, 99),
          name: faker.lorem.sentence(2),
          description: faker.lorem.sentences(10),
          characteristics: {
            year: getRandomArrayValue(year),
            material: getRandomArrayValue(material),
            size: getRandomArrayValue(size),
          },
          images: getRandomArrayValue(img),
          vendorCode: faker.string.numeric(4),
          inStock: faker.string.numeric(2),
          isBestseller: faker.datatype.boolean(),
          isNew: faker.datatype.boolean(),
          popularity: +faker.string.numeric(3),
          review: +faker.string.numeric(1),
        }
      })
    )
  },

  async down(db, client) {
    return db.collection('arts').updateMany([])
  }
};
