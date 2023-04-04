export const validNameUser = (nameUser) => (/^([а-яёА-ЯЁ]+|[a-zA-Z]+)$/iu).test(nameUser);
export const validLogin = (login) => (/^([a-zA-Z]+)$/iu).test(login);
export const validPassword = (password) => (/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^\w\s]).{6,}/).test(password);
export const validRepeatPassword = (str1, str2) => str1 === str2;
