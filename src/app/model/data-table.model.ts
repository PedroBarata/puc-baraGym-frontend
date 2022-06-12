export interface DataTable {
  colunas: {
    titulo: string,
    nomeCampo: string
  }[],
  registrosPorPagina: number;
}
