export interface DataTable {
  colunas: {
    titulo: string,
    nomeCampo: string,
    isCurrency?: boolean
  }[],
  registrosPorPagina: number;
}
