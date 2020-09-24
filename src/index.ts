import {API} from "homebridge";
import {HttpAccessoryPlatform, HttpAccessoryPlatformInfo} from "./http-accessory-platform";

export default function(homebridge: API) {
    homebridge.registerPlatform(HttpAccessoryPlatformInfo.plugin, HttpAccessoryPlatformInfo.name, HttpAccessoryPlatform);
}
