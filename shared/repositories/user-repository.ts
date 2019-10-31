import Repository from "./repository";
import User from "../entities/user";

class UserRepositoryImpl extends Repository<User> {

    constructor() {
        super("/users");
    }

}

export const UserRepository = new UserRepositoryImpl();