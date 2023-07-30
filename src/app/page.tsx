import { peopleList } from '@/data/peopleList';

const Page = () => {

  const chemists = peopleList.filter(person => person.profession === 'chemist');

  return (
    <div>
      <h1 className="font-bold text-2xl">Olá Mundo</h1>
      <h3>Alguma outra coisa</h3>

      {chemists.length > 0 && 
        <ul>
        {chemists.map(person => 
          <li key={person.id}>{person.name} - {person.profession}</li>
        )}
        </ul>
      }
      
    </div>
  );
}

export default Page;