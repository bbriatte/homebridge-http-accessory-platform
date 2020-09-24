import {Service} from 'homebridge';
import {HomebridgeContextProxy} from "homebridge-base-platform";
import {BaseServiceConfig} from "../accessory-config";

export type HttpServiceConstructor = { new (config: BaseServiceConfig, proxy: HomebridgeContextProxy, service: Service): BaseService };

export abstract class BaseService {
    readonly config: BaseServiceConfig;
    readonly proxy: HomebridgeContextProxy;
    readonly service: Service;

    protected constructor(config: BaseServiceConfig, proxy: HomebridgeContextProxy, service: Service) {
        this.config = config;
        this.proxy = proxy;
        this.service = service;
    }
}
