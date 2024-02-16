import { MotionConfig, motion } from "framer-motion";
import { useResultContext } from "./resultContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const caesarCipher = (text, shift) => {
  return text
    .split("")
    .map((char) => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        let encryptedChar = String.fromCharCode(
          code + (shift % 26) > 122
            ? code + (shift % 26) - 26
            : code + (shift % 26)
        );

        if (char === char.toUpperCase()) {
          encryptedChar = encryptedChar.toUpperCase();
        }

        return encryptedChar;
      } else {
        return char;
      }
    })
    .join("");
};

const monoAlphabetic = (text, key) => {
  const lowerText = text.toLowerCase();
  let result = "";

  if (key.length !== 26) {
    alert("Key must be of 26 characters");
    throw new Error("Change the key");
  }

  for (let i = 0; i < lowerText.length; i++) {
    const char = lowerText[i];
    const index = "abcdefghijklmnopqrstuvwxyz".indexOf(char);

    if (index !== -1) {
      // Append the corresponding character from the key
      result += key[index];
    } else {
      // If the character is not in the alphabet, append it unchanged
      result += char;
    }
  }
  console.log(result);
  return result;
};

const Encrypt = () => {
  const { setResult } = useResultContext();

  const [inputText, setInputText] = useState("");
  const [method, setMethod] = useState("caesar");
  const [key, setKey] = useState("");
  const navigate = useNavigate();

  const handleEncrypt = () => {
    let encrypted = "";

    switch (method) {
      case "caesar":
        encrypted = caesarCipher(inputText, key);
        break;

      case "mono":
        encrypted = monoAlphabetic(inputText, key);
        break;

      default:
        break;
    }

    setResult(encrypted);
    navigate("/result");
  };

  return (
    <div className="grid place-content-center h-screen">
      <div className="flex flex-col gap-4 justify-center items-center rounded-lg border border-black px-8 py-5 card">
        <div className="">
          <label className="flex justify-between">
            Enter text:
            <input
              type="text"
              value={inputText}
              onChange={(e) => {
                setInputText(e.target.value);
              }}
              className="rounded border border-black mx-2 px-2 "
            />
          </label>
        </div>
        <div className="flex flex-col">
          <label>Select Encryption method:</label>
          <select
            value={method}
            onChange={(e) => {
              setMethod(e.target.value);
            }}
            className="border border-black rounded-sm"
          >
            <option value={"caesar"}>Caesar Cipher</option>
            <option value={"mono"}>Monoalphabetic</option>
          </select>
        </div>
        {method === "caesar" && (
          <>
            <div>
              <label>
                Enter Key:
                <input
                  type="number"
                  value={key}
                  placeholder="Enter Key"
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                  className="rounded border border-black mx-2 px-2"
                />
              </label>
            </div>
          </>
        )}
        {method === "mono" && (
          <>
            <div>
              <label>
                Enter Key:
                <input
                  type="text"
                  value={key}
                  placeholder="Enter Key"
                  onChange={(e) => {
                    setKey(e.target.value);
                  }}
                  className="rounded border border-black mx-2 px-2"
                />
              </label>
            </div>
          </>
        )}

        <MotionConfig>
          <motion.button
            whileHover={{
              scale: 1.177,
            }}
            whileTap={{
              rotate: "2.5deg",
              color: "blue",
            }}
            className="border border-black px-3 py-1 rounded-md"
            onClick={handleEncrypt}
          >
            Encrypt
          </motion.button>
        </MotionConfig>
      </div>
    </div>
  );
};

export default Encrypt;
