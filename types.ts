export enum ImageRatio {
    R1_1 = "1:1",
    R9_16 = "9:16",
    R16_9 = "16:9",
    R4_3 = "4:3",
    R3_4 = "3:4",
    R3_2 = "3:2",
    R2_3 = "2:3",
    R21_9 = "21:9"
}

export enum ScreenRatio {
    R16_9 = "16:9",
    R4_3 = "4:3"
}

export enum VenueType {
    MUSEUM = "museum",
    SCIENCE = "science",
    PLANNING = "planning",
    ENTERPRISE = "enterprise",
    MEMORIAL = "memorial",
    ART = "art",
    THEMATIC = "thematic",
    TEMPORARY = "temporary",
    LIBRARY = "library"
}

export enum CalculationStrategy {
    QUALITY = "quality", // 追求安全与高品质
    TRAFFIC = "traffic"  // 追求流量与收益
}

export interface VenueConfig {
    name: string;
    description: string;
    // Ranges for strategy selection
    coefficientMin: number;
    coefficientMax: number;
    comfortDensityMin: number;
    comfortDensityMax: number;
    // Fixed constants (unless ranges specified in future)
    peakDensity: number;      // 高峰人均
    safetyDensity: number;    // 安全上限
    stayCoeff: number;        // minutes per 100m2 (Standard Type)
}

export const VENUE_DATA: Record<VenueType, VenueConfig> = {
    [VenueType.MUSEUM]: {
        name: "博物馆",
        description: "文物精细，步速慢",
        coefficientMin: 0.60,
        coefficientMax: 0.75,
        comfortDensityMin: 3.0,
        comfortDensityMax: 4.0,
        peakDensity: 2.0,
        safetyDensity: 1.0,
        stayCoeff: 15
    },
    [VenueType.SCIENCE]: {
        name: "科技馆",
        description: "互动为主，操作空间",
        coefficientMin: 0.55,
        coefficientMax: 0.65,
        comfortDensityMin: 3.0,
        comfortDensityMax: 4.0,
        peakDensity: 2.0,
        safetyDensity: 1.0,
        stayCoeff: 35
    },
    [VenueType.PLANNING]: {
        name: "规划馆",
        description: "观看影片消耗时间",
        coefficientMin: 0.55,
        coefficientMax: 0.65,
        comfortDensityMin: 4.0,
        comfortDensityMax: 4.5,
        peakDensity: 2.5,
        safetyDensity: 1.0,
        stayCoeff: 15
    },
    [VenueType.ENTERPRISE]: {
        name: "企业馆",
        description: "商务接待，专人导览",
        coefficientMin: 0.70,
        coefficientMax: 0.80,
        comfortDensityMin: 6.0,
        comfortDensityMax: 8.0,
        peakDensity: 4.0,
        safetyDensity: 1.0,
        stayCoeff: 8
    },
    [VenueType.MEMORIAL]: {
        name: "纪念馆",
        description: "庄重沉浸，场景复原",
        coefficientMin: 0.50,
        coefficientMax: 0.65,
        comfortDensityMin: 4.0,
        comfortDensityMax: 5.0,
        peakDensity: 2.5,
        safetyDensity: 1.0,
        stayCoeff: 30
    },
    [VenueType.ART]: {
        name: "美术馆",
        description: "中间空旷，挂墙展示",
        coefficientMin: 0.75,
        coefficientMax: 0.85,
        comfortDensityMin: 4.0,
        comfortDensityMax: 5.0,
        peakDensity: 2.5,
        safetyDensity: 1.0,
        stayCoeff: 12
    },
    [VenueType.THEMATIC]: {
        name: "专题展",
        description: "交互设备多，耗时长",
        coefficientMin: 0.45,
        coefficientMax: 0.60,
        comfortDensityMin: 3.0,
        comfortDensityMax: 4.0,
        peakDensity: 2.0,
        safetyDensity: 1.0,
        stayCoeff: 40
    },
    [VenueType.TEMPORARY]: {
        name: "临展厅",
        description: "布展密度波动大",
        coefficientMin: 0.65,
        coefficientMax: 0.85,
        comfortDensityMin: 2.5,
        comfortDensityMax: 3.5,
        peakDensity: 1.5,
        safetyDensity: 1.0,
        stayCoeff: 15
    },
    [VenueType.LIBRARY]: {
        name: "图书馆",
        description: "长驻型，翻台率低",
        coefficientMin: 0.55,
        coefficientMax: 0.70,
        comfortDensityMin: 6.0,
        comfortDensityMax: 8.0,
        peakDensity: 4.0,
        safetyDensity: 1.0,
        stayCoeff: 60
    }
};