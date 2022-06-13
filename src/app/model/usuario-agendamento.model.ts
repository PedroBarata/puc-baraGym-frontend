export interface UsuarioAgendamento {
  nomeAtividade: string;
  atividadeId: number;
  agendamentos: {
    id: number;
    alocacaoId: number;
    nomeDiaSemana: string;
    nomeTurma: string;
    horaInicio: string;
    horaFim: string;
  }[]
}

export interface Agendamento {
  id: number;
  alocacaoId: number;
  atividadeId: number;
  nomeAtividade: string;
  nomeDiaSemana: string;
  nomeTurma: string;
  horaInicio: string;
  horaFim: string;
}
