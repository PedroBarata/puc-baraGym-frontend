export interface JwtSub {
    nome: string;
    matricula: string;
    role: RoleEnum;
    exp: number;
}

export enum RoleEnum {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_USER = "ROLE_USER"
}
