export const loginAction = async (username: string, password: string): Promise<{ token: number; user?: string }> => {
    if (username === 'admin' && password === 'adminpass') {
        return { token: 0, user: 'admin' };
    } else if (username === 'user' && password === 'userpass') {
        return { token: 1, user: 'user' };
    } else {
        return { token: -1 };
    }
};