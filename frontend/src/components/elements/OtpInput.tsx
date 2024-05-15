import * as React from "react";
import { Input as BaseInput } from "@mui/base/Input";
import { Box, styled } from "@mui/system";

export function OTP({
   separator,
   length,
   value,
   onChange,
}: {
   separator: React.ReactNode;
   length: number;
   value: string;
   onChange: React.Dispatch<React.SetStateAction<string>>;
}) {
   const inputRefs = React.useRef<HTMLInputElement[]>(
      new Array(length).fill(null)
   );

   const focusInput = (targetIndex: number) => {
      const targetInput = inputRefs.current[targetIndex];
      targetInput.focus();
   };

   const selectInput = (targetIndex: number) => {
      const targetInput = inputRefs.current[targetIndex];
      targetInput.select();
   };

   const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
      currentIndex: number
   ) => {
      switch (event.key) {
         case "ArrowUp":
         case "ArrowDown":
         case " ":
            event.preventDefault();
            break;
         case "ArrowLeft":
            event.preventDefault();
            if (currentIndex > 0) {
               focusInput(currentIndex - 1);
               selectInput(currentIndex - 1);
            }
            break;
         case "ArrowRight":
            event.preventDefault();
            if (currentIndex < length - 1) {
               focusInput(currentIndex + 1);
               selectInput(currentIndex + 1);
            }
            break;
         case "Delete":
            event.preventDefault();
            onChange((prevOtp) => {
               const otp =
                  prevOtp.slice(0, currentIndex) +
                  prevOtp.slice(currentIndex + 1);
               return otp;
            });

            break;
         case "Backspace":
            event.preventDefault();
            if (currentIndex > 0) {
               focusInput(currentIndex - 1);
               selectInput(currentIndex - 1);
            }

            onChange((prevOtp) => {
               const otp =
                  prevOtp.slice(0, currentIndex) +
                  prevOtp.slice(currentIndex + 1);
               return otp;
            });
            break;

         default:
            break;
      }
   };


   const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
      currentIndex: number
   ) => {
      const currentValue = event.target.value;
      let indexToEnter = 0;

      while (indexToEnter <= currentIndex) {
         if (
            inputRefs.current[indexToEnter].value &&
            indexToEnter < currentIndex
         ) {
            indexToEnter += 1;
         } else {
            break;
         }
      }
      onChange((prev) => {
         const otpArray = prev.split("");
         const lastValue = currentValue[currentValue.length - 1];
         otpArray[indexToEnter] = lastValue;
         return otpArray.join("");
      });
      if (currentValue !== "") {
         if (currentIndex < length - 1) {
            focusInput(currentIndex + 1);
         }
      }
   };

   const handleClick = (
      event: React.MouseEvent<HTMLInputElement, MouseEvent>,
      currentIndex: number
   ) => {
      selectInput(currentIndex);
   };

   const handlePaste = (
      event: React.ClipboardEvent<HTMLInputElement>,
      currentIndex: number
   ) => {
      event.preventDefault();
      const clipboardData = event.clipboardData;

      // Check if there is text data in the clipboard
      if (clipboardData.types.includes("text/plain")) {
         let pastedText = clipboardData.getData("text/plain");
         pastedText = pastedText.substring(0, length).trim();
         let indexToEnter = 0;

         while (indexToEnter <= currentIndex) {
            if (
               inputRefs.current[indexToEnter].value &&
               indexToEnter < currentIndex
            ) {
               indexToEnter += 1;
            } else {
               break;
            }
         }

         const otpArray = value.split("");

         for (let i = indexToEnter; i < length; i += 1) {
            const lastValue = pastedText[i - indexToEnter] ?? " ";
            otpArray[i] = lastValue;
         }

         onChange(otpArray.join(""));
      }
   };

   return (
      <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
         {new Array(length).fill(null).map((_, index) => (
            <React.Fragment key={index}>
               <BaseInput
                  slots={{
                     input: InputElement,
                  }}
                  aria-label={`Digit ${index + 1} of OTP`}
                  slotProps={{
                     input: {
                        ref: (ele) => {
                           inputRefs.current[index] = ele!;
                        },
                        onKeyDown: (event) => handleKeyDown(event, index),
                        onChange: (event) => handleChange(event, index),
                        onClick: (event) => handleClick(event, index),
                        onPaste: (event) => handlePaste(event, index),
                        value: value[index] ?? "",
                     },
                  }}
               />
               {index === length - 1 ? null : separator}
            </React.Fragment>
         ))}
      </Box>
   );
}

export default function OTPInput() {
   const [otp, setOtp] = React.useState("");

   return (
      <Box
         sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: 2,
            alignItems: "center",
         }}
      >
         <OTP
            separator={<span></span>}
            value={otp}
            onChange={setOtp}
            length={4}
         />
         <span>Entered value: {otp}</span>
      </Box>
   );
}

const blue = {
   100: "#DAECFF",
   200: "#80BFFF",
   400: "#3399FF",
   500: "#007FFF",
   600: "#0072E5",
   700: "#0059B2",
};

const grey = {
   50: "#F3F6F9",
   100: "#E5EAF2",
   200: "#DAE2ED",
   300: "#C7D0DD",
   400: "#B0B8C4",
   500: "#9DA8B7",
   600: "#6B7A90",
   700: "#434D5B",
   800: "#303740",
   900: "#1C2025",
};

const InputElement = styled("input")(
   ({ theme }) => `
  width: 70px;
  height: 60px;
  font-size : 25px ;
  font-weight: bold;
  line-height: 1.5;
  padding: 8px 8px;
  border-radius: 8px;
  text-align: center;
  color: ${grey[300]};
  background: transparent;
  border: 2px solid #404040;
  outline: 0;
  transition : all ease-out 0.3s ;
  &:hover {
    border-color:#52525b;
  }

  &:focus {
    border-color: #52525b};
  }

  // firefox
  &:focus-visible {
    outline: 0;
  }
`
);
