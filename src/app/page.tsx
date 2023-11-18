import Image from 'next/image'
import DonutLargeIcon from '@mui/icons-material/DonutLarge';
import ChatIcon from '@mui/icons-material/Chat';
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function Home() {
  return (
    <div className="flex h-screen bg-[#EDEDED]">
      <div className="sidebar w-2/6 max-w-[415px] flex flex-col border-r-2 border-[#ddd]">
        
          <header className="h-16 px-4 flex justify-between items-center">
              <img 
                className="w-10 h-10 rounded-[20px] cursor-pointer"
                src="https://cdn0.iconfinder.com/data/icons/standard-characters/101/mature_male_slicked3-1024.png"
                alt="icone do avatar" />
              <div 
                className="flex"
              >
                <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
                  <DonutLargeIcon style={{color: '#919191'}}/>
                </div>
                <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
                  <ChatIcon style={{color: '#919191'}}/>
                </div>
                <div className="w-10 h-10 flex justify-center items-center cursor-pointer">
                  <MoreVertIcon style={{color: '#919191'}}/>
                </div>
              </div>
          </header>

          <div>
            ...
          </div>
          <div>
            ...
          </div>
      </div>
      <div className="contentarea">
        ...
      </div>
    </div>
  )
}
