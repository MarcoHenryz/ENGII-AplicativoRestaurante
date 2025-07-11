# Projeto Flavor Hub - Guia de Instalação

Bem-vindo ao Flavor Hub! Este guia irá ajudá-lo a configurar e executar o ambiente de desenvolvimento completo (Backend e Mobile) na sua máquina.

## 1. Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas:

- **Node.js**: (versão 18 ou superior) - [Baixar aqui](https://nodejs.org/)
- **Yarn**: Gerenciador de pacotes - [Instruções de instalação](https://yarnpkg.com/getting-started/install)
- **Docker Desktop**: Para executar o banco de dados - [Baixar aqui](https://www.docker.com/products/docker-desktop)
- **Git**: Para clonar o repositório - [Baixar aqui](https://git-scm.com/)
- **Expo Go** (no celular): Aplicativo para rodar o projeto mobile - Baixe na [App Store](https://apps.apple.com/app/expo-go/id982107779) ou [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

## 2. Configuração do Ambiente

Siga os passos abaixo na ordem correta.

### Passo 2.1: Clonar o Repositório

Abra um terminal e clone o projeto do GitHub para a sua máquina:

```bash
git clone https://github.com/MarcoHenryz/ENGII-AplicativoRestaurante
cd FlavorHub
```

### Passo 2.2: Configurar o Backend

1. Navegue até a pasta do backend:
   ```bash
   cd backend
   ```

2. Instale as dependências:
   ```bash
   yarn install
   ```

3. **Inicie o Docker Desktop**: Abra o aplicativo do Docker e espere até que ele esteja em execução.

4. Crie e configure o banco de dados no Docker:
   ```bash
   docker run --name flavorhub-db -e POSTGRES_PASSWORD=docker -e POSTGRES_USER=docker -e POSTGRES_DB=flavorhub -p 5432:5432 -d postgres:16
   ```

5. Crie o arquivo de variáveis de ambiente:
   - Na pasta `backend`, crie um arquivo chamado `.env`
   - Copie e cole o seguinte conteúdo dentro dele:
   ```env
   DATABASE_URL="postgresql://docker:docker@127.0.0.1:5432/flavorhub?schema=public"
   ```

6. Crie as tabelas no banco de dados (Migração):
   - Aguarde uns 15 segundos após o comando do Docker para o banco de dados inicializar
   - Execute o comando de migração:
   ```bash
   npx prisma migrate dev --name init
   ```

7. Inicie o servidor do backend:
   ```bash
   yarn dev
   ```

   Se tudo deu certo, você verá a mensagem: **🚀 O servidor está rodando em http://localhost:3333**. Mantenha este terminal aberto.

### Passo 2.3: Configurar o Aplicativo Mobile

1. Abra um **NOVO terminal**.

2. Navegue até a pasta do mobile:
   ```bash
   cd mobile
   ```

3. Instale as dependências:
   ```bash
   yarn install
   ```

4. **Configure o endereço da API** (Passo Crucial!):
   - Descubra o endereço de IP da sua máquina na sua rede local (geralmente começa com `192.168...`)
   - Abra o arquivo `mobile/src/services/api.ts`
   - Altere o `baseURL` para o IP da sua máquina. Exemplo:
   ```typescript
   const api = axios.create({
     baseURL: 'http://192.168.1.15:3333/api', // Use o SEU IP aqui!
   });
   ```

5. Inicie o aplicativo mobile:
   ```bash
   yarn start
   ```

   O Metro Bundler abrirá no seu navegador. Escaneie o QR code com o aplicativo Expo Go no seu celular para rodar o projeto.

## ✅ Pronto!
Para rodar o app, dentro da pasta do backend

 ```bash
   yarn dev
   ```

Abra outro terminal e rode

 ```bash
   yarn start --web
   ```
