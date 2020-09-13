import {Service} from 'homebridge';
import {BaseService, BaseServiceProps} from "./base.service";
import {BooleanWebhookCharacteristic, BooleanWebhookCharacteristicProps} from "../characteristics";
import {HomebridgeContextProxy} from "homebridge-base-platform/dist/context-proxy";

export interface SwitchServiceProps extends BaseServiceProps {
    onWebhookCharacteristic: BooleanWebhookCharacteristicProps;
}

export class SwitchService extends BaseService implements SwitchServiceProps {

    readonly onWebhookCharacteristic: BooleanWebhookCharacteristic;

    public constructor(props: SwitchServiceProps, proxy: HomebridgeContextProxy, service: Service) {
        super(props, proxy, service);
        this.onWebhookCharacteristic = new BooleanWebhookCharacteristic(
            props.onWebhookCharacteristic,
            service.getCharacteristic(this.proxy.Characteristic.On)
        )
    }
}
