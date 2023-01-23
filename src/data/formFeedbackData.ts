const requiredMessage = "Campo obrigatório"
const invalidMessage = "Campo inválido"

const getRuleMinLenght = (minLenght: number) => ({ value: minLenght, message: `Mínimo de ${minLenght} caracter${minLenght !== 1 && "es"}` })

export const formFeedback = {
    title:{
        required: requiredMessage,
        invalidMessage: invalidMessage
    },
    zip_code:{
        required: requiredMessage,
        invalidMessage: invalidMessage
    },
    cost:{
        required: requiredMessage,
        invalidMessage: invalidMessage
    },
    deadline:{
        required: requiredMessage,
        invalidMessage: invalidMessage
    },
    name:{
        required: requiredMessage,
        invalid: invalidMessage,
    },
    username: {
        required: requiredMessage,
        invalid: invalidMessage,
        minLenght: getRuleMinLenght
    },
    email: {
        required: requiredMessage,
        invalid: invalidMessage,
    },
    password: {
        required: requiredMessage,
        minLenght: getRuleMinLenght,
    },
}
