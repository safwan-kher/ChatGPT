import { FC } from "react"; // Importing React's Functional Component type (FC) for TypeScript type annotations
import { Style } from "./style"; // Importing the Style type, which provides structure for styling information
import { useRouter } from "next/router"; // Importing useRouter to access the current route and locale (language settings)

// Define the ApplyNowButton functional component
export const ApplyNowButton: FC<{
  style: Style; // Style prop for passing styling rules
  dark: boolean; // Dark mode flag for conditional styling
  onClick: () => void; // Function to handle click events
  text: string; // Text to display on the button
  special?: boolean; // Optional flag to apply special styling
}> = ({ style, dark, onClick, text, special }) => {
  const { locale } = useRouter(); // Get the current locale (language) from Next.js's routing system

  // Enable the button for both Zalando and Servicenow
  if (style.style === "zalando" || style.style === "servicenow") {
    return (
      <button
        onClick={onClick} // Attach the click handler to enable button functionality
        className={`border-2 rounded ${
          style.mainBorder // Apply border styling from the provided style object
        } px-8 py-1.5 text-[20px] ${style.fontTitle1} ${ // Additional padding and font styles
          special
            ? `${style.mainBg} text-white` // Apply special styling if the 'special' flag is true
            : dark
            ? `${style.mainBg} text-white` // Apply dark mode styling
            : "text-black" // Default to black text for other scenarios
        }`}
      >
        Apply Now {/* Button text changed to 'Apply Now' */}
      </button>
    );
  }

  // Original behavior: Disable the button for Media-Tech
  if (style.style === "media-tech") {
    return (
      <button
        disabled={true} // Button is disabled for this case
        className={`border-2 cursor-not-allowed rounded ${
          style.mainBorder // Apply border styling
        } px-8 py-1.5 text-[20px] ${style.fontTitle1} ${ // Additional padding and font styles
          special
            ? `${style.mainBg} text-white` // Apply special styling if the 'special' flag is true
            : dark
            ? `${style.mainBg} text-white` // Apply dark mode styling
            : "text-black" // Default to black text for other scenarios
        }`}
      >
        Applications Closed - stay tuned for next class dates {/* Original text for disabled button */}
      </button>
    );
  }

  // Default behavior for all other cases
  return (
    <button
      onClick={onClick} // Attach the click handler to enable button functionality
      className={`border-2 rounded ${
        style.mainBorder // Apply border styling from the provided style object
      } uppercase px-8 py-1.5 text-[21px] ${style.fontTitle1} ${ // Additional padding and font styles
        special
          ? `${style.mainBg} text-white` // Apply special styling if the 'special' flag is true
          : dark
          ? `${style.mainBg} text-white` // Apply dark mode styling
          : "text-black" // Default to black text for other scenarios
      }`}
    >
      {text} {/* Render the dynamic text passed to the button */}
      <span className={`${dark ? "text-white" : ""}`}> {/* Adjust color for dark mode */}
        &nbsp;<span className="font-gilroy">→</span> {/* Render an arrow icon */}
      </span>
    </button>
  );
};
