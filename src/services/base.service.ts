import {Service} from 'homebridge';
import {HomebridgeContextProxy} from "homebridge-base-platform/dist/context-proxy";

export enum ServiceType {
    SWITCH = 'switch',
    LIGHTBULB = 'lightbulb',
    FAN = 'fan'
}

export interface BaseServiceProps {
    readonly type: ServiceType;
    readonly name?: string;
}

export abstract class BaseService implements BaseServiceProps {
    readonly type: ServiceType;
    readonly name?: string;
    readonly proxy: HomebridgeContextProxy;
    readonly service: Service;

    protected constructor(props: BaseServiceProps, proxy: HomebridgeContextProxy, service: Service) {
        this.type = props.type;
        this.name = props.name;
        this.proxy = proxy;
        this.service = service;
    }
}
