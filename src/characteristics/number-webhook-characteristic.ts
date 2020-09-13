import {BaseWebhookCharacteristic, BaseWebhookCharacteristicProps} from "./base-webhook-characteristic";
import {Characteristic} from 'homebridge';
import axios from 'axios';

export interface SetValueWebhook<T> {
    readonly setURL: string;
    readonly value: T;
}

export interface NumberWebhookCharacteristicProps extends BaseWebhookCharacteristicProps<number> {
    readonly defaultIndex: number;
    readonly steps: SetValueWebhook<number>[];
}

export class NumberWebhookCharacteristic extends BaseWebhookCharacteristic<number> implements NumberWebhookCharacteristicProps {
    readonly defaultIndex: number;
    readonly steps: SetValueWebhook<number>[];

    protected transformStatusResponse(raw: any): number {
        return 0;
    }

    public constructor(props: NumberWebhookCharacteristicProps, characteristic: Characteristic) {
        super(props, characteristic);
        this.defaultIndex = props.defaultIndex;
        this.steps = props.steps;
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
