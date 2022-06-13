export interface ListAlocacao {
  id?: number;
  nomeAtividade: string;
  nomeDiaSemana: string;
  nomeTurma: string;
  horaInicio: string;
  horaFim: string;
}

export interface CreateAlocacao {
  diaSemanaId: number;
  atividadeId: number;
  turmaId: number;
  horaInicio: string;
  horaFim: string;
}
