import { GrapghqlContext } from "src/common/interfaces"
import * as services from "../../services/user"
import { MutationUpdateUserArgs, QueryUserArgs } from "src/common/graphql/graphql"

const me = (_:any, __: any, { user }: GrapghqlContext) => {
    return services.getUserById(user?._id!)
}

const user = (_: any, { id }: QueryUserArgs) => {
    return services.getUserById(id)
}

const updateUser = (_:any, args: MutationUpdateUserArgs, { user }: GrapghqlContext) => {
    return services.updateUser({ id: user?._id!, ...args.data})
}

export const userResolvers = {
    Query: {
        me,
        user
    },
    Mutation: {
        updateUser
    }
}