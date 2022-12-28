import { useRef, memo, MutableRefObject, useState } from "react";
import { useStoreActions, useStoreState } from "../../../store";
import { Tooltip } from "./Tooltip";

const dockButtons: { title: string; logo: string }[] = [
  {
    title: "Messages",
    logo: "images/messages-logo.png",
  },
  {
    title: "Music",
    logo: "images/music-logo.png",
  },
  {
    title: "Finder",
    logo: "images/finder-logo.png",
  },
  // {
  //   title: 'Safari',
  //   logo: 'images/safari-logo.png',
  // },
  // {
  //   title: 'Mail',
  //   logo: 'images/mail-logo.png',
  // },
  // {
  //   title: 'Photos',
  //   logo: 'images/photos-logo.png',
  // },
  // {
  //   title: 'Contacts',
  //   logo: 'images/contacts-logo.png',
  // },
  // {
  //   title: 'Calendar',
  //   logo: 'images/calendar-logo.png',
  // },
  // {
  //   title: 'Stocks',
  //   logo: 'images/stocks-logo.png',
  // },
  // {
  //   title: 'Facetime',
  //   logo: 'images/facetime-logo.png',
  // },
  // {
  //   title: "Maps",
  //   logo: "images/maps-logo.png",
  // },
  {
    title: "Note",
    logo: "images/note-logo.png",
  },
  // {
  //   title: "Reminders",
  //   logo: "images/reminders-logo.png",
  // },
  {
    title: "Settings",
    logo: "images/settings-logo.png",
  },
  // {
  //   title: "News",
  //   logo: "images/news-logo.png",
  // },
];

const Dock = () => {
  const dockButtonsWrapper =
    useRef<HTMLDivElement>() as MutableRefObject<HTMLDivElement>;

  const activeDock = useStoreState((state) => state.dockBar.active);
  const closeMenu = useStoreActions((actions) => actions.menuBar.closeMenu);
  const openMenu = useStoreActions((actions) => actions.dockBar.openMenu);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const handleItemsMouseEnter = (itemIndex: number) => {
    const expandSize = 8;

    const buttonElements = dockButtonsWrapper.current
      .children as HTMLCollectionOf<HTMLDivElement>;

    buttonElements[itemIndex].style.width = `${expandSize}rem`;

    if (itemIndex > 0 && buttonElements[itemIndex - 1]) {
      buttonElements[itemIndex - 1].style.width = `${expandSize - 1.5}rem`;
    }

    if (itemIndex > 0 && buttonElements[itemIndex - 2]) {
      buttonElements[itemIndex - 2].style.width = `${expandSize - 2.5}rem`;
    }

    if (itemIndex < dockButtons.length - 1 && buttonElements[itemIndex + 1]) {
      buttonElements[itemIndex + 1].style.width = `${expandSize - 1.5}rem`;
    }

    if (itemIndex < dockButtons.length - 1 && buttonElements[itemIndex + 2]) {
      buttonElements[itemIndex + 2].style.width = `${expandSize - 2.5}rem`;
    }
    if (buttonElements[activeIndex]) {
      buttonElements[activeIndex].style.width = `${expandSize}rem`;
    }
  };

  const handleItemsMouseLeave = (itemIndex: number) => {
    const unexpandSize = 4;

    const buttonElements = dockButtonsWrapper.current
      .children as HTMLCollectionOf<HTMLDivElement>;

    buttonElements[itemIndex].style.width = `${unexpandSize}em`;

    if (itemIndex > 0 && buttonElements[itemIndex - 1]) {
      buttonElements[itemIndex - 1].style.width = `${unexpandSize}em`;
    }

    if (itemIndex > 0 && buttonElements[itemIndex - 2]) {
      buttonElements[itemIndex - 2].style.width = `${unexpandSize}em`;
    }

    if (itemIndex < dockButtons.length - 1 && buttonElements[itemIndex + 1]) {
      buttonElements[itemIndex + 1].style.width = `${unexpandSize}em`;
    }

    if (itemIndex < dockButtons.length - 1 && buttonElements[itemIndex + 2]) {
      buttonElements[itemIndex + 2].style.width = `${unexpandSize}em`;
    }

    if (buttonElements[activeIndex]) {
      buttonElements[activeIndex].style.width = `${8}rem`;
    }
  };

  const handleItemsClick = (itemIndex: number, itemTitle: string) => {
    // closeMenu();
    setActiveIndex(itemIndex);
  };

  return (
    <div
      ref={dockButtonsWrapper}
      className="flex h-16 flex-row justify-center items-end bg-white fixed bottom-2 left-0 right-0 px-2 bg-opacity-10 w-max m-auto rounded-xl"
    >
      {dockButtons.map((item: { title: string; logo: string }, i: number) => (
        <Tooltip title={item.title}>
          <button
            key={item.title}
            className="w-16 align-bottom dock-item p-2"
            style={{ transition: "all ease .2s" }}
            onMouseEnter={() => handleItemsMouseEnter(i)}
            onMouseLeave={() => handleItemsMouseLeave(i)}
            onClick={() => handleItemsClick(i, item.title)}
          >
            <img
              alt="dock icon"
              className="select-none w-full"
              src={item.logo}
            />
          </button>
        </Tooltip>
      ))}
    </div>
  );
};

export default memo(Dock);
