import {Spec} from '../../spec/constant/Spec';
import {DefinitionCodec} from './DefinitionCodec';
import {ServiceDefinition} from '../../spec/definition/ServiceDefinition';
import {ServiceType} from '../../spec/definition/urn/ServiceType';
import {PropertyDefinitionCodec} from './PropertyDefinitionCodec';
import {ActionDefinitionCodec} from './ActionDefinitionCodec';
import {EventDefinitionCodec} from './EventDefinitionCodec';

export class ServiceDefinitionCodec {

    static decodeArray(list: any[]): ServiceDefinition[] {
        const array: ServiceDefinition[] = [];

        list.forEach(json => {
            array.push(ServiceDefinitionCodec.decode(json));
        });

        return array;
    }

    static decode(json: any): ServiceDefinition {
        const def = new ServiceDefinition();
        def.type = ServiceType.valueOf(json[Spec.TYPE]);
        def.description = json[Spec.DESCRIPTION];
        def.requiredProperties = DefinitionCodec.decodeProperties(json[Spec.REQUIRED_PROPERTIES]);
        def.optionalProperties = DefinitionCodec.decodeProperties(json[Spec.OPTIONAL_PROPERTIES]);
        def.requiredActions = DefinitionCodec.decodeActions(json[Spec.REQUIRED_ACTIONS]);
        def.optionalActions = DefinitionCodec.decodeActions(json[Spec.OPTIONAL_ACTIONS]);
        def.requiredEvents = DefinitionCodec.decodeEvents(json[Spec.REQUIRED_EVENTS]);
        def.optionalEvents = DefinitionCodec.decodeEvents(json[Spec.OPTIONAL_EVENTS]);
        return def;
    }

    static encode(def: ServiceDefinition): any {
        const object: any = {
            type: def.type != null ? def.type.toString() : '',
            description: def.description
        };

        if (def.requiredProperties.length > 0) {
            object[Spec.REQUIRED_PROPERTIES] = PropertyDefinitionCodec.encodeArray(def.requiredProperties);
        }

        if (def.optionalProperties.length > 0) {
            object[Spec.OPTIONAL_PROPERTIES] = PropertyDefinitionCodec.encodeArray(def.optionalProperties);
        }

        if (def.requiredActions.length > 0) {
            object[Spec.REQUIRED_ACTIONS] = ActionDefinitionCodec.encodeArray(def.requiredActions);
        }

        if (def.optionalActions.length > 0) {
            object[Spec.OPTIONAL_ACTIONS] = ActionDefinitionCodec.encodeArray(def.optionalActions);
        }

        if (def.requiredEvents.length > 0) {
            object[Spec.REQUIRED_EVENTS] = EventDefinitionCodec.encodeArray(def.requiredEvents);
        }

        if (def.optionalEvents.length > 0) {
            object[Spec.OPTIONAL_EVENTS] = EventDefinitionCodec.encodeArray(def.optionalEvents);
        }

        return object;
    }

    static encodeArray(services: ServiceType[]): any[] {
        const array: any[] = [];

        services.forEach((type) => {
            array.push(type.toString());
        });

        return array;
    }
}
