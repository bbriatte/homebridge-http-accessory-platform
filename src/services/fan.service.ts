import {BaseService} from "./base.service";
import {BooleanWebhookCharacteristic, NumberWebhookCharacteristic} from "../characteristics";
import {BooleanWebhook, FanServiceConfig} from "../accessory-config";
import {HomebridgeContextProxy} from "homebridge-base-platform";
import {Service} from "homebridge";

export class HttpFanService extends BaseService {

    readonly onWebhookCharacteristic: BooleanWebhookCharacteristic;
    readonly rotationDirectionWebhookCharacteristic?: NumberWebhookCharacteristic;
    readonly rotationSpeedWebhookCharacteristic?: NumberWebhookCharacteristic;

    public constructor(config: FanServiceConfig, proxy: HomebridgeContextProxy, service: Service) {
        super(config, proxy, service);
        this.onWebhookCharacteristic = new BooleanWebhookCharacteristic(
            typeof config.on === "string" ? {
                enableURL: config.on
            }: config.on as BooleanWebhook,
            service.getCharacteristic(this.proxy.Characteristic.On)
        );
        if(config.rotationDirection !== undefined) {
            this.rotationDirectionWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.rotationDirection,
                service.getCharacteristic(this.proxy.Characteristic.RotationDirection)
            );
        }
        if(config.rotationSpeed !== undefined) {
            this.rotationSpeedWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.rotationSpeed,
                service.getCharacteristic(this.proxy.Characteristic.RotationSpeed)
            );
        }

    }
}