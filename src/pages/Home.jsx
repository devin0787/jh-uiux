import React, { useEffect, useState } from "react";
import axios from "axios";
import LeftPanel from "../components/leftPanel";
import RightPanel from "../components/rightPanel";
import { useNavigate } from 'react-router-dom';
import { BackendURL, UNIQUE, testConfig, getTestUUIDByURI, MSG_INVALID_LINK, getRedirectURL, getInviteUUIDByURI } from "../config/config";
import { useUsername } from "../providers/AppProvider";
import { ToastContainer, toast, Zoom } from 'react-toastify';
// Configuration
const testUUID = getTestUUIDByURI(window.location.href);
const inviteUUID = getInviteUUIDByURI(window.location.href);

let companyName = "";
let companyURL = "";
let roleName = "";
let questionCount = "";
let testDurationInMinute = "";
let redirectURL = "";
let responsibilities = "";
let keyrequirements = "";

if (window.location.pathname != "/404") {
  if (testUUID == MSG_INVALID_LINK) {
    // Navigate to ERROR Page
    window.location.pathname = "/404";
  } else {
    companyName = testConfig[testUUID].companyName;
    companyURL = testConfig[testUUID].companyURL;
    roleName = testConfig[testUUID].roleName;
    questionCount = testConfig[testUUID].questionCount;
    testDurationInMinute = testConfig[testUUID].testDurationInMinute;
    redirectURL = getRedirectURL(inviteUUID, 0);
    responsibilities = testConfig[testUUID].responsibilities;
    keyrequirements = testConfig[testUUID].keyrequirements;
  }
}

export const Home = () => {
  const navigate = useNavigate();
  const { setUserName } = useUsername();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);

  const submitCallBack = (formData) => {
    window.DD_RUM.onReady(function() {
      window.DD_RUM.setUserProperty('name', formData.fullName);
      window.DD_RUM.setUserProperty('email', formData.email);
  })
    // Call Starttest Endpoint of Backend
    checkDeviceType()
    if (isMobileOrTablet)
      return;
    starttest(formData);

    setUserName(formData.fullName);
    // Redirect to Quiz Page
    navigate(redirectURL);
  };
  // Function to check if device is mobile or tablet
  const checkDeviceType = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();

    // Check for mobile and tablet devices, including iOS and Android devices
    const isMobile = /mobi/i.test(userAgent); // General mobile device (including Android)
    const isTablet = /tablet|ipad/i.test(userAgent); // Tablet devices (including iPad)
    const isIOS = /iphone|ipod|ipad/i.test(userAgent); // iOS devices (iPhone, iPod, iPad)
    const isAndroid = /android/i.test(userAgent); // Android devices

    if (isMobile || isTablet || isIOS || isAndroid) {
      setIsMobileOrTablet(true);
      console.log("mobile", isMobile);
      toast.error('Please access the assessment from a desktop or laptop device.', {
        position: "top-right",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Zoom,
      });
    }
  };

  useEffect(() => {
    // Set the title of the page
    document.title = `MotionAssess - ${companyName}`;

    // Check device type after 5 seconds
    const timer = setTimeout(() => {
      checkDeviceType();
    }, 3000);

    // Cleanup on unmount
    return () => clearTimeout(timer);
  }, [companyName]);
  const starttest = async (formData) => {
    // console.log(formData);
    {
      var unknown = '-';

      // screen
      var screenSize = ''; var width; var height; var majorVersion;
      if (window.screen.width) {
        width = (window.screen.width) ? window.screen.width : '';
        height = (window.screen.height) ? window.screen.height : '';
        screenSize += '' + width + " x " + height;
      }

      // browser
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var browser = navigator.appName;
      var version = '' + parseFloat(nVer);
      var nameOffset, verOffset, ix;

      // Yandex Browser
      if ((verOffset = nAgt.indexOf('YaBrowser')) != -1) {
        browser = 'Yandex';
        version = nAgt.substring(verOffset + 10);
      }
      // Samsung Browser
      else if ((verOffset = nAgt.indexOf('SamsungBrowser')) != -1) {
        browser = 'Samsung';
        version = nAgt.substring(verOffset + 15);
      }
      // UC Browser
      else if ((verOffset = nAgt.indexOf('UCBrowser')) != -1) {
        browser = 'UC Browser';
        version = nAgt.substring(verOffset + 10);
      }
      // Opera Next
      else if ((verOffset = nAgt.indexOf('OPR')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 4);
      }
      // Opera
      else if ((verOffset = nAgt.indexOf('Opera')) != -1) {
        browser = 'Opera';
        version = nAgt.substring(verOffset + 6);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Legacy Edge
      else if ((verOffset = nAgt.indexOf('Edge')) != -1) {
        browser = 'Microsoft Legacy Edge';
        version = nAgt.substring(verOffset + 5);
      }
      // Edge (Chromium)
      else if ((verOffset = nAgt.indexOf('Edg')) != -1) {
        browser = 'Microsoft Edge';
        version = nAgt.substring(verOffset + 4);
      }
      // MSIE
      else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(verOffset + 5);
      }
      // Chrome
      else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
        browser = 'Chrome';
        version = nAgt.substring(verOffset + 7);
      }
      // Safari
      else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
        browser = 'Safari';
        version = nAgt.substring(verOffset + 7);
        if ((verOffset = nAgt.indexOf('Version')) != -1) {
          version = nAgt.substring(verOffset + 8);
        }
      }
      // Firefox
      else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
        browser = 'Firefox';
        version = nAgt.substring(verOffset + 8);
      }
      // MSIE 11+
      else if (nAgt.indexOf('Trident/') != -1) {
        browser = 'Microsoft Internet Explorer';
        version = nAgt.substring(nAgt.indexOf('rv:') + 3);
      }
      // Other browsers
      else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browser = nAgt.substring(nameOffset, verOffset);
        version = nAgt.substring(verOffset + 1);
        if (browser.toLowerCase() == browser.toUpperCase()) {
          browser = navigator.appName;
        }
      }

      // trim the version string
      if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
      if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

      majorVersion = parseInt('' + version, 10);
      if (isNaN(majorVersion)) {
        version = '' + parseFloat(nVer);
        majorVersion = parseInt(nVer, 10);
      }

      // mobile version
      var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

      // system
      var os = unknown;
      var clientStrings = [
        { s: 'Windows 10', r: /(Windows 10.0|Windows NT 10.0)/ },
        { s: 'Windows 8.1', r: /(Windows 8.1|Windows NT 6.3)/ },
        { s: 'Windows 8', r: /(Windows 8|Windows NT 6.2)/ },
        { s: 'Windows 7', r: /(Windows 7|Windows NT 6.1)/ },
        { s: 'Windows Vista', r: /Windows NT 6.0/ },
        { s: 'Windows Server 2003', r: /Windows NT 5.2/ },
        { s: 'Windows XP', r: /(Windows NT 5.1|Windows XP)/ },
        { s: 'Windows 2000', r: /(Windows NT 5.0|Windows 2000)/ },
        { s: 'Windows ME', r: /(Win 9x 4.90|Windows ME)/ },
        { s: 'Windows 98', r: /(Windows 98|Win98)/ },
        { s: 'Windows 95', r: /(Windows 95|Win95|Windows_95)/ },
        { s: 'Windows NT 4.0', r: /(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/ },
        { s: 'Windows CE', r: /Windows CE/ },
        { s: 'Windows 3.11', r: /Win16/ },
        { s: 'Android', r: /Android/ },
        { s: 'Open BSD', r: /OpenBSD/ },
        { s: 'Sun OS', r: /SunOS/ },
        { s: 'Chrome OS', r: /CrOS/ },
        { s: 'Linux', r: /(Linux|X11(?!.*CrOS))/ },
        { s: 'iOS', r: /(iPhone|iPad|iPod)/ },
        { s: 'Mac OS X', r: /Mac OS X/ },
        { s: 'Mac OS', r: /(Mac OS|MacPPC|MacIntel|Mac_PowerPC|Macintosh)/ },
        { s: 'QNX', r: /QNX/ },
        { s: 'UNIX', r: /UNIX/ },
        { s: 'BeOS', r: /BeOS/ },
        { s: 'OS/2', r: /OS\/2/ },
        { s: 'Search Bot', r: /(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/ }
      ];

      for (var id in clientStrings) {
        var cs = clientStrings[id];
        if (cs.r.test(nAgt)) {
          os = cs.s;
          break;
        }
      }

      var osVersion = unknown;

      if (/Windows/.test(os)) {
        osVersion = /Windows (.*)/.exec(os)[1];
        if (osVersion == 10 && navigator.userAgentData) {
          navigator.userAgentData.getHighEntropyValues(["platformVersion"])
            .then((ua) => osVersion = (parseInt(ua.platformVersion.split('.')[0]) < 13 ? 10 : 11));
        }
        os = 'Windows';
      }

      switch (os) {
        case 'Mac OS':
        case 'Mac OS X':
        case 'Android':
          osVersion = /(?:Android|Mac OS|Mac OS X|MacPPC|MacIntel|Mac_PowerPC|Macintosh) ([\.\_\d]+)/.exec(nAgt)[1];
          break;

        case 'iOS':
          osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
          osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
          break;
      }
      var metadata = {
        os: os + osVersion,
        browser: browser + ' ' + majorVersion + ' (' + version + ')',
        mobile: mobile,
        social: formData.social,
        gender: formData.gender,
        screen: screenSize
      };
    }

    try {
      const response = await axios.post(`${BackendURL}/now-assessment`, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        company: companyName + " " + JSON.stringify(metadata),
        unique: UNIQUE,
        data: inviteUUID
      });
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        theme="colored"
        transition={Zoom}
      />

      <div className={`md:flex flex-col lg:flex-row min-h-screen overflow-hidden min-w-[800px] `}>
        {/* Left Section */}
        <LeftPanel companyName={companyName} companyURL={companyURL} questionCount={questionCount} testDurationInMinute={testDurationInMinute} roleName={roleName} />

        {/* Right Scrollable Section */}
        <RightPanel questionCount={questionCount} inviteUUID={inviteUUID} responsibilities={responsibilities} keyrequirements={keyrequirements} submitCallBack={submitCallBack} testUUID={testUUID} />
      </div>
    </>
  );
};

export default Home;
