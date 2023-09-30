const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const follyBeach = await prisma.poi.upsert({
        where: { id: '0' },
        update: {},
        create: {
            title: 'Folly Beach1',
            latitude: 32.667870679074494,
            longitude: -79.90863058239091,
            state: 'SC',
            city: 'Folly Beach',
            zipcode: 29412,
            description: 'something desc1',
            hashtags: ['eyo1', 'testing1'],
        }
    })
    const follyBeach2 = await prisma.poi.upsert({
        where: { id: '1' },
        update: {},
        create: {
            title: 'Folly Beach2',
            latitude: 32.677870679074494,
            longitude: -79.90863058239091,
            state: 'SC',
            city: 'Folly Beach',
            zipcode: 29412,
            description: 'something desc2',
            hashtags: ['eyo2', 'testing2'],
        }
    })
    const follyBeach3 = await prisma.poi.upsert({
        where: { id: '2' },
        update: {},
        create: {
            title: 'Folly Beach3',
            latitude: 32.668870679074494,
            longitude: -79.90863058239091,
            state: 'SC',
            city: 'Folly Beach',
            zipcode: 29412,
            description: 'something desc3',
            hashtags: ['eyo3', 'testing3'],
        }
    })
    console.log({follyBeach, follyBeach2, follyBeach3})
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })



/*  Poi model for reference:

    Poi {
    id          String   @id @default(uuid())
    latitude    Decimal  @db.Decimal(21, 18)
    longitude   Decimal  @db.Decimal(21, 18)
    state       String
    city        String
    zipcode     Int
    title       String   @db.VarChar(100)
    description String   @db.VarChar(300)
    hashtags    String[] @db.VarChar(30)
    createdAt   DateTime @default(now())
    post        Post[]
  } */