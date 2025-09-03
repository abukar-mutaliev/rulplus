import mongoose, { Document, Schema } from 'mongoose';

// Интерфейс для учредителя
interface IFounder {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

// Интерфейс для режима работы
interface IWorkSchedule {
  weekdays: string;
  saturday: string;
  sunday: string;
  holidays: string;
}

// Интерфейс для филиала
interface IBranch {
  name: string;
  address: string;
  phone: string;
}

// Основной интерфейс
export interface IBasicInfo extends Document {
  fullName: string;
  shortName: string;
  foundedDate: string;
  legalAddress: string;
  actualAddress: string;
  phone: string;
  email: string;
  website: string;
  founder: IFounder;
  workSchedule: IWorkSchedule;
  branches: IBranch[];
  lastUpdated: Date;
  updatedBy?: string;
}

// Схема для учредителя
const FounderSchema = new Schema<IFounder>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  website: { type: String, required: true }
}, { _id: false });

// Схема для режима работы
const WorkScheduleSchema = new Schema<IWorkSchedule>({
  weekdays: { type: String, required: true },
  saturday: { type: String, required: true },
  sunday: { type: String, required: true },
  holidays: { type: String, required: true }
}, { _id: false });

// Схема для филиала
const BranchSchema = new Schema<IBranch>({
  name: { type: String, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true }
}, { _id: false });

// Основная схема
const BasicInfoSchema = new Schema<IBasicInfo>({
  fullName: { 
    type: String, 
    required: true,
    trim: true 
  },
  shortName: { 
    type: String, 
    required: true,
    trim: true 
  },
  foundedDate: { 
    type: String, 
    required: true 
  },
  legalAddress: { 
    type: String, 
    required: true,
    trim: true 
  },
  actualAddress: { 
    type: String, 
    required: true,
    trim: true 
  },
  phone: { 
    type: String, 
    required: true,
    trim: true 
  },
  email: { 
    type: String, 
    required: true,
    trim: true,
    lowercase: true 
  },
  website: { 
    type: String, 
    required: true,
    trim: true 
  },
  founder: { 
    type: FounderSchema, 
    required: true 
  },
  workSchedule: { 
    type: WorkScheduleSchema, 
    required: true 
  },
  branches: [BranchSchema],
  lastUpdated: { 
    type: Date, 
    default: Date.now 
  },
  updatedBy: { 
    type: String,
    trim: true 
  }
}, {
  timestamps: true
});

// Индексы
BasicInfoSchema.index({ lastUpdated: -1 });

export const BasicInfo = mongoose.model<IBasicInfo>('BasicInfo', BasicInfoSchema); 