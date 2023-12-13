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
                <div>oi...</div>
            }
        </div>
    )
}

export default Login;