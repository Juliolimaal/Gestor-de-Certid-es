export type DocumentStatus = 'pending' | 'consulting' | 'waiting' | 'obtained' | 'regular' | 'positive-negative' | 'positive' | 'not-issued' | 'unavailable' | 'needs-data' | 'recoverable' | 'definitive'

export type DocumentItem = {
  id: string
  shortName: string
  name: string
  issuer: string
  url: string
  status: DocumentStatus
  detail: string
  validUntil?: string
}

export const initialDocuments: DocumentItem[] = [
  { id: 'cnpj', shortName: 'CNPJ + QSA', name: 'Comprovante de inscrição e situação cadastral', issuer: 'Receita Federal', url: 'https://solucoes.receita.fazenda.gov.br/Servicos/cnpjreva/', status: 'pending', detail: 'Aguardando consulta' },
  { id: 'sefaz', shortName: 'SEFAZ/PB', name: 'Certidão estadual de débitos', issuer: 'SEFAZ Paraíba', url: 'https://www.sefaz.pb.gov.br/servirtual/certidoes/emissao-de-certidao-de-debitos-empresa', status: 'pending', detail: 'Aguardando consulta' },
  { id: 'federal', shortName: 'RFB / PGFN', name: 'Certidão federal de débitos', issuer: 'Receita Federal e PGFN', url: 'https://servicos.receitafederal.gov.br/servico/certidoes/#/home/cnpj/resultado', status: 'pending', detail: 'Aguardando consulta' },
  { id: 'municipal', shortName: 'João Pessoa', name: 'Certidão municipal financeira', issuer: 'Prefeitura de João Pessoa', url: 'https://receita.joaopessoa.pb.gov.br/dsf_jpa_portal/inicial.do?evento=montaMenu&acronym=EMITIRCERTIDAOFINANCEIRAPES', status: 'pending', detail: 'Aguardando consulta' },
  { id: 'tst', shortName: 'CNDT / TST', name: 'Certidão negativa de débitos trabalhistas', issuer: 'Tribunal Superior do Trabalho', url: 'https://cndt-certidao.tst.jus.br/gerarCertidao.faces', status: 'pending', detail: 'Aguardando consulta' },
  { id: 'fgts', shortName: 'CRF / FGTS', name: 'Certificado de regularidade', issuer: 'Caixa Econômica Federal', url: 'https://consulta-crf.caixa.gov.br/consultacrf/pages/consultaEmpregador.jsf', status: 'pending', detail: 'Aguardando consulta' },
]

export const statusLabels: Record<DocumentStatus, string> = {
  pending: 'Pendente', consulting: 'Consultando', waiting: 'Aguardando usuário', obtained: 'Documento obtido', regular: 'Regular', 'positive-negative': 'Positiva com efeito de negativa', positive: 'Positiva / irregular', 'not-issued': 'Documento não emitido', unavailable: 'Portal indisponível', 'needs-data': 'Dados adicionais necessários', recoverable: 'Erro recuperável', definitive: 'Erro definitivo',
}

export const statusTone: Record<DocumentStatus, string> = {
  pending: 'neutral', consulting: 'blue', waiting: 'amber', obtained: 'green', regular: 'green', 'positive-negative': 'amber', positive: 'red', 'not-issued': 'red', unavailable: 'red', 'needs-data': 'amber', recoverable: 'amber', definitive: 'red',
}
