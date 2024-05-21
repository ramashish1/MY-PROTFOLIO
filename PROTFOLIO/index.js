const currentDate = new Date();
const formattedDate =
  currentDate.toDateString().split(" ").slice(0, 3).join(" ") +
  " " +
  currentDate.toTimeString().split(" ")[0].split(":").slice(0, 3).join(":");
document.getElementById("dateTime").innerHTML = formattedDate;
const typingElement = document.querySelector(".typing");
let index = 0;
let currentText = "";
let isDeleting = false;
let currentMenu = "main";

const menus = {
  main: `Select a menu:<br><span onclick="handleMenuClick('1')">[1] Who is Ramashish?</span><br><span onclick="handleMenuClick('2')">[2] Contact me</span><br><span onclick="handleMenuClick('3')">[3] My works</span>`,
  1: `Who is Ramashish?<br><br>I've been a software developer for several years. My journey into the tech world began by creating web application's and solving complex problems. I channeled my skills into web , application , software development and mangement . This led me to work extensively with web application, a niche where I contributed significantly. <br><br><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
  2: `Contact:<br>- Email: <a href="mailto:kumarramashish138@gmail.com">kumarramashish138@gmail.com</a><br>- Github: <a href="https://github.com/ramashish1">@ramashish1</a><br><br><span onclick="handleMenuClick('B')">[B] Back</span>`,
  3: `Some of my Projects:<br><br>
- <strong>Crypto Currency Tracker (Minor Project)</strong>: Designed and Developed a crypto tracker website
where user track and check daily price and news,
Users track particular coin with daily updates and
check graph,
Coordinate effectively a team of 3 members work in
this project.
Tools/Technologies used: REACTJS , CSS , VSCODE.<br>
- <strong>Student Management System (Desktop
    Application)</strong>: In this project I work with java and build two module
    like registration , student detail ,Backend: mysql.<br>
- <strong>Online Payment App(Train catering services)</strong>:•Designed and developed an online payment app for
catering services.
•Users who need to pay their order by online they use
this app.
•User check menu of all items with prices and pay it
eaisly.
•Tools/Technologies used:
JAVA,FIREBASE,XML,ANDROID STUDIO .<br>

<span onclick="handleMenuClick('B')">[B] Back</span>
`,
};

function handleMenuClick(menuKey) {
  if (menuKey in menus && currentMenu !== menuKey) {
    isDeleting = true;
    typeDeleteAnimation(() => {
      currentMenu = menuKey;
      currentText = menus[menuKey];
      index = 0;
      typeDeleteAnimation();
    });
  } else if ((menuKey === "B" || menuKey === "b") && currentMenu !== "main") {
    isDeleting = true;
    typeDeleteAnimation(() => {
      currentMenu = "main";
      currentText = menus.main;
      index = 0;
      typeDeleteAnimation();
    });
  }
}
function typeDeleteAnimation(callback) {
  let speed = 7; // default typing speed
  let deleteSpeed = 3; // default deletion speed

  if (currentMenu === "1" || currentMenu === "3") {
    speed = 1; // Makes the typing faster for "Who is gautam".
    deleteSpeed = 1; // Makes the deletion faster for "Who is gautam". Adjust as needed.
  }

  if (isDeleting && typingElement.innerHTML !== "") {
    if (currentText.charAt(index - 1) === ">") {
      const openTagIndex = currentText.lastIndexOf("<", index);
      const tagName = currentText.substring(
        openTagIndex + 1,
        currentText.indexOf(" ", openTagIndex)
      );
      const startTagIndex = currentText.lastIndexOf(`</${tagName}>`, index);
      index = startTagIndex;
    } else {
      index--;
    }
    currentText = currentText.slice(0, index);
    typingElement.innerHTML = currentText;

    setTimeout(() => typeDeleteAnimation(callback), deleteSpeed);
  } else if (isDeleting) {
    isDeleting = false;
    if (callback) callback();
  } else if (!isDeleting && index < currentText.length) {
    if (currentText.charAt(index) === "<") {
      if (currentText.substr(index, 4) === "<br>") {
        const br = document.createElement("br");
        typingElement.appendChild(br);
        index += 4;
      } else {
        const closingTagIndex = currentText.indexOf(">", index);
        const tagName = currentText
          .substring(index + 1, closingTagIndex)
          .split(" ")[0];
        const endTagIndex =
          currentText.indexOf(`</${tagName}>`, index) + `</${tagName}>`.length;
        const outerHTML = currentText.substring(index, endTagIndex);
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = outerHTML;
        const childElement = tempDiv.firstChild;

        if (tagName === "a") {
          childElement.target = "_blank";
          speed = 1; // Faster typing for <a> tag
        } else if (tagName === "span") {
          childElement.onclick = function () {
            const menuKey = childElement
              .getAttribute("onclick")
              .replace("handleMenuClick('", "")
              .replace("')", "");
            handleMenuClick(menuKey);
          };
          speed = 1; // Faster typing for <span> tag
        }

        typingElement.appendChild(childElement);
        index = endTagIndex;
      }
    } else {
      typingElement.innerHTML += currentText.charAt(index);
      index++;
    }

    setTimeout(typeDeleteAnimation, speed);
  }
}

function handleUserInput(event) {
  const key = event.key;
  if (key in menus && currentMenu !== key) {
    isDeleting = true;
    typeDeleteAnimation(() => {
      currentMenu = key;
      currentText = menus[key];
      index = 0;
      typeDeleteAnimation();
    });
  } else if ((key === "B" || key === "b") && currentMenu !== "main") {
    isDeleting = true;
    typeDeleteAnimation(() => {
      currentMenu = "main";
      currentText = menus.main;
      index = 0;
      typeDeleteAnimation();
    });
  }
}

document.addEventListener("keydown", handleUserInput);

// Initialize the typing animation with the main menu on page load
currentText = menus.main;
typeDeleteAnimation();


// - <strong>Social</strong>: A Chrome extension designed for 42School students, enabling seamless synchronization of events with the page calendar. <a href="https://github.com/gautamkingdreko/CalIntra" target="_blank">[GitHub]</a><br>
// - <strong>PerimeterX AST Deobfuscator</strong>: A tool to deobfuscate and understand PerimeterX's init script. <a href="https://github.com/gautamkingdreko/PerimeterX-Deobfuscator" target="_blank">[GitHub]</a><br>
// - <strong>TMX AST Deobfuscator</strong>: A dedicated deobfuscator for TMX's dynamic scripts. <a href="https://github.com/gautamkingdreko/TMX-Deobfuscator" target="_blank">[GitHub]</a><br>
// - <strong>Adyen 4.5.0 payment encryption in node</strong>: A node-based solution for secure payment encryption using Adyen 4.5.0. <a href="https://github.com/gautamkingdreko/adyen-4.5.0" target="_blank">[GitHub]</a> | <a href="https://github.com/gautamkingdreko/adyen-4.5.0" target="_blank">[v4.4.1]</a><br>
// - <strong>TakionAPI</strong>: An industry-leading antibot bypass provider. <a href="https://takionapi.tech/github" target="_blank">[GitHub]</a> | <a href="https://Takionapi.tech/discord" target="_blank">[Discord]</a><br>
// - <strong>This Landing Page</strong>: Check out the code and design of this landing page. <a href="https://codepen.io/gautamkingdreko" target="_blank">[CodePen]</a><br><br>
