# 🔥 Configuração do Firebase

## 📋 Instruções para Configuração

### 1. **Criar Projeto no Firebase Console**
1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Nome do projeto: `heartgift-app` (ou seu nome preferido)
4. Ative o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. **Configurar Firestore Database**
1. No painel do projeto, vá em "Firestore Database"
2. Clique em "Criar banco de dados"
3. Escolha "Modo de produção" (recomendado)
4. Escolha uma localização (ex: us-central1)
5. Clique em "Concluído"

### 3. **Configurar Storage**
1. No painel do projeto, vá em "Storage"
2. Clique em "Começar"
3. Aceite as regras padrão
4. Escolha uma localização (mesma do Firestore)
5. Clique em "Próximo" e "Concluído"

### 4. **Obter Credenciais**
1. No painel do projeto, vá em "Configurações do projeto" (ícone de engrenagem)
2. Na aba "Geral", role até "Seus aplicativos"
3. Clique em "Adicionar app" e escolha "Web" (ícone </>)
4. Nome do app: `heartgift-web`
5. **NÃO** marque "Também configurar o Firebase Hosting"
6. Clique em "Registrar app"
7. Copie as credenciais que aparecem

### 5. **Atualizar Configuração no Código**
Substitua as credenciais no arquivo `src/services/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "SUA_API_KEY_AQUI",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

### 6. **Instalar Dependências do Firebase**
Execute no terminal:
```bash
npm install firebase
```

### 7. **Configurar Regras de Segurança**

#### **Firestore Rules** (em "Regras" no Firestore):
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Permite leitura de presentes públicos
    match /gifts/{giftId} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados podem escrever
    }
  }
}
```

#### **Storage Rules** (em "Regras" no Storage):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /gifts/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null; // Apenas usuários autenticados podem escrever
    }
  }
}
```

## 🚀 Funcionalidades Implementadas

### ✅ **Fluxo de Pagamento Completo**
- Página de checkout com formulário de pagamento
- Integração simulada com Mercado Pago
- Processamento de pagamento com validação
- Confirmação de pagamento e redirecionamento

### ✅ **Armazenamento no Firebase**
- **Firestore**: Armazena dados dos presentes
- **Storage**: Armazena fotos dos presentes
- **Estrutura de dados** completa e organizada

### ✅ **Geração de QR Code**
- QR Code gerado automaticamente após pagamento
- Link direto para visualização do presente
- Integração com Firebase para busca por ID

### ✅ **Sistema de Planos**
- **Básico**: R$ 9,90 - Até 5 fotos, cores personalizadas
- **Premium**: R$ 19,90 - Fotos ilimitadas, todos os efeitos
- **Deluxe**: R$ 39,90 - Tudo do Premium + domínio personalizado

## 📊 Estrutura de Dados no Firebase

### **Coleção: gifts**
```typescript
{
  id: string;                    // ID único do presente
  theme: string;                 // 'couple' | 'birthday' | 'corporate'
  recipientName: string;         // Nome do destinatário
  senderName: string;           // Nome do remetente
  message: string;              // Mensagem personalizada
  specialDate: string;          // Data especial
  backgroundColor: string;       // Cor de fundo
  textColor: string;            // Cor do texto
  customizationData: object;    // Dados de personalização
  spotifyTrack?: object;        // Música do Spotify
  photos: string[];             // URLs das fotos no Storage
  qrCode: string;               // URL do QR Code
  paymentId: string;            // ID do pagamento
  paymentStatus: string;        // 'pending' | 'approved' | 'rejected'
  createdAt: Date;              // Data de criação
  updatedAt: Date;              // Data de atualização
}
```

## 🔧 Próximos Passos

### 1. **Integração Real com Mercado Pago**
- Substituir a simulação pela API real do Mercado Pago
- Implementar webhooks para confirmação de pagamento
- Adicionar tratamento de erros de pagamento

### 2. **Autenticação de Usuários**
- Implementar login/registro com Firebase Auth
- Associar presentes aos usuários
- Histórico de presentes por usuário

### 3. **Melhorias de Performance**
- Implementar cache para presentes
- Otimizar upload de imagens
- Lazy loading para fotos

### 4. **Analytics e Monitoramento**
- Integrar Firebase Analytics
- Monitorar conversões de pagamento
- Acompanhar uso dos presentes

## 📱 URLs de Acesso

- **Criação**: `/criar-presente`
- **Checkout**: `/checkout`
- **Preview**: `/preview-presente`
- **Visualização**: `/presente/:id` (via QR Code)

## 🎯 Testando o Sistema

1. **Criar Presente**: Acesse `/criar-presente`
2. **Personalizar**: Use todas as opções de edição
3. **Gerar QR**: Clique em "Gerar QR Code"
4. **Checkout**: Complete o pagamento
5. **Visualizar**: Acesse o presente via QR Code

O sistema está pronto para uso! 🎉
