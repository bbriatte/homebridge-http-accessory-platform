import {BaseService} from "./base.service";
import {BooleanWebhookCharacteristic, NumberWebhookCharacteristic} from "../characteristics";
import {BooleanWebhook, LightbulbServiceConfig} from "../accessory-config";
import {HomebridgeContextProxy} from "homebridge-base-platform";
import {Service} from "homebridge";

export class HttpLightbulbService extends BaseService {

    readonly onWebhookCharacteristic: BooleanWebhookCharacteristic;
    readonly brightnessWebhookCharacteristic?: NumberWebhookCharacteristic;
    readonly hueWebhookCharacteristic?: NumberWebhookCharacteristic;
    readonly saturationWebhookCharacteristic?: NumberWebhookCharacteristic;
    readonly colorTemperatureWebhookCharacteristic?: NumberWebhookCharacteristic;

    public constructor(config: LightbulbServiceConfig, proxy: HomebridgeContextProxy, service: Service) {
        super(config, proxy, service);
        this.onWebhookCharacteristic = new BooleanWebhookCharacteristic(
            typeof config.on === "string" ? {
                enableURL: config.on
            }: config.on as BooleanWebhook,
            service.getCharacteristic(this.proxy.Characteristic.On)
        );
        if(config.brightness !== undefined) {
            this.brightnessWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.brightness,
                service.getCharacteristic(this.proxy.Characteristic.Brightness)
            );
        }
        if(config.hue !== undefined) {
            this.hueWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.hue,
                service.getCharacteristic(this.proxy.Characteristic.Hue)
            );
        }
        if(config.saturation !== undefined) {
            this.saturationWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.saturation,
                service.getCharacteristic(this.proxy.Characteristic.Saturation)
            );
        }
        if(config.colorTemperature !== undefined) {
            this.colorTemperatureWebhookCharacteristic = new NumberWebhookCharacteristic(
                config.colorTemperature,
                service.getCharacteristic(this.proxy.Characteristic.ColorTemperature)
            );
        }
    }
}