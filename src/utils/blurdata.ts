export const blurName = (name: string) => {
    return name.split("").map((char, i) => {
        if (i < 3) {
            return char;
        }
        return "*";
    }).join("");
}

export const blurEmail = (email: string) => {
    const [name, domain] = email.split("@");
    return `${blurName(name)}@${domain}`;
}