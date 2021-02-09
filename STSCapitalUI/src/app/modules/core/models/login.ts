export interface ILogin {
    email?: string;
    password?: string;
}
export const createLoginModel = ({
    email = '',
    password = ''
}: ILogin = {}): ILogin => ({
    email,
    password,
});
