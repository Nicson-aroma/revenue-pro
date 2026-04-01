import ServiceComparison from '../components/ServiceComparison';
import { services } from '../data/services';

export default function Comparison() {
  return <ServiceComparison services={services} />;
}