export interface DataTable {
  colunas: {
    titulo: string,
    nomeCampo: string,
    isCurrency?: boolean,
    isDelete?: boolean,
  }[],
  registrosPorPagina: number;
}
