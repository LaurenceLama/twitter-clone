import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

function Input() {
    const [input, setInput] = useState('');
    const [selectedFile, setSelectedFile] = useState(null)

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll `}
    >
      <img
        src="https://rb.gy/ogau5a"
        alt="hey"
        className="h-11 w-11 rounded-full cursor-pointer"
      />
      <div className="divide-y divide-gray-700 w-full">
        <div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What's happening?"
            rows="2"
            className="bg-transparent outline-none text-[#d9d9d9] text-lg placeholder-blue-300 tracking-wide w-full min-h-[50px]"
          />

         {selectedFile && (
          <div className="relative">
            <div
              className="absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer"
              onClick={() => setSelectedFile(null)}
            >
              <XMarkIcon className="text-white h-5" />
            </div>
            <img
              src={selectedFile}
              alt=""
              className="rounded-2xl max-h-80 object-contain"
            />
          </div>
         )}
        </div>
        
      </div>
    </div>
  );
}

export default Input