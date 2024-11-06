export interface Item {
  id: string;
  name: string;
  category: string;
  description: string;
  quantity: number;
  available: number;
  notes?: string;
  lastUsed?: Date;
}

export interface ChecklistTemplate {
  id: string;
  name: string;
  type: 'party' | 'concert' | 'wedding' | 'other';
  categories: string[];
  items: string[];
}

export interface MerchandiseItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  variants?: {
    size?: string;
    color?: string;
    quantity: number;
  }[];
  status: 'draft' | 'ordered' | 'received';
  orderDetails?: {
    orderId: string;
    orderDate: Date;
    expectedDelivery?: Date;
  };
}

export interface EquipmentRental {
  id: string;
  name: string;
  description: string;
  quantity: number;
  pickupDate: Date;
  returnDate: Date;
  delivery: boolean;
  deliveryAddress?: string;
  supplier: {
    name: string;
    contact: string;
    phone?: string;
  };
  status: 'pending' | 'confirmed' | 'picked-up' | 'returned';
  cost: number;
}

export interface Event {
  id: string;
  name: string;
  date: Date;
  type: string;
  venue?: string;
  expectedAttendees?: number;
  checklist: {
    itemId: string;
    completed: boolean;
  }[];
  notes?: string;
  details?: {
    venueContact?: string;
    contactPhone?: string;
    loadInTime?: string;
    soundCheck?: string;
    timeline?: Record<string, string>;
    [key: string]: any;
  };
  merchandise?: MerchandiseItem[];
  equipment?: EquipmentRental[];
}