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

const reverseCipher = (text) => {
  return text.split("").reverse().join("");
};

const Main = () => {
  const [inputText, setInputText] = useState("");
  const [selectedMethod, setSelectedMethod] = useState("caesar");
  const [shift, setShift] = useState(0);
  const [encryptedText, setEncryptedText] = useState("");

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleMethodChange = (e) => {
    setSelectedMethod(e.target.value);
  };

  const handleShiftChange = (e) => {
    setShift(parseInt(e.target.value, 10));
  };

  const handleEncrypt = () => {
    let encrypted = "";

    switch (selectedMethod) {
      case "caesar":
        encrypted = caesarCipher(inputText, shift);
        break;
      case "reverse":
        encrypted = reverseCipher(inputText);
        break;
      default:
        break;
    }

    setEncryptedText(encrypted);
  };

  return (
    <div>
      <label>
        Enter text:
        <input type="text" value={inputText} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Select encryption method:
        <select value={selectedMethod} onChange={handleMethodChange}>
          <option value="caesar">Caesar Cipher</option>
          <option value="reverse">Reverse Cipher</option>
        </select>
      </label>
      {selectedMethod === "caesar" && (
        <>
          <br />
          <label>
            Enter shift:
            <input type="number" value={shift} onChange={handleShiftChange} />
          </label>
        </>
      )}
      <br />
      <button onClick={handleEncrypt} className="text-red-600">
        Encrypt
      </button>
      <br />
      <label>Encrypted Text: {encryptedText}</label>
    </div>
  );
};

export default Main;
