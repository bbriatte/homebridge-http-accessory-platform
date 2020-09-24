import {HttpAccessoryConfig, GlobalConfig} from './accessory-config';
import {BasePlatformConfig} from "homebridge-base-platform";

export interface HttpAccessoryPlatformConfig extends BasePlatformConfig {
    readonly accessories?: HttpAccessoryConfig[];
    readonly global?: GlobalConfig;
}
