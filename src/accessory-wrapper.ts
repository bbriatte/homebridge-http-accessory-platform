import {PlatformAccessory, Service, WithUUID} from 'homebridge';
import {HomebridgeAccessoryWrapper, HomebridgeContextProps} from "homebridge-base-platform";
import {HttpDevice} from "./http-device";
import {BaseService, HttpServiceConstructor, HttpServiceType, HttpSwitchService} from "./services";
import {BaseServiceConfig} from "./accessory-config";

export class HttpAccessoryWrapper extends HomebridgeAccessoryWrapper<HttpDevice> {

    protected readonly informationService: Service;
    protected readonly services: BaseService[];

    public constructor(context: HomebridgeContextProps, accessory: PlatformAccessory, device: HttpDevice) {
        super(context, accessory, device);
        this.resetServices();
        this.informationService = this.initInformationService();
        this.services = this.buildServices();
    }

    private resetServices() {
        this.accessory.services.forEach((service) => {
            if(service.UUID === this.Service.AccessoryInformation.UUID) {
                return;
            }
            this.accessory.removeService(service);
        });
    }

    private buildServices(): BaseService[] {
         return this.device.config.services
             .map((config, idx) => {
                 const service = this.getServiceFromConfig(config, idx);
                 if(service) {
                     const ServiceConstructor = this.resolveHttpServiceConstructor(config);
                     if(ServiceConstructor) {
                         return new ServiceConstructor(config, this, service);
                     }
                 }
             })
             .filter((s) => s !== undefined);
    }

    private getServiceFromConfig(config: BaseServiceConfig, idx: number): Service | undefined {
        const ServiceUUID = this.resolveServiceUUID(config);
        if(ServiceUUID === undefined) {
            return;
        }
        return this.getService(
            ServiceUUID,
            config.name ?? '',
            `${config.type}Service${idx + 1}`
        );
    }

    private resolveServiceUUID(config: BaseServiceConfig): WithUUID<typeof Service> | undefined {
        if(config.type === HttpServiceType.SWITCH) {
            return this.Service.Switch;
        }
        return undefined;
    }

    private resolveHttpServiceConstructor(config: BaseServiceConfig): HttpServiceConstructor | undefined {
        if(config.type === HttpServiceType.SWITCH) {
            return HttpSwitchService;
        }
        return undefined;
    }

    private initInformationService(): Service {
        const informationService = this.accessory.getService(this.Service.AccessoryInformation);
        informationService.setCharacteristic(this.Characteristic.Name, this.getDisplayName());
        informationService.setCharacteristic(this.Characteristic.SerialNumber, this.device.id);
        if(this.device.config.manufacturer) {
            informationService.setCharacteristic(this.Characteristic.Manufacturer, this.device.config.manufacturer);
        }
        if(this.device.config.model) {
            informationService.setCharacteristic(this.Characteristic.Model, this.device.config.model);
        }
        if(this.device.config.firmwareRevision) {
            informationService.setCharacteristic(this.Characteristic.FirmwareRevision, this.device.config.firmwareRevision);
        }
        return informationService;
    };

    public getDisplayName(): string {
        return this.device.name;
    }
}
