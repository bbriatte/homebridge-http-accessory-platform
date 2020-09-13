import {BaseGlobalConfig} from "homebridge-base-platform";

export interface GlobalConfig extends BaseGlobalConfig {
    readonly pollingInterval?: number;
}

export interface AccessoryConfig<S extends BaseService> extends GlobalConfig {
    readonly manufacturer?: string;
    readonly model?: string;
    readonly serialNumber?: string;
    readonly firmwareRevision?: string;
    readonly services: S[];
}

export interface BaseWebhook<T> {
    readonly statusURL?: string;
    readonly value: T
}

export interface BooleanWebhook extends BaseWebhook<boolean> {
    readonly enableURL: string;
    readonly disableURL?: string; // if different than activate
}

export interface SetValueWebhook<T> {
    readonly setURL: string;
    readonly value: T;
}

export interface NumberWebhook extends BaseWebhook<number> {
    readonly defaultIndex: number;
    readonly steps: SetValueWebhook<number>[];
}



export interface BaseService {
    readonly type: ServiceType;
    readonly name?: string;
}

export interface SwitchService extends BaseService {
    readonly on: BooleanWebhook;
}

export interface FanService extends BaseService {
    readonly on: BooleanWebhook;
    readonly rotationDirection?: NumberWebhook;
    readonly rotationSpeed?: NumberWebhook;
}

export interface LightbulbService extends BaseService {
    readonly on: BooleanWebhook;
    readonly brightness?: NumberWebhook;
    readonly hue?: NumberWebhook;
    readonly saturation?: NumberWebhook;
    readonly colorTemperature?: NumberWebhook;
}
