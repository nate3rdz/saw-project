export interface IAccount {
    id: number,
    username: string,
    registerDate: string,
    permissions: {
        id: number,
        name: string
    }[],
    email: string
}