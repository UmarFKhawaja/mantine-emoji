import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Button,
  Group,
  Modal,
  ScrollArea,
  Tabs,
  TextInput
} from '@mantine/core';
import { EmojiPickerProps } from './props';
import { EmojiContext } from '../../providers/EmojiProvider/contexts';
import {
  CategoriesScrollAxis,
  EmojiSet,
  EmojiSize,
  EmojiSkin,
  EmojiVersion,
  Locale
} from '../../constants';
import { getProps, init } from '../../config';
import CategoryTab from './components/TabList';
import CategoryPanel from './components/TabPanel';
import { IconSearch } from '@tabler/icons';
import { SearchIndex } from '../../helpers';
import { useScrollIntoView } from '@mantine/hooks';


const EmojiPicker = (props: EmojiPickerProps) => {
  const [opened, setOpened] = useState(false);
  // const [scrolled, setScrolled] = useState(false);
  // const [scrollPosition, setScrollPosition] = useState(0);
  // const [previousPosition, setPreviousPosition] = useState(0);
  // const [scrollDirection, setScrollDirection] = useState("down");
  
  
  
  const [searchData, setSearchData] = useState<Record<string, any> | null>(
    null
  );

  const { theme } = props;

  const { data } = useContext(EmojiContext);

  const { setData } = useContext(EmojiContext);

  const initProps: Record<string, any> = getProps(
    {},
    {
      set: {
        value: EmojiSet
      },
      locale: {
        value: Locale
      },
      emojiVersion: {
        value: EmojiVersion
      }
    },
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setData(await init(initProps));
    };

    fetchData().catch(console.error);
  }, [setData, initProps]);

  
  // const manageScroll = ({x,y}:any)=>{
    // updateScrollDir(y);
    // if(!scrolled) 
  //     onScrollPositionChange();
  // }

  // const updateScrollDir = (y:any) => {
  //   const scrollY = y;
  //   if (Math.abs(scrollY - previousPosition) < 0) {
  //     return;
  //   }
  //   setScrollDirection(scrollY > previousPosition ? "down" : "up");
  //   setPreviousPosition(scrollY);
  // };


  const onScrollPositionChange = ({x,y}:any)=>{
  //   let category = data?.categories[scrollPosition]?.id;
  //   if(scrollDirection === "down"){
  //     scrollPosition+1 > data?.categories?.length ? setScrollPosition(0) : setScrollPosition(scrollPosition+1);

  //     viewport.current.scrollTo({
  //       top: CategoriesScrollAxis[category],
  //       behavior: 'smooth'
  //     });
  //     setScrolled(true);
  //     setTimeout(() => {
  //       setScrolled(false);
  //     }, 1000);
  //   }
  }

  const searchEmoji = async (value: string) => {
    if (!value) {
      setSearchData(null);
      return;
    }
    const emojis = await SearchIndex.search(value, data);

    const searchedEmoji: { [key: string]: any } = {};

    emojis?.forEach((emoji: { id: any; name: string }) => {
      searchedEmoji[emoji['id']] = emoji;
    });

    setSearchData({
      ...data,
      emojis: searchedEmoji
    });
  };
  const [activeTab, setActiveTab] = useState<string | null>();

  const changeTab = (tab: any) => {
    console.log(tab);
  };

  // const findIndexCategory = (search : any)=>{
  //   let index = -1;
  //     data?.categories?.filter((value:any,key:any)=>{
  //       if(value.id === search)
  //         return index = key;
  //     })

  //     return index;
  // }

  const viewport: any = useRef<HTMLDivElement>();

  const scrollToFlags = (category: string) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 100 ~ EmojiPicker ~ viewport',
      viewport
    );
    // setScrollPosition(findIndexCategory(category));
    viewport.current.scrollTo({
      top: CategoriesScrollAxis[category],
      behavior: 'smooth'
    });
  };
  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size={'sm'}
        sx={{
          '> div': {
            '> div': { padding: '0px' }
          }
        }}
        overlayOpacity={0.55}
        overlayBlur={3}
        trapFocus={false}>
        <Tabs
          value={activeTab}
          defaultValue={searchData?.categories[0].id || data?.categories[0].id}
          onTabChange={changeTab}>
          <CategoryTab
            categories={searchData?.categories || data?.categories}
            theme={theme}
            scrollToFlags={scrollToFlags}
          />
          <TextInput
            placeholder="Search"
            icon={<IconSearch size={14} />}
            style={{
              padding: '5px 10px 10px 10px'
            }}
            onChange={(event) => searchEmoji(event.currentTarget.value)}
          />
          <ScrollArea
            style={{ width: 380, height: 400 }}
            viewportRef={viewport}
            onScrollPositionChange={onScrollPositionChange}
            >
            <CategoryPanel
              setActiveTab={setActiveTab}
              categories={searchData?.categories || data?.categories}
              set={EmojiSet}
              size={EmojiSize}
              skin={EmojiSkin}
              searchedEmojis={searchData}
            />
          </ScrollArea>
        </Tabs>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
};

export default EmojiPicker;
