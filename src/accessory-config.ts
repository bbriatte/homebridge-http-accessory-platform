import {BaseGlobalConfig} from "homebridge-base-platform";
import {HttpServiceType} from "./services";

export interface GlobalConfig extends BaseGlobalConfig {
    readonly pollingInterval?: number;
}

export interface HttpAccessoryConfig extends GlobalConfig {
    readonly name: string;
    readonly serialNumber: string;
    readonly manufacturer?: string;
    readonly model?: string;
    readonly firmwareRevision?: string;
    readonly services: BaseServiceConfig[];
}

export interface BaseWebhook<T> {
    readonly statusURL?: string;
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

export interface BaseServiceConfig {
    readonly type: HttpServiceType;
    readonly name?: string;
}

export interface SwitchServiceConfig extends BaseServiceConfig {
    readonly on: BooleanWebhook | string;
}

export interface FanServiceConfig extends BaseServiceConfig {
    readonly on: BooleanWebhook | string;
    readonly rotationDirection?: NumberWebhook;
    readonly rotationSpeed?: NumberWebhook;
}

export interface LightbulbServiceConfig extends BaseServiceConfig {
    readonly on: BooleanWebhook | string;
    readonly brightness?: NumberWebhook;
    readonly hue?: NumberWebhook;
    readonly saturation?: NumberWebhook;
    readonly colorTemperature?: NumberWebhook;
}
