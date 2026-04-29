-- Tipos ENUM
create type tipo_responsavel as enum ('pai', 'mae', 'outro');
create type status_matricula as enum ('ativa', 'cancelada', 'transferida', 'concluida');
create type tipo_documento as enum (
  'contrato',
  'termo_compromisso',
  'termo_imagem',
  'termo_saida',
  'outro'
);
create type status_documento as enum ('pendente', 'gerado', 'assinado');

-- ALUNOS
create table alunos (
  id uuid primary key default gen_random_uuid(),
  nome varchar(150) not null,
  data_nascimento date,
  cpf varchar(14),
  rg_certidao varchar(50),
  sexo varchar(20),
  ativo boolean default true,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RESPONSÁVEIS
create table responsaveis (
  id uuid primary key default gen_random_uuid(),
  nome varchar(150) not null,
  cpf varchar(14),
  rg varchar(30),
  celular varchar(20),
  telefone_fixo varchar(20),
  email varchar(150),
  profissao varchar(100),
  local_trabalho varchar(150),
  telefone_comercial varchar(20),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- RELAÇÃO ALUNO x RESPONSÁVEL
create table aluno_responsavel (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  responsavel_id uuid not null references responsaveis(id) on delete cascade,
  tipo tipo_responsavel not null,
  parentesco varchar(60),
  responsavel_financeiro boolean default false,
  autorizado_retirada boolean default false,
  created_at timestamp with time zone default now(),
  unique (aluno_id, responsavel_id)
);

-- ENDEREÇOS
create table enderecos (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid references alunos(id) on delete cascade,
  responsavel_id uuid references responsaveis(id) on delete cascade,
  cep varchar(10),
  logradouro varchar(150),
  numero varchar(20),
  complemento varchar(100),
  bairro varchar(100),
  cidade varchar(100),
  estado varchar(2),
  created_at timestamp with time zone default now(),

  constraint endereco_vinculo_check check (
    aluno_id is not null or responsavel_id is not null
  )
);

-- MATRÍCULAS
create table matriculas (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  turma_id uuid,
  ano_letivo integer not null,
  periodo varchar(50),
  data_matricula date default current_date,
  status status_matricula default 'ativa',
  observacoes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- SAÚDE DO ALUNO
create table saude_aluno (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  alergias text,
  medicamentos text,
  necessidades_especiais text,
  convenio_medico boolean default false,
  nome_convenio varchar(100),
  numero_carteirinha varchar(100),
  observacoes text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  unique (aluno_id)
);

-- CONTATOS DE EMERGÊNCIA
create table contatos_emergencia (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  nome varchar(150) not null,
  parentesco varchar(80),
  telefone varchar(20) not null,
  observacao text,
  created_at timestamp with time zone default now()
);

-- DOCUMENTOS DA MATRÍCULA
create table documentos_matricula (
  id uuid primary key default gen_random_uuid(),
  aluno_id uuid not null references alunos(id) on delete cascade,
  matricula_id uuid references matriculas(id) on delete set null,
  tipo tipo_documento not null,
  nome_arquivo varchar(200),
  arquivo_url text,
  status status_documento default 'pendente',
  uploaded_at timestamp with time zone,
  created_at timestamp with time zone default now()
);