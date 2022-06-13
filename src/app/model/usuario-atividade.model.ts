export interface UsuarioAtividade {
  id: number;
  atividadeId: number;
  nomeAtividade: string;
  quantidadeSemana: number;
  vigenciaInicio: Date;
  vigenciaFim: Date;
  valorTotal: number;
}

export interface CreateUsuarioAtividade {
  atividades: CreateAtividade[],
  valorTotal: number;
}

export interface CreateAtividade {
    atividadeId: number;
    quantidadeSemana: number;
}
