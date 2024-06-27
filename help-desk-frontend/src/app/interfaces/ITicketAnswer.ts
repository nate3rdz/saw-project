export interface ITickerAnswer {
    id: number,
    text: string,
    createdAt: string,
    account: {
        id: number,
        username: string,
        registerDate: string
    }
}