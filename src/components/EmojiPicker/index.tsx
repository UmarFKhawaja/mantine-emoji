import React, { useContext, useEffect, useState } from 'react';
import { Button, Group, Modal, Tabs, TextInput } from '@mantine/core';
import { EmojiPickerProps } from './props';
import { EmojiContext } from '../../providers/EmojiProvider/contexts';
import {
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

const EmojiPicker = (props: EmojiPickerProps) => {
  const [opened, setOpened] = useState(false);
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

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        withCloseButton={false}
        size={'sm'}
        padding={'xs'}
        overlayOpacity={0.55}
        overlayBlur={3}
        trapFocus={false}>
        <Tabs
          defaultValue={searchData?.categories[0].id || data?.categories[0].id}>
          <CategoryTab
            categories={searchData?.categories || data?.categories}
            theme={theme}
          />
          <TextInput
            placeholder="Search"
            icon={<IconSearch size={14} />}
            style={{
              paddingTop: '5px'
            }}
            onChange={(event) => searchEmoji(event.currentTarget.value)}
          />
          <CategoryPanel
            categories={searchData?.categories || data?.categories}
            set={EmojiSet}
            size={EmojiSize}
            skin={EmojiSkin}
            searchedEmojis={searchData}
          />
        </Tabs>
      </Modal>

      <Group position="center">
        <Button onClick={() => setOpened(true)}>Open Modal</Button>
      </Group>
    </>
  );
};

export default EmojiPicker;
