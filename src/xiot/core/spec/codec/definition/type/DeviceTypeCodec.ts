import {DeviceType} from '../../../typedef/definition/urn/DeviceType';

export class DeviceTypeCodec {
  static decodeArray(array: any[]): DeviceType[] {
    const list: DeviceType[] = [];

    if (array != null) {
      for (const v of array) {
        if (typeof v === 'string') {
          list.push(new DeviceType(v));
        } else if (typeof v === 'object') {
          list.push(new DeviceType(v.type));
        }
      }
    }

    return list;
  }

  static encodeArray(actions: DeviceType[]): any[] {
    const array: any[] = [];

    actions.forEach(type => {
      array.push(type.toString());
    });

    return array;
  }
}
