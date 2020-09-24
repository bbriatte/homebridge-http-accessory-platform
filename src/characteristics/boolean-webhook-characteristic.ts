import {BaseWebhookCharacteristic} from "./base-webhook-characteristic";
import {Characteristic} from 'homebridge';
import axios from 'axios';
import {callbackify} from "homebridge-base-platform";
import {BooleanWebhook} from "../accessory-config";

export class BooleanWebhookCharacteristic extends BaseWebhookCharacteristic<boolean> {
    public readonly enableURL: string;
    public readonly disableURL?: string;

    protected transformStatusResponse(raw: any): boolean {
        return raw == 1 || raw === 'true';
    }

    public constructor(webhook: BooleanWebhook, characteristic: Characteristic) {
        super(webhook, characteristic);
        this.enableURL = webhook.enableURL;
        this.disableURL = webhook.disableURL;
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
