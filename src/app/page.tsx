"use client"

const Page = () => {

  function handleClick() {
    alert('Funcionou!');
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <button onClick={handleClick} className="p-3 bg-blue-700 text-white rounded-md">
        Clique aqui
      </button>
    </div>
  );
}

export default Page;