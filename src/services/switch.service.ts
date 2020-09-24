import {Service} from 'homebridge';
import {BaseService} from "./base.service";
import {BooleanWebhookCharacteristic} from "../characteristics";
import {HomebridgeContextProxy} from "homebridge-base-platform";
import {BooleanWebhook, SwitchServiceConfig} from "../accessory-config";

export class HttpSwitchService extends BaseService {

    readonly onWebhookCharacteristic: BooleanWebhookCharacteristic;

    public constructor(config: SwitchServiceConfig, proxy: HomebridgeContextProxy, service: Service) {
        super(config, proxy, service);
        this.onWebhookCharacteristic = new BooleanWebhookCharacteristic(
            typeof config.on === "string" ? {
                enableURL: config.on
            }: config.on as BooleanWebhook,
            service.getCharacteristic(this.proxy.Characteristic.On)
        )
    }
}
