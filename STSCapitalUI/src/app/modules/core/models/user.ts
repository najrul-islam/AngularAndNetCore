export interface IUser {
    firstName: string;
    lastName: string;
    initials?: string;
    fullName?: string;
    email: string;
    userName: string;
    phone?: string;
    image?: string;
    password: string;
}
export const createUserModel = ({
    firstName = '',
    lastName = '',
    initials = '',
    fullName = '',
    email = '',
    userName = '',
    phone = '',
    image = '',
    password = ''
}: IUser = {
        firstName: '',
        lastName: '',
        email: '',
        userName: '',
        password: ''
    }): IUser => ({
        firstName,
        lastName,
        initials,
        fullName,
        email,
        userName,
        phone,
        image,
        password
    });
