Projeto Flavor Hub - Guia de Instalação
Bem-vindo ao Flavor Hub! Este guia irá ajudá-lo a configurar e executar o ambiente de desenvolvimento completo (Backend e Mobile) na sua máquina.

1. Pré-requisitos
Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

Node.js: (versão 18 ou superior) - Baixar aqui

Yarn: Gerenciador de pacotes - Instruções de instalação

Docker Desktop: Para executar o banco de dados - Baixar aqui

Git: Para clonar o repositório - Baixar aqui

Expo Go (no celular): Aplicativo para rodar o projeto mobile - Baixe na App Store ou Google Play.

2. Configuração do Ambiente
Siga os passos abaixo na ordem correta.

Passo 2.1: Clonar o Repositório
Abra um terminal e clone o projeto do GitHub para a sua máquina:

git clone [URL_DO_SEU_REPOSITORIO_NO_GITHUB]
cd FlavorHub

Passo 2.2: Configurar o Backend
Navegue até a pasta do backend:

cd backend

Instale as dependências:

yarn install

Inicie o Docker Desktop: Abra o aplicativo do Docker e espere até que ele esteja em execução.

Crie e configure o banco de dados no Docker:

docker run --name flavorhub-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -e POSTGRES_DB=flavorhub -p 5432:5432 -d postgres:16

Crie o arquivo de variáveis de ambiente:

Na pasta backend, crie um arquivo chamado .env.

Copie e cole o seguinte conteúdo dentro dele:

DATABASE_URL="postgresql://docker:docker@127.0.0.1:5432/flavorhub?schema=public"

Crie as tabelas no banco de dados (Migração):

Aguarde uns 15 segundos após o comando do Docker para o banco de dados inicializar.

Execute o comando de migração:

npx prisma migrate dev --name init

Inicie o servidor do backend:

yarn dev

Se tudo deu certo, você verá a mensagem: 🚀 O servidor está rodando em http://localhost:3333. Mantenha este terminal aberto.

Passo 2.3: Configurar o Aplicativo Mobile
Abra um NOVO terminal.

Navegue até a pasta do mobile:

cd mobile

Instale as dependências:

yarn install

Configure o endereço da API (Passo Crucial!):

Descubra o endereço de IP da sua máquina na sua rede local (geralmente começa com 192.168...).

Abra o arquivo mobile/src/services/api.ts.

Altere o baseURL para o IP da sua máquina. Exemplo:

const api = axios.create({
  baseURL: 'http://192.168.1.15:3333/api', // Use o SEU IP aqui!
});

Inicie o aplicativo mobile:

yarn start

O Metro Bundler abrirá no seu navegador. Escaneie o QR code com o aplicativo Expo Go no seu celular para rodar o projeto.

Seu ambiente está pronto! Agora você pode começar a desenvolver.
