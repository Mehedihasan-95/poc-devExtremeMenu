import { Base } from "./Base";
import { UserInfo } from "./Users";

export class WaterDispanceSlot extends Base {
    startDate: string | Date;
    endTime: string | Date;
    endDate: string | Date;
    waterBarge: WaterBarge | null;
    waterBargeId: number;
    waterOutlet: WaterOutlet | null;
    waterOutletId: number;
}

export class WaterBarge extends Base {
    name: string;
}

export class WaterOutlet extends Base {
    name: string;
    bargeId: number;
}

export class WaterRequisition extends Base {
    reqDate: string;
    regNo: string;
    userName: string;
    userId: number;
    uomId: number;
    qty: number;
    rate: number;
    reqStatus: string;
    userInfo: UserInfo | null;
    scheduleTime: string;
}

export class WaterDistribution extends Base {
    waterRequisition: WaterRequisition | null;
    waterRequisitionId: number;
    startDate: string | Date;
    endDate: string | Date;
    userId: number;
    uomId: number;
    outletId: number;
    rate: number;
    qty: number;
    distributionStatus: string;
    text: string;
    userInfo: UserInfo | null;
    paymentStatus: string;
    distributedQty: number;
}

export class WaterDistributionDTO extends WaterRequisition {
    CellNo!: string;
    unit: string;
}