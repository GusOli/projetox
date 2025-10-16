import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/**
 * Tipos de planos disponíveis
 */
export type PlanType = 'basico' | 'premium' | 'deluxe';

/**
 * Interface do contexto de planos
 */
interface PlanContextType {
  selectedPlan: PlanType;
  setSelectedPlan: (plan: PlanType) => void;
  getPlanFeatures: (plan: PlanType) => PlanFeatures;
  isPlanFeatureAllowed: (feature: string) => boolean;
}

/**
 * Funcionalidades disponíveis por plano
 */
interface PlanFeatures {
  maxPhotos: number;
  musicUpload: boolean;
  spotifyIntegration: boolean;
  customColors: boolean;
  qrCode: boolean;
  animations: boolean;
  customDomain: boolean;
  prioritySupport: boolean;
  visualEffects: boolean;
  photoFrames: boolean;
  advancedCustomization: boolean;
}

/**
 * Configurações de funcionalidades por plano
 */
const planConfigs: Record<PlanType, PlanFeatures> = {
  basico: {
    maxPhotos: 5,
    musicUpload: false,
    spotifyIntegration: true,
    customColors: true,
    qrCode: true,
    animations: false,
    customDomain: false,
    prioritySupport: false,
    visualEffects: false,
    photoFrames: false,
    advancedCustomization: false
  },
  premium: {
    maxPhotos: -1, // Ilimitado
    musicUpload: true,
    spotifyIntegration: true,
    customColors: true,
    qrCode: true,
    animations: true,
    customDomain: false,
    prioritySupport: true,
    visualEffects: true,
    photoFrames: true,
    advancedCustomization: true
  },
  deluxe: {
    maxPhotos: -1, // Ilimitado
    musicUpload: true,
    spotifyIntegration: true,
    customColors: true,
    qrCode: true,
    animations: true,
    customDomain: true,
    prioritySupport: true,
    visualEffects: true,
    photoFrames: true,
    advancedCustomization: true
  }
};

const PlanContext = createContext<PlanContextType | undefined>(undefined);

/**
 * Provider do contexto de planos
 */
export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType>('premium');

  /**
   * Verifica URL para plano selecionado na entrada
   */
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const planParam = urlParams.get('plano');
    
    if (planParam && ['basico', 'premium', 'deluxe'].includes(planParam)) {
      setSelectedPlan(planParam as PlanType);
    }
  }, []);

  /**
   * Obtém as funcionalidades do plano
   */
  const getPlanFeatures = (plan: PlanType): PlanFeatures => {
    return planConfigs[plan];
  };

  /**
   * Verifica se uma funcionalidade está disponível no plano atual
   */
  const isPlanFeatureAllowed = (feature: string): boolean => {
    const features = planConfigs[selectedPlan];
    return (features as any)[feature] === true || (features as any)[feature] === -1;
  };

  return (
    <PlanContext.Provider value={{
      selectedPlan,
      setSelectedPlan,
      getPlanFeatures,
      isPlanFeatureAllowed
    }}>
      {children}
    </PlanContext.Provider>
  );
};

/**
 * Hook para usar o contexto de planos
 */
export const usePlan = () => {
  const context = useContext(PlanContext);
  if (context === undefined) {
    throw new Error('usePlan must be used within a PlanProvider');
  }
  return context;
};