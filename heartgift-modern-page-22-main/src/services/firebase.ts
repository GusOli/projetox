// Configuração do Firebase
// Este arquivo será configurado com as credenciais reais do Firebase

import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, doc, getDoc, updateDoc, query, where, getDocs } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// Configuração do Firebase (substitua pelas suas credenciais)
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

/**
 * Interface para dados do presente no Firebase
 */
export interface FirebaseGiftData {
  id: string;
  theme: string;
  recipientName: string;
  senderName: string;
  message: string;
  specialDate: string;
  backgroundColor: string;
  textColor: string;
  customizationData: any;
  spotifyTrack?: any;
  photos?: string[]; // URLs das fotos no Firebase Storage
  qrCode: string;
  paymentId: string;
  paymentStatus: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Salva um presente no Firebase
 */
export const saveGiftToFirebase = async (giftData: any): Promise<FirebaseGiftData> => {
  try {
    // Upload das fotos para o Firebase Storage
    const photoUrls: string[] = [];
    if (giftData.photos && giftData.photos.length > 0) {
      for (let i = 0; i < giftData.photos.length; i++) {
        const photo = giftData.photos[i];
        const photoRef = ref(storage, `gifts/${Date.now()}_${i}.jpg`);
        await uploadBytes(photoRef, photo);
        const photoUrl = await getDownloadURL(photoRef);
        photoUrls.push(photoUrl);
      }
    }

    // Gera ID único para o presente
    const giftId = `gift_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // Gera QR Code
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/presente/${giftId}`;

    // Dados do presente para salvar
    const firebaseGiftData: Omit<FirebaseGiftData, 'id'> = {
      theme: giftData.theme,
      recipientName: giftData.recipientName,
      senderName: giftData.senderName,
      message: giftData.message,
      specialDate: giftData.specialDate,
      backgroundColor: giftData.backgroundColor,
      textColor: giftData.textColor,
      customizationData: giftData.customizationData || {},
      spotifyTrack: giftData.spotifyTrack,
      photos: photoUrls,
      qrCode: qrCodeUrl,
      paymentId: giftData.paymentId || '',
      paymentStatus: giftData.paymentStatus || 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    // Salva no Firestore
    const docRef = await addDoc(collection(db, 'gifts'), firebaseGiftData);
    
    return {
      id: docRef.id,
      ...firebaseGiftData
    };
  } catch (error) {
    console.error('Erro ao salvar presente no Firebase:', error);
    throw error;
  }
};

/**
 * Busca um presente pelo ID
 */
export const getGiftById = async (giftId: string): Promise<FirebaseGiftData | null> => {
  try {
    const giftRef = doc(db, 'gifts', giftId);
    const giftSnap = await getDoc(giftRef);
    
    if (giftSnap.exists()) {
      return {
        id: giftSnap.id,
        ...giftSnap.data()
      } as FirebaseGiftData;
    } else {
      return null;
    }
  } catch (error) {
    console.error('Erro ao buscar presente:', error);
    throw error;
  }
};

/**
 * Atualiza status de pagamento de um presente
 */
export const updateGiftPaymentStatus = async (giftId: string, paymentId: string, status: 'approved' | 'rejected'): Promise<void> => {
  try {
    const giftRef = doc(db, 'gifts', giftId);
    await updateDoc(giftRef, {
      paymentId,
      paymentStatus: status,
      updatedAt: new Date()
    });
  } catch (error) {
    console.error('Erro ao atualizar status de pagamento:', error);
    throw error;
  }
};

/**
 * Busca presentes por status de pagamento
 */
export const getGiftsByPaymentStatus = async (status: 'pending' | 'approved' | 'rejected'): Promise<FirebaseGiftData[]> => {
  try {
    const q = query(collection(db, 'gifts'), where('paymentStatus', '==', status));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseGiftData[];
  } catch (error) {
    console.error('Erro ao buscar presentes por status:', error);
    throw error;
  }
};

/**
 * Busca presentes de um usuário específico
 */
export const getGiftsBySender = async (senderName: string): Promise<FirebaseGiftData[]> => {
  try {
    const q = query(collection(db, 'gifts'), where('senderName', '==', senderName));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as FirebaseGiftData[];
  } catch (error) {
    console.error('Erro ao buscar presentes do remetente:', error);
    throw error;
  }
};

/**
 * Simula integração com Mercado Pago
 * Em produção, isso seria substituído pela integração real com a API do Mercado Pago
 */
export const processMercadoPagoPayment = async (paymentData: {
  plan: string;
  price: number;
  giftData: any;
}): Promise<{id: string, status: string}> => {
  try {
    // Simula delay da API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simula resposta de sucesso (em produção, seria uma chamada real para a API do Mercado Pago)
    return {
      id: `mp_${Date.now()}`,
      status: 'approved'
    };
  } catch (error) {
    console.error('Erro no processamento do pagamento:', error);
    throw error;
  }
};
