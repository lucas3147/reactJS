import Api from "@/Api";
import { UserType } from "@/types/UserType";
import { useState } from "react";

type Props = {
    onReceive: (userRegister: UserType) => Promise<void>
}

const Login = ({onReceive}: Props) => {
    const [userRegister, setUserRegister] = useState<UserType>();

    const handleLogin = async () => {
        if (userRegister) {
            onReceive(userRegister);
        }
    }

    const handleSignUp = async () => {
        let user = await Api.githubPopup();
        if (user){
            setUserRegister({id: user.uid, displayName: user.displayName, photoURL: user.photoURL});
        } else {
            alert('Não foi possível logar')
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            {userRegister == null && 
                <button 
                    onClick={handleSignUp} 
                    className="rounded-md px-4 py-2 border-[1px] border-black text-white bg-[#161A1F]"
                >
                    Logar com o github
                </button>
            }
            {userRegister && 
                <div className="flex flex-col items-center justify-evenly bg-[#161A1F] w-96 h-80 text-white px-6 rounded-3xl">
                    <img
                    className="w-32 h-32 rounded-[20px] cursor-pointer"
                    src={userRegister.photoURL ? userRegister.photoURL : ''}
                    alt="icone do avatar" 
                    />
                    <input
                        className="w-full h-10 border-0 outline-none bg-white rounded-3xl text-base text-[#4A4A4A] px-4"
                        type="text"
                        placeholder="Digite o seu nome"
                        value={userRegister.displayName ? userRegister.displayName : ''}
                        onChange={(e) => setUserRegister({photoURL: userRegister.photoURL, displayName: e.target.value, id: userRegister.id})}
                    />
                    <button
                        className="w-full h-10 bg-[#1155c1] rounded-3xl text-base text-white px-4"    
                        onClick={handleLogin}
                    >
                        Confirmar
                    </button>
                </div>
            }
        </div>
    )
}

export default Login;