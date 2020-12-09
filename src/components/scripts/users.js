import UserData from "../data/users"

export class User {
    constructor(user) {
        this.id = user.id
        this.login = user.login;
        this.password = user.password;
    }
}

export class Users {
    constructor() {
        this.allUsers = [];

        for (var user of UserData) {
            this.allUsers.push(new User(user));
        }
    }

    findUser(login) {
        const user = this.allUsers.find(
            (item) => {
                return item.login == login;
            }
        )
        if (user) {
            return user.id
        }
        return undefined
    }
    auth(login, password) {
        const user = this.allUsers.find(
            (item) => {
                return item.login == login &&
                    item.password == password;
            }
        )
        if (user) {
            return user.id
        }
        return undefined
    }

    createUser(login, password) {
        const id = Math.max.apply(null,
            this.allUsers.map(
                (item) => item.id
            )
        ) + 1;
        this.allUsers.push(new User({
            id,
            login,
            password
        }));
        return id;
    }

    getUser(id) {
        return this.allUsers.find(
            (item) => {
                return item.id == user.id;
            }
        )
    }

    deleteUser(id) {
        var index = this.allUsers.findIndex(
            (item) => {
                return item.id == id;
            }
        )
        this.allUsers.splice(index, 1);
    }
}