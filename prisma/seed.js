const { PrismaClient } = require('../generated/prisma')
const { PrismaPg } = require('@prisma/adapter-pg')
require('dotenv').config()

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
const prisma = new PrismaClient({ adapter })

async function main() {
    await prisma.pokemons.createMany({
        data: [
            { nombre: 'bulbasaur' },
            { nombre: 'pikachu' },
            { nombre: 'charmander' }
        ]
    })
    console.log('Seed completado')
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect())