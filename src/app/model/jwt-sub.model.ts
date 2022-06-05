export interface JwtSub {
    nome: string;
    matricula: string;
    role: RoleEnum;
    exp: number;
}

enum RoleEnum {
    ROLE_ADMIN,
    ROLE_USER
}
