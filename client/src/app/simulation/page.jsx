import ProtectedRoute from '@/components/ProtectedRoute';
import Simulation from '@/pages/Simulation';

export default function SimulationPage() {
  return (
    <ProtectedRoute>
      <Simulation />
    </ProtectedRoute>
  );
}
