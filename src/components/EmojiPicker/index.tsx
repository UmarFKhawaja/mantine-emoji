import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  ActionIcon,
  Group,
  Modal,
  ScrollArea,
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
import { SearchIndex } from '../../helpers';
import { IconMoodSmile, IconSearch } from '@tabler/icons';
// import { useScrollIntoView } from '@mantine/hooks';


const EmojiPicker = (props: EmojiPickerProps) => {
  const [opened, setOpened] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<string | null>('frequent');

  
  
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


  const onScrollPositionChange = ({y}:any)=>{

    const keys = Object.keys(CategoriesScrollAxis);    
    const found = Object.values(CategoriesScrollAxis).findIndex((e)=>{
        return y <= e;
      }) - 1;

      if(found !== -1 && !scrolled){
        setActiveTab(keys[found]);
      }
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

  const viewport: any = useRef<HTMLDivElement>();

  const scrollToFlags = (category: string) => {
    console.log(
      '🚀 ~ file: index.tsx ~ line 100 ~ EmojiPicker ~ viewport',
      viewport
    );

    viewport.current.scrollTo({
      top: CategoriesScrollAxis[category],
      behavior: 'smooth'
    });

    setActiveTab(category);

    
      setScrolled(true);
      setTimeout(() => {
        setScrolled(false);
      }, 1000);
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
          <CategoryTab
            categories={searchData?.categories || data?.categories}
            theme={theme}
            scrollToFlags={scrollToFlags}
            activeTab={activeTab}
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
              categories={searchData?.categories || data?.categories}
              set={EmojiSet}
              size={EmojiSize}
              skin={EmojiSkin}
              searchedEmojis={searchData}
            />
          </ScrollArea>
      </Modal>

      <Group position="center">
        <ActionIcon onClick={() => setOpened(true)}><IconMoodSmile strokeWidth={2} size="xl"/></ActionIcon>
      </Group>
    </>
  );
};

export default EmojiPicker;
