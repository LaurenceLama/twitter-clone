import {
  CalendarIcon,
  ChartBarIcon,
  FaceSmileIcon,
  PhotoIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { useRef, useState } from "react";
// import "emoji-mart/css/emoji-mart.css";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { db, storage } from "../firebase";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "@firebase/firestore";
import { getDownloadURL, ref, uploadString } from "@firebase/storage";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

function Input() {
  const [input, setInput] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const filePickerRef = useRef(null);
  const [showEmojis, setShowEmojis] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const sendPost = async () => {
    if (loading) return;
    setLoading(true);

    const docRef = await addDoc(collection(db, "posts"), {
      // id: session.user.uid,
      // username: session.user.name,
      // userImg: session.user.image,
      // tag: session.user.tag,
      text: input,
      timestamp: serverTimestamp(),
    });

    const imageRef = ref(storage, `posts/${docRef.id}/image`);

    if (selectedFile) {
      await uploadString(imageRef, selectedFile, "data_url").then(async () => {
        const downloadURL = await getDownloadURL(imageRef);
        await updateDoc(doc(db, "posts", docRef.id), {
          image: downloadURL,
        });
      });
    }

    setLoading(false);
    setInput("");
    setSelectedFile(null);
    setShowEmojis(false);
    //these things, false ,null ,and empty strings, is set to REVERT BACK TO THE DEFAULT PRESET of the page after posting whatever u want
  };

  const addImageToPost = (e) => {
    const reader = new FileReader(); // it reads files, thats why its called reader
    if (e.target.files[0]) {
      reader.readAsDataURL(e.target.files[0]); // this targets the chosen file and converts it so it can be read by its image url
    }

    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result); // onload, I think it means after loading all packages of chosen file, this lets the file be displayed to be posted later on, with a delete function to sheesh
    };
  };

  const addEmoji = (e) => {
    let sym = e.unified.split("-");
    let codesArray = [];
    sym.forEach((el) => codesArray.push("0x" + el));
    let emoji = String.fromCodePoint(...codesArray);
    setInput(input + emoji);
  };

  return (
    <div
      className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scroll 
      ${loading && "opacity-60"}`}
    >
      <Image
        src={session.user.image}
        alt="hey"
        width={44}
        height={44}
        className="h-11 w-11 rounded-full cursor-pointer"
        onClick={signOut}
      />
      <div className="divide-y divide-gray-700 w-full">
        <div className={`${selectedFile && "pb-7"} ${input && "space-y-2.5"}`}>
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
              <Image
                src={selectedFile}
                alt=""
                width={1000}
                height={1000}
                className="rounded-2xl max-h-80 object-contain"
              />
            </div>
          )}
        </div>

        {!loading && (
          <div className="flex items-center justify-between pt-2.5">
            <div className="flex items-center">
              <div
                className="icon"
                onClick={() => filePickerRef.current.click()}
              >
                {/*this filePicker thing finds the ref provided to enable clicking the cool icon instead of the measly 'choose file' that is currently hidden*/}
                <PhotoIcon className="text-[#1d9bf0] h-[22px]" />
                <input
                  type="file"
                  ref={filePickerRef}
                  hidden
                  onChange={addImageToPost}
                />
              </div>

              <div className="icon rotate-90">
                <ChartBarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon" onClick={() => setShowEmojis(!showEmojis)}>
                <FaceSmileIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              <div className="icon">
                <CalendarIcon className="text-[#1d9bf0] h-[22px]" />
              </div>

              {showEmojis && (
                <Picker
                  onEmojiSelect={addEmoji}
                  data={data}
                  style={{
                    position: "absolute",
                    marginTop: "465px",
                    marginLeft: -40,
                    maxWidth: "320px",
                    borderRadius: "20px",
                  }}
                  theme="dark"
                />
              )}
            </div>
            <button
              className="bg-[#1d9bf0] text-white rounded-full px-4 py-1.5 font-bold shadow-md hover:bg-[#1a8cd8] disabled:hover:bg-[#1d9bf0] disabled:opacity-50 disabled:cursor-default"
              disabled={!input.trim() && !selectedFile}
              onClick={sendPost}
            >
              Tweet
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Input;
