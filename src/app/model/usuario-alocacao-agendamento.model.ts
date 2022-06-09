export interface UsuarioAlocacaoAgendamento {
  agendamentoId: number;
  alocacaoId: number;
  nomeAtividade: string;
  nomeDiaSemana: string;
  nomeTurma: string;
  horaInicio: string;
  horaFim: string;
  estaAgendado: boolean;
}
