import {Spec} from '../../spec/constant/Spec';
import {Service} from '../../spec/instance/Service';
import {ServiceType} from '../../spec/definition/urn/ServiceType';
import {PropertyCodec} from './PropertyCodec';
import {ActionCodec} from './ActionCodec';
import {EventCodec} from './EventCodec';
import {ServiceOperable} from '../../spec/operable/ServiceOperable';

export class ServiceCodec {

    static decode(array: any[]): Service[] {
        const list = [];

        if (array != null) {
            for (const o of array) {
                const a = new Service();
                a.iid = o[Spec.IID];
                a.type = ServiceType.valueOf(o[Spec.TYPE]);
                a.description = o[Spec.DESCRIPTION];

                if (a.type != null) {
                    if (o['x-name'] != null) {
                        a.type.set('name', o['x-name']);
                    }

                    if (o['x-optional'] != null) {
                        a.type.set('optional', o['x-optional']);
                    }

                    if (o['x-property-addable']) {
                        a.type.set('property-addable', true);
                    }

                    if (o['x-action-addable']) {
                        a.type.set('action-addable', true);
                    }

                    if (o['x-event-addable']) {
                        a.type.set('event-addable', true);
                    }
                }

                const properties = PropertyCodec.decode(o[Spec.PROPERTIES]);
                for (const property of properties) {
                    a.properties.set(property.iid, property);
                }

                const actions = ActionCodec.decode(o[Spec.ACTIONS]);
                for (const action of actions) {
                    a.actions.set(action.iid, action);
                }

                const events = EventCodec.decode(o[Spec.EVENTS]);
                for (const event of events) {
                    a.events.set(event.iid, event);
                }

                list.push(a);
            }
        }

        return list;
    }

    static decodeOperable(array: any[]): ServiceOperable[] {
        const list = [];

        if (array != null) {
            for (const o of array) {
                const a = new ServiceOperable();
                a.iid = o[Spec.IID];
                a.type = ServiceType.valueOf(o[Spec.TYPE]);
                a.description = o[Spec.DESCRIPTION];

                const properties = PropertyCodec.decodeOperable(o[Spec.PROPERTIES]);
                for (const property of properties) {
                    a.properties.set(property.iid, property);
                }

                const actions = ActionCodec.decodeOperable(o[Spec.ACTIONS]);
                for (const action of actions) {
                    a.actions.set(action.iid, action);
                }

                const events = EventCodec.decode(o[Spec.EVENTS]);
                for (const event of events) {
                    a.events.set(event.iid, event);
                }

                list.push(a);
            }
        }

        return list;
    }

    static encode(service: Service): any {
        const o: any = {
            iid: service.iid,
            type: service.type != null ? service.type.toString() : '',
            description: service.description,
        };

        if (service.properties.size > 0) {
            o[Spec.PROPERTIES] = PropertyCodec.encodeArray(service.properties);
        }

        if (service.actions.size > 0) {
            o[Spec.ACTIONS] = ActionCodec.encodeArray(service.actions);
        }

        if (service.events.size > 0) {
            o[Spec.EVENTS] = EventCodec.encodeArray(service.events);
        }

        if (service.type != null) {
            if (service.type.get('name') != null) {
                o['x-name'] = service.type.get('name');
            }

            if (service.type.get('optional') != null) {
                o['x-optional'] = service.type.get('optional');
            }

            if (service.type.get('property-addable') != null) {
                o['x-property-addable'] = service.type.get('property-addable');
            }

            if (service.type.get('action-addable') != null) {
                o['x-action-addable'] = service.type.get('action-addable');
            }

            if (service.type.get('event-addable') != null) {
                o['x-event-addable'] = service.type.get('event-addable');
            }
        }

        return o;
    }

    static encodeArray(services: Map<Number, Service>): any[] {
        const array: any[] = [];

        services.forEach((service) => {
            array.push(ServiceCodec.encode(service));
        });

        return array;
    }
}
