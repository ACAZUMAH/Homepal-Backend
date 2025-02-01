import { MutationCompleteAuthAndGenerateTokenArgs, MutationLoginWithPhoneNumberArgs } from 'src/common/graphql/graphql'
import * as phoneAuthServices from '../../services/auth/auth'
import * as verify from '../../services/auth'

const loginWithPhoneNumber = (_:any, { phoneNumber }: MutationLoginWithPhoneNumberArgs) => {
    return phoneAuthServices.loginWithPhoneNumber({ phoneNumber })
}

const completeAuthAndGenerateToken = (_:any, { token }: MutationCompleteAuthAndGenerateTokenArgs) => {
    return verify.completeAuthAndGenerateToken(token)
}

export const authResolvers = {
    Mutation: {
        loginWithPhoneNumber,
        completeAuthAndGenerateToken
    }
}