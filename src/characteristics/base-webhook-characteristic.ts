import axios from 'axios';
import {Characteristic} from 'homebridge';

export interface BaseWebhookCharacteristicProps<T> {
    readonly statusURL?: string;
}

export abstract class BaseWebhookCharacteristic<T> implements BaseWebhookCharacteristicProps<T> {
    public readonly statusURL?: string;
    protected storeValue: T;
    public characteristic: Characteristic;

    protected constructor(props: BaseWebhookCharacteristicProps<T>, characteristic: Characteristic) {
        this.statusURL = props.statusURL;
        this.characteristic = characteristic;
        this.storeValue = this.characteristic.getDefaultValue() as any;
    }

    public async getStatus(): Promise<T> {
        if(this.statusURL) {
            const response = await axios.get(this.statusURL);
            return this.transformStatusResponse(response.data);
        }
        return this.storeValue;
    }

    public get value(): T {
        return this.characteristic.value as any;
    }

    public set value(v: T) {
        this.storeValue = v;
        this.characteristic.updateValue(v as any);
    }

    protected abstract transformStatusResponse(raw: any): T;
}
