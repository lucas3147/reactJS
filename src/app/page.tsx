import { GeoForm } from '@/components/GeoForm';
import { Person } from '@/components/Person';

const Page = () => {
  return (
    <div>
      <h1 className="font-bold text-2xl">Olá Mundo</h1>
      <h3>Alguma outra coisa</h3>

      <Person
        name="Elon Musk"
        avatar="https://media.vanityfair.com/photos/609d51288fee0e2d204a86ea/master/w_2560%2Cc_limit/Elon5.13.jpg"
        roles={["CEO da Tesla", "CEO da SpaceX", "CEO da ..."]}/>
      <Person
        name="Jeff Bezes"
        avatar="https://th.bing.com/th/id/OIP.B7wUiEFDbWthzPn5nTGpvAHaE8?w=280&h=187&c=7&r=0&o=5&pid=1.7"
        roles={["CEO da Amazon", "CEO da Blue Origin"]}/>
    </div>
  );
}

export default Page;