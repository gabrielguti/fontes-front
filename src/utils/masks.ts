export const maskCepString = (cep: string) => {
    return cep.replace(/\D/g, "").replace(/(\d)(\d{3})$/, "$1-$2")
}

export const maskCep = (e: { target: HTMLInputElement }) => {
    e.target.value = maskCepString(e.target.value)
}


export const maskMoneyString = (money: string) => {
    let value = money
    value = value.replace(/\D/g, "")
    for (let index = value.length; index >= 5; index--) {
        if (index === 5 || (index - 5) % 3 === 0) {
            const regExp = new RegExp(`(\\d{1})(\\d{${index}})$`)
            value = value.replace(regExp, "$1.$2")
        }
    }
    value = value.replace(/(\d{1})(\d{1,2})$/, "$1,$2")
    return value
}
export const maskMoney = (e: { target: HTMLInputElement }) => {
    e.target.value = maskMoneyString(e.target.value)
}

export const clearMask = (string:string, elementToClear: string[]) => {
    let result = string.split('').filter((item,index) => item !== "-" && item !== "." && item !== ",").join('')
    return result

}