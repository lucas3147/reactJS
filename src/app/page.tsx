import { Card } from '@/components/Card';
import { GeoForm } from '@/components/GeoForm';
import { Person } from '@/components/Person';

const Page = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Olá Mundo</h1>
      <h3>Alguma outra coisa</h3>

      <Card 
        phrase="Com grandes poderes vem grandes responsabilidades"
        
      />
    </div>
  );
}

export default Page;