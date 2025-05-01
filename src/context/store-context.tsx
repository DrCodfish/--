
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Store {
  id: string;
  name: string;
  region: string;
  password: string;
  ownerId: string;
}

export interface Region {
  id: string;
  name: string;
}

interface StoreContextType {
  stores: Store[];
  addStore: (store: Omit<Store, 'id'>) => Store;
  regions: Region[];
  addRegion: (name: string) => Region;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

// Initial mock data
const initialRegions: Region[] = [
  { id: '1', name: 'North' },
  { id: '2', name: 'South' },
  { id: '3', name: 'East' },
  { id: '4', name: 'West' },
];

const initialStores: Store[] = [
  { id: '1', name: 'Downtown Store', region: 'North', password: 'store123', ownerId: '1' },
  { id: '2', name: 'Uptown Store', region: 'South', password: 'store456', ownerId: '3' },
];

export const useStore = () => {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [stores, setStores] = useState<Store[]>(initialStores);
  const [regions, setRegions] = useState<Region[]>(initialRegions);

  const generateId = () => Math.random().toString(36).substring(2, 9);

  const addStore = (storeData: Omit<Store, 'id'>) => {
    const newStore = { ...storeData, id: generateId() };
    setStores([...stores, newStore]);
    return newStore;
  };

  const addRegion = (name: string) => {
    const newRegion = { id: generateId(), name };
    setRegions([...regions, newRegion]);
    return newRegion;
  };

  return (
    <StoreContext.Provider value={{
      stores,
      addStore,
      regions,
      addRegion
    }}>
      {children}
    </StoreContext.Provider>
  );
};
