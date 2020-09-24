import {BaseDevice} from "homebridge-base-platform";
import {HttpAccessoryConfig} from "./accessory-config";

export class HttpDevice implements BaseDevice {

    public readonly config: HttpAccessoryConfig;

    public constructor(config: HttpAccessoryConfig) {
        this.config = config;
    }

    public get name(): string {
        return this.config.name
    }

    public get id(): string {
        return this.config.serialNumber;
    }
}
