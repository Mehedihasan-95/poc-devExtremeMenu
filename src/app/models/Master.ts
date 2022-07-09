import { Base } from "./Base";

export class Feature extends Base {
    name: string;
    parentName: string;
    parentId: number;
    url: string;
    iconName: string;
    order: number;
    permissions: string;
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
}

export class UOM extends Base {
    name: string;
    code: string;
}

export class TarrifRate extends Base {
    slab: string;
    rate: string;
    uom: UOM | null;
    uomId: number;
}

export class Role extends Base {
    name: string;
}

export class Permission extends Base {
    role: Role | null;
    roleId: number;
    feature: Feature | null;
    featureId: number;
    permissions: string;
}

export class Menu {
    text: string;
    icon?: string;
    path?: string;
    items: Menu[];
}

export class PagePermissions {
    add: boolean = false;
    edit: boolean = false;
    delete: boolean = false;
}