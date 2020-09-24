import {
    HomebridgePlatform,
    PlatformSettings
} from 'homebridge-base-platform';
import {API, Logging} from "homebridge";
import {HttpAccessoryPlatformConfig} from "./platform-config";
import {HttpAccessoryWrapper} from "./accessory-wrapper";
import {HomebridgeAccessoryWrapperConstructor} from "homebridge-base-platform/src/platform";
import {HttpDevice} from "./http-device";

export enum HttpAccessoryPlatformInfo {
    plugin = 'homebridge-http-accessory-platform',
    name = 'HttpAccessoryPlatform'
}

export class HttpAccessoryPlatform extends HomebridgePlatform<HttpAccessoryPlatformConfig, HttpDevice, HttpAccessoryWrapper> {

    public constructor(logger: Logging, config: HttpAccessoryPlatformConfig, api: API) {
        super(logger, config, api);
    }

    protected initPlatformSettings(): PlatformSettings {
        return {
            name: HttpAccessoryPlatformInfo.name,
            plugin: HttpAccessoryPlatformInfo.plugin
        };
    }

    protected getAccessoryWrapperConstructorForDevice(device: HttpDevice): HomebridgeAccessoryWrapperConstructor<HttpAccessoryWrapper, HttpDevice> {
        return HttpAccessoryWrapper;
    }

    protected async searchDevices(): Promise<HttpDevice[]> {
        return this.config.accessories.map((config) => {
           return new HttpDevice(config);
        });
    }

    protected getDefaultPlatformConfig(): HttpAccessoryPlatformConfig | undefined {
        return undefined; // default config not possible
    }
}
