import {DriverProp} from '../driverTypes';

const props: DriverProp[] = [
  {
    type: 'string',
    key: 'host',
    name: 'Host',
    required: true,
  },
  {
    type: 'number',
    key: 'port',
    name: 'Port',
    required: true,
    default: 27017,
  },
  {
    type: 'string',
    key: 'db',
    name: 'DB',
  },
];

export default props;
