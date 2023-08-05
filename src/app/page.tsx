"use client"

const Page = () => {
  let count = 0;

  const handleClickButton = () => {
    count++;
  }

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <p>{count}</p>
      <button onClick={handleClickButton} className="bg-blue-500 p-3">+1</button>
    </div>
  );
}

export default Page;