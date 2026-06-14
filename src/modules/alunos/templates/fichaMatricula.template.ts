type FichaMatriculaData = {
  aluno: Record<string, any>;
  responsavel: Record<string, any> | null;
  relacao: Record<string, any> | null;
  endereco: Record<string, any> | null;
  saude: Record<string, any> | null;
  emergencia: Record<string, any> | null;
  matricula: Record<string, any> | null;
  documentos: Record<string, any>[];
};

function escapeHtml(value: unknown): string {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatDate(value: unknown): string {
  if (!value) return "-";
  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) return escapeHtml(value);
  return date.toLocaleDateString("pt-BR", { timeZone: "UTC" });
}

function formatBoolean(value: unknown): string {
  if (value === true) return "Sim";
  if (value === false) return "Não";
  return "-";
}

function display(value: unknown): string {
  if (value === null || value === undefined || value === "") return "-";
  if (typeof value === "boolean") return formatBoolean(value);
  return escapeHtml(value);
}

function field(label: string, value: unknown, options: { date?: boolean; wide?: boolean } = {}): string {
  const formatted = options.date ? formatDate(value) : display(value);
  return `
    <div class="field ${options.wide ? "wide" : ""}">
      <span class="label">${escapeHtml(label)}</span>
      <span class="value">${formatted}</span>
    </div>
  `;
}

function section(title: string, fields: string): string {
  return `
    <section class="section">
      <h2>${escapeHtml(title)}</h2>
      <div class="grid">${fields}</div>
    </section>
  `;
}

function documentosList(documentos: Record<string, any>[]): string {
  if (!documentos.length) {
    return "<p class=\"empty\">-</p>";
  }

  const rows = documentos.map((documento) => `
    <tr>
      <td>${display(documento.tipo)}</td>
      <td>${display(documento.nome_arquivo)}</td>
      <td>${display(documento.status)}</td>
      <td>${formatDate(documento.uploaded_at)}</td>
    </tr>
  `).join("");

  return `
    <table class="documents-table">
      <thead>
        <tr>
          <th>Tipo</th>
          <th>Arquivo</th>
          <th>Status</th>
          <th>Enviado em</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>
  `;
}

export function renderFichaMatriculaTemplate(data: FichaMatriculaData): string {
  const { aluno, responsavel, relacao, endereco, saude, emergencia, matricula, documentos } = data;
  const turma = matricula?.turma;

  return `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <title>Ficha de Matrícula</title>
  <style>
    @page { size: A4; margin: 10mm; }
    * { box-sizing: border-box; }
    body { font-family: Arial, Helvetica, sans-serif; color: #111827; font-size: 10.5px; line-height: 1.25; margin: 0; }
    .header { border: 1px solid #111827; padding: 10px; text-align: center; margin-bottom: 8px; }
    .header h1 { font-size: 18px; margin: 0 0 4px; text-transform: uppercase; }
    .header p { margin: 0; font-size: 11px; }
    .section { border: 1px solid #374151; margin-bottom: 7px; break-inside: avoid; page-break-inside: avoid; }
    .section h2 { background: #e5e7eb; border-bottom: 1px solid #374151; font-size: 11px; letter-spacing: .2px; margin: 0; padding: 5px 7px; text-transform: uppercase; }
    .grid { display: grid; grid-template-columns: repeat(4, 1fr); }
    .field { border-bottom: 1px solid #d1d5db; border-right: 1px solid #d1d5db; min-height: 33px; padding: 4px 6px; }
    .field:nth-child(4n) { border-right: 0; }
    .field.wide { grid-column: span 2; }
    .label { color: #374151; display: block; font-size: 8.5px; font-weight: 700; text-transform: uppercase; }
    .value { display: block; font-size: 10.5px; margin-top: 2px; min-height: 14px; word-break: break-word; }
    .documents-block { padding: 6px; }
    .documents-table { border-collapse: collapse; width: 100%; }
    .documents-table th, .documents-table td { border: 1px solid #d1d5db; padding: 4px; text-align: left; }
    .documents-table th { background: #f3f4f6; font-size: 9px; text-transform: uppercase; }
    .empty { margin: 0; padding: 8px; }
    .signatures { border: 1px solid #374151; margin-top: 14px; padding: 12px; break-inside: avoid; page-break-inside: avoid; }
    .signature-line { font-size: 11px; margin: 18px 0; }
  </style>
</head>
<body>
  <header class="header">
    <h1>Ficha de Matrícula</h1>
    <p>Cadastro completo do aluno para conferência e impressão</p>
  </header>

  ${section("Dados da matrícula", [
    field("Modalidade de ensino", matricula?.modalidade_ensino),
    field("Série de ingresso", matricula?.serie_ingresso),
    field("Tipo de matrícula", matricula?.tipo_matricula),
    field("Data da matrícula", matricula?.data_matricula, { date: true }),
    field("Ano letivo", matricula?.ano_letivo),
    field("Período", matricula?.periodo),
    field("Status", matricula?.status),
    field("Estabelecimento", matricula?.estabelecimento),
  ].join(""))}

  ${section("Dados do aluno", [
    field("Nome", aluno.nome, { wide: true }),
    field("CPF", aluno.cpf),
    field("Data de nascimento", aluno.data_nascimento, { date: true }),
    field("Sexo", aluno.sexo),
    field("Tipo", aluno.tipo),
    field("Telefone", aluno.telefone),
    field("Nacionalidade", aluno.nacionalidade),
    field("Naturalidade", aluno.naturalidade),
    field("Identificação única", aluno.identificacao_unica),
    field("Condição do aluno", aluno.condicao_aluno),
    field("Cor/Raça", aluno.cor_raca),
    field("Estado civil", aluno.estado_civil),
  ].join(""))}

  ${section("Endereço", [
    field("Endereço", endereco?.logradouro ?? endereco?.endereco, { wide: true }),
    field("Número", endereco?.numero),
    field("Complemento", endereco?.complemento),
    field("Bairro", endereco?.bairro),
    field("CEP", endereco?.cep),
    field("Cidade", endereco?.cidade),
    field("Estado", endereco?.estado),
  ].join(""))}

  ${section("Certidão e documentos pessoais", [
    field("Certidão de nascimento", aluno.certidao_nascimento, { wide: true }),
    field("RG/Certidão", aluno.rg_certidao),
    field("Termo", aluno.termo),
    field("Folha", aluno.folha),
    field("Livro", aluno.livro),
    field("Data emissão certidão", aluno.data_emissao_certidao, { date: true }),
    field("UF cartório", aluno.uf_cartorio),
    field("Nome do cartório", aluno.nome_cartorio, { wide: true }),
    field("Certidão casamento", aluno.certidao_casamento, { wide: true }),
    field("Documento identidade", aluno.documento_identidade),
    field("Data expedição identidade", aluno.data_expedicao_identidade, { date: true }),
    field("UF identidade", aluno.uf_identidade),
    field("Órgão emissor", aluno.orgao_emissor_identidade),
    field("Portaria naturalização", aluno.portaria_naturalizacao, { wide: true }),
  ].join(""))}

  ${section("Dados da mãe", [
    field("Nome", aluno.mae_nome, { wide: true }),
    field("Profissão", aluno.mae_profissao),
    field("Local de trabalho", aluno.mae_local_trabalho, { wide: true }),
    field("Telefone", aluno.mae_telefone),
  ].join(""))}

  ${section("Dados do pai", [
    field("Nome", aluno.pai_nome, { wide: true }),
    field("Profissão", aluno.pai_profissao),
    field("Local de trabalho", aluno.pai_local_trabalho, { wide: true }),
    field("Telefone", aluno.pai_telefone),
  ].join(""))}

  ${section("Responsável", [
    field("Nome", responsavel?.nome, { wide: true }),
    field("CPF", responsavel?.cpf),
    field("RG", responsavel?.rg),
    field("Parentesco", relacao?.parentesco),
    field("Tipo relação", relacao?.tipo),
    field("Responsável financeiro", relacao?.responsavel_financeiro),
    field("Autorizado retirada", relacao?.autorizado_retirada),
    field("Telefone", responsavel?.telefone ?? responsavel?.celular),
    field("E-mail", responsavel?.email, { wide: true }),
    field("Endereço", responsavel?.endereco, { wide: true }),
    field("Bairro", responsavel?.bairro),
    field("CEP", responsavel?.cep),
    field("Profissão", responsavel?.profissao),
    field("Local trabalho", responsavel?.local_trabalho, { wide: true }),
    field("Telefone trabalho", responsavel?.telefone_trabalho ?? responsavel?.telefone_comercial),
  ].join(""))}

  ${section("Moradia e programas sociais", [
    field("Aluno mora com os pais", aluno.aluno_mora_com_pais),
    field("Tipo de moradia", aluno.tipo_moradia),
    field("Participa Bolsa Família", aluno.participa_bolsa_familia),
    field("NIS", aluno.nis),
  ].join(""))}

  ${section("Dados do Bolsa Família", [
    field("Nome", aluno.bolsa_familia_nome, { wide: true }),
    field("Nacionalidade", aluno.bolsa_familia_nacionalidade),
    field("Naturalidade", aluno.bolsa_familia_naturalidade),
    field("Nome da mãe", aluno.bolsa_familia_nome_mae, { wide: true }),
    field("NIS", aluno.bolsa_familia_nis),
    field("Identidade", aluno.bolsa_familia_identidade),
    field("Órgão emissor", aluno.bolsa_familia_orgao_emissor),
    field("Data expedição", aluno.bolsa_familia_data_expedicao, { date: true }),
  ].join(""))}

  ${section("Saúde", [
    field("Teve doença grave", saude?.teve_doenca_grave),
    field("Doença grave - qual", saude?.doenca_grave_qual, { wide: true }),
    field("Alergia alimento/medicamento", saude?.alergia_alimento_medicamento),
    field("Alergia - qual", saude?.alergia_qual, { wide: true }),
    field("Necessidades educacionais especiais", saude?.necessidades_educacionais_especiais),
    field("Necessidades - quais", saude?.necessidades_qual, { wide: true }),
    field("Alergias", saude?.alergias, { wide: true }),
    field("Medicamentos", saude?.medicamentos, { wide: true }),
    field("Necessidades especiais", saude?.necessidades_especiais, { wide: true }),
    field("Convênio médico", saude?.convenio_medico),
    field("Nome convênio", saude?.nome_convenio),
    field("Carteirinha", saude?.numero_carteirinha),
    field("Contato emergência", emergencia?.nome),
    field("Parentesco emergência", emergencia?.parentesco),
    field("Telefone emergência", emergencia?.telefone),
    field("Observação emergência", emergencia?.observacao, { wide: true }),
    field("Observações de saúde", saude?.observacoes, { wide: true }),
  ].join(""))}

  ${section("Documentos entregues/faltantes", [
    field("Documentos entregues", matricula?.documentos_entregues, { wide: true }),
    field("Documentos faltantes", matricula?.documentos_faltantes, { wide: true }),
  ].join(""))}

  <section class="section">
    <h2>Documentos enviados</h2>
    <div class="documents-block">${documentosList(documentos ?? [])}</div>
  </section>

  ${section("Turma / matrícula", [
    field("Turma", turma?.nome),
    field("Turma ID", matricula?.turma_id),
    field("Ano letivo da turma", turma?.ano_letivo),
    field("Período da turma", turma?.periodo),
    field("Matrícula ID", matricula?.id, { wide: true }),
    field("Aluno ID", aluno.id, { wide: true }),
  ].join(""))}

  ${section("Observações", [
    field("Observações da matrícula", matricula?.observacoes, { wide: true }),
  ].join(""))}

  <section class="signatures">
    <div class="signature-line">Assinatura do responsável: ____________________________</div>
    <div class="signature-line">Assinatura do funcionário: ____________________________</div>
    <div class="signature-line">Local e data: ____________________________</div>
  </section>
</body>
</html>`;
}
