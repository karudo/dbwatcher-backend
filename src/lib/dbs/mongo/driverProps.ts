import {DriverProp} from '../driverTypes';

const props: DriverProp[] = [
  {
    type: 'string',
    code: 'host',
    name: 'Host',
    required: true,
  },
  {
    type: 'number',
    code: 'port',
    name: 'Port',
    required: true,
    default: 27017,
  },
  {
    type: 'string',
    code: 'db',
    name: 'DB',
  },
];

export default props;
