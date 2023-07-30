import { peopleList } from '@/data/peopleList';

const Page = () => {

  return (
    <div>
      <h1 className="font-bold text-2xl">Olá Mundo</h1>
      <h3>Alguma outra coisa</h3>

      {peopleList.length > 0 && 
        <ul>
        {peopleList.map(person => 
          <li key={person.id}>{person.name} - {person.profession}</li>
        )}
        </ul>
      }
      
    </div>
  );
}

export default Page;