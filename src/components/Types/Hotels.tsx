type Hotel = {
    id: number,
    desc: string,
    maxPersons: number,
    price: number,
    rate: number,
    region: string,
    img: string[],
}

type Hotels = Hotel[]

export type {Hotel, Hotels}