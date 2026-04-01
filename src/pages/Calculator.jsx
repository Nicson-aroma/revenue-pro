import PricingCalculator from '../components/PricingCalculator';
import { services } from '../data/services';

export default function Calculator() {
  return <PricingCalculator services={services} />;
}