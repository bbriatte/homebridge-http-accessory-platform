import {BaseWebhookCharacteristic} from "./base-webhook-characteristic";
import {Characteristic} from 'homebridge';
import axios from 'axios';
import {NumberWebhook, SetValueWebhook} from "../accessory-config";

export class NumberWebhookCharacteristic extends BaseWebhookCharacteristic<number> {
    readonly defaultIndex: number;
    readonly steps: SetValueWebhook<number>[];

    protected transformStatusResponse(raw: any): number {
        return Number.parseFloat(raw);
    }

    public constructor(webhook: NumberWebhook, characteristic: Characteristic) {
        super(webhook, characteristic);
        this.defaultIndex = webhook.defaultIndex;
        this.steps = webhook.steps;
    }

    public async setStep(index: number): Promise<void> {
        const step = this.steps[index];
        try {
            await axios.get(step.setURL);
            this.value = step.value;
        } catch (err) {

        }
    }
}
