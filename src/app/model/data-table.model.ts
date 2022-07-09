export interface DataTable {
  colunas: {
    titulo: string,
    nomeCampo: string,
    isCurrency?: boolean,
    isDelete?: boolean,
    isEdit?: boolean,
    isNameField?: boolean
  }[],
  registrosPorPagina: number;
}
