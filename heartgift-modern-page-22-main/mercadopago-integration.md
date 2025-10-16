# 💳 Integração com Mercado Pago

## 📋 Configuração Inicial

### 1. **Criar Conta no Mercado Pago**
1. Acesse [Mercado Pago Developers](https://www.mercadopago.com.br/developers)
2. Faça login ou crie uma conta
3. Vá em "Suas integrações" > "Criar aplicação"
4. Preencha os dados da aplicação
5. Copie as credenciais (Public Key e Access Token)

### 2. **Instalar SDK do Mercado Pago**
```bash
npm install mercadopago
```

### 3. **Configurar Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
```env
MERCADOPAGO_PUBLIC_KEY=sua_public_key_aqui
MERCADOPAGO_ACCESS_TOKEN=sua_access_token_aqui
MERCADOPAGO_WEBHOOK_SECRET=seu_webhook_secret_aqui
```

## 🔧 Implementação Real

### 1. **Atualizar Serviço de Pagamento**
Substitua o conteúdo de `src/services/firebase.ts` na função `processMercadoPagoPayment`:

```typescript
import { MercadoPagoConfig, Payment, Preference } from 'mercadopago';

// Configuração do Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: process.env.MERCADOPAGO_ACCESS_TOKEN!,
  options: { timeout: 5000 }
});

const payment = new Payment(client);
const preference = new Preference(client);

export const processMercadoPagoPayment = async (paymentData: {
  plan: string;
  price: number;
  giftData: any;
}): Promise<{id: string, status: string}> => {
  try {
    // Criar preferência de pagamento
    const preferenceData = {
      items: [
        {
          title: `Presente Digital - ${paymentData.plan}`,
          quantity: 1,
          unit_price: paymentData.price,
          currency_id: 'BRL'
        }
      ],
      back_urls: {
        success: `${window.location.origin}/checkout/success`,
        failure: `${window.location.origin}/checkout/failure`,
        pending: `${window.location.origin}/checkout/pending`
      },
      auto_return: 'approved',
      external_reference: `gift_${Date.now()}`,
      notification_url: `${window.location.origin}/api/webhooks/mercadopago`
    };

    const response = await preference.create({ body: preferenceData });
    
    return {
      id: response.id!,
      status: 'pending' // Será atualizado via webhook
    };
  } catch (error) {
    console.error('Erro ao criar preferência de pagamento:', error);
    throw error;
  }
};
```

### 2. **Criar Webhook para Confirmação**
Crie o arquivo `src/api/webhooks/mercadopago.ts`:

```typescript
import { NextApiRequest, NextApiResponse } from 'next';
import { updateGiftPaymentStatus } from '@/services/firebase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { type, data } = req.body;

    if (type === 'payment') {
      const paymentId = data.id;
      
      // Aqui você faria uma chamada para a API do Mercado Pago
      // para verificar o status do pagamento
      const paymentStatus = 'approved'; // Simulado
      
      // Atualizar status no Firebase
      await updateGiftPaymentStatus(paymentId, paymentId, paymentStatus);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error('Erro no webhook:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
```

### 3. **Atualizar Página de Checkout**
Modifique a página de checkout para usar a preferência do Mercado Pago:

```typescript
// Em src/pages/Checkout.tsx
const handlePayment = async () => {
  if (!paymentData) return;

  setIsProcessing(true);
  setPaymentStatus('processing');

  try {
    // Criar preferência de pagamento
    const paymentResult = await processMercadoPagoPayment(paymentData);
    
    // Redirecionar para o Mercado Pago
    window.location.href = `https://www.mercadopago.com.br/checkout/v1/redirect?pref_id=${paymentResult.id}`;
    
  } catch (error) {
    console.error('Erro no pagamento:', error);
    setPaymentStatus('error');
    setIsProcessing(false);
  }
};
```

## 🎯 Fluxo Completo de Pagamento

### 1. **Usuário Clica em "Gerar QR Code"**
- Dados do presente são validados
- Navegação para `/checkout`

### 2. **Página de Checkout**
- Exibe resumo do pedido
- Formulário de dados do cartão
- Botão "Pagar" cria preferência no Mercado Pago

### 3. **Redirecionamento para Mercado Pago**
- Usuário é redirecionado para o checkout do MP
- Processa pagamento com cartão/PIX/boleto
- Mercado Pago retorna para sua aplicação

### 4. **Confirmação via Webhook**
- Mercado Pago envia notificação para seu webhook
- Status do pagamento é atualizado no Firebase
- Presente é liberado para visualização

### 5. **Geração do QR Code**
- Após confirmação, presente é salvo no Firebase
- QR Code é gerado com link para visualização
- Usuário pode compartilhar o presente

## 🔒 Segurança

### 1. **Validação de Webhooks**
```typescript
import crypto from 'crypto';

const verifyWebhook = (req: NextApiRequest) => {
  const signature = req.headers['x-signature'] as string;
  const body = JSON.stringify(req.body);
  const secret = process.env.MERCADOPAGO_WEBHOOK_SECRET!;
  
  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');
    
  return `sha256=${hash}` === signature;
};
```

### 2. **Validação de Dados**
- Sempre validar dados recebidos do Mercado Pago
- Verificar status do pagamento antes de liberar presente
- Implementar logs para auditoria

## 📊 Monitoramento

### 1. **Logs de Pagamento**
```typescript
const logPayment = (paymentId: string, status: string, giftId: string) => {
  console.log(`Payment ${paymentId} - Status: ${status} - Gift: ${giftId}`);
  // Implementar sistema de logs mais robusto
};
```

### 2. **Métricas Importantes**
- Taxa de conversão de checkout
- Tempo médio de processamento
- Erros de pagamento por tipo
- Presentes gerados por dia

## 🚀 Deploy e Produção

### 1. **Configurar Webhook em Produção**
- URL do webhook: `https://seudominio.com/api/webhooks/mercadopago`
- Configurar no painel do Mercado Pago
- Testar em ambiente de sandbox primeiro

### 2. **Variáveis de Ambiente**
```env
# Produção
MERCADOPAGO_PUBLIC_KEY=pk_live_...
MERCADOPAGO_ACCESS_TOKEN=APP_USR_...
MERCADOPAGO_WEBHOOK_SECRET=seu_secret_producao

# Sandbox (para testes)
MERCADOPAGO_PUBLIC_KEY=pk_test_...
MERCADOPAGO_ACCESS_TOKEN=TEST_...
```

## 🧪 Testando a Integração

### 1. **Cartões de Teste**
```
Visa: 4509 9535 6623 3704
Mastercard: 5031 7557 3453 0604
CVV: 123
Vencimento: 11/25
```

### 2. **Cenários de Teste**
- Pagamento aprovado
- Pagamento rejeitado
- Pagamento pendente
- Webhook com dados inválidos
- Timeout de pagamento

## 📈 Próximos Passos

1. **Implementar a integração real** seguindo este guia
2. **Configurar webhooks** no painel do Mercado Pago
3. **Testar em sandbox** antes de ir para produção
4. **Monitorar logs** e métricas de pagamento
5. **Implementar retry** para falhas de webhook

O sistema está preparado para a integração real! 🎉
