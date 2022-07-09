export interface ListAlocacao {
  id?: number;
  atividade: IdAndNome;
  diaSemana: IdAndNome;
  turma: IdAndNome;
  horaInicio: string;
  horaFim: string;
}

export interface IdAndNome {
  id: number;
  nome: string;
}

export interface CreateAlocacao {
  diaSemanaId: number;
  atividadeId: number;
  turmaId: number;
  horaInicio: string;
  horaFim: string;
}
