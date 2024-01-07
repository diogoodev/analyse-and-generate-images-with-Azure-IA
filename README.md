# Analyze and Generate Images with Azure IA

Este projeto é uma aplicação React que utiliza os Serviços Cognitivos da Azure, especificamente Azure Computer Vision e OpenAI, para analisar e gerar imagens. Os usuários podem inserir tanto uma URL de imagem quanto um prompt, e a aplicação interagirá com os serviços da Azure para analisar ou gerar imagens conforme necessário.

## Pré-requisitos

Antes de executar a aplicação, certifique-se de ter o seguinte:

1. **Chaves de API dos Serviços Cognitivos da Azure:**
   - Para o Computer Vision: Obtenha a chave e o endpoint pelo portal da Azure.
   - Para o OpenAI: Obtenha a chave da plataforma OpenAI.

2. **Variáveis de Ambiente:**
   Crie um arquivo `.env` na raiz do projeto e configure as seguintes variáveis de ambiente:

   ```env
   REACT_APP_VISION_KEY=sua_chave_api_do_computer_vision
   REACT_APP_VISION_ENDPOINT=seu_endpoint_do_computer_vision
   REACT_APP_OPENAI_API_KEY=sua_chave_api_do_openai
   ```

## Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/diogoodev/analyse-and-generate-images-with-Azure-IA
   ```

2. Navegue até o diretório do projeto:

   ```bash
   cd seu-repositorio
   ```

3. Instale as dependências:

   ```bash
   npm install
   ```

## Uso

Execute a aplicação localmente:

```bash
npm start
```

A aplicação estará acessível em `http://localhost:3000`.

## Funcionalidades

- **Analisar Imagem:**
  - Insira a URL da imagem ou um prompt no campo de entrada.
  - Clique no botão "Analisar" para realizar a análise da imagem usando o Azure Computer Vision.
  - Os resultados serão exibidos, incluindo tags e outras informações relevantes.

- **Gerar Imagem:**
  - Insira um prompt no campo de entrada (por exemplo, uma descrição da imagem desejada).
  - Clique no botão "Gerar" para criar uma imagem usando o OpenAI.
  - A imagem gerada e detalhes adicionais serão exibidos.

- **Limpar Resultados:**
  - Clique no botão "Limpar Resultados" para redefinir a entrada e limpar quaisquer análises ou imagens geradas anteriores.

## Implantação

Para implantar a aplicação na Azure, siga as instruções fornecidas no fluxo de trabalho Azure Static Web Apps CI/CD. Certifique-se de adicionar suas chaves de API dos Serviços Cognitivos da Azure como segredos no seu repositório do GitHub.

## Notas Adicionais

- Este projeto utiliza o React para o frontend.
- O arquivo `azure-image-analysis.js` lida com as interações com o Azure Computer Vision.
- O arquivo `azure-image-generation.js` lida com as interações com o OpenAI.

## Solução de Problemas

- Se encontrar problemas, verifique suas chaves de API, endpoints e variáveis de ambiente.
- Revise os logs no console em busca de mensagens de erro.
- Certifique-se de que as dependências necessárias estão instaladas executando `npm install`.

Sinta-se à vontade para contribuir, relatar problemas ou sugerir melhorias!
```
