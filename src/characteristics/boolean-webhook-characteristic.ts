import {BaseWebhookCharacteristic, BaseWebhookCharacteristicProps} from "./base-webhook-characteristic";
import {Characteristic} from 'homebridge';
import axios from 'axios';
import {callbackify} from "homebridge-base-platform";

export interface BooleanWebhookCharacteristicProps extends BaseWebhookCharacteristicProps<boolean> {
    readonly enableURL: string;
    readonly disableURL?: string; // if different than activate
}

export class BooleanWebhookCharacteristic extends BaseWebhookCharacteristic<boolean> implements BooleanWebhookCharacteristicProps {
    public readonly enableURL: string;
    public readonly disableURL?: string;

    protected transformStatusResponse(raw: any): boolean {
        return raw == 1 || raw === 'true';
    }

    public constructor(props: BooleanWebhookCharacteristicProps, characteristic: Characteristic) {
        super(props, characteristic);
        this.enableURL = props.enableURL;
        this.disableURL = props.disableURL;
        this.characteristic
            .on('get', callbackify(async () => {
                const isOn = await this.getStatus();
                //if(this.device.verbose) {
                //    this.log(`[${this.getDisplayName()}] ${isOn ? 'Is on' : 'Is off'}`);
                //}
                return isOn;
            }))
            .on('set', callbackify(this.setOn.bind(this)));
    }

    public async setOn(on: boolean): Promise<void> {
        let targetURL = on ? this.enableURL : (this.disableURL ? this.disableURL : this.enableURL);
        try {
            await axios.get(targetURL);
            this.storeValue = on;
        } catch (err) {

        }
    }
}
