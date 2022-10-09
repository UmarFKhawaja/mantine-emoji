import React, { useContext, useEffect, useState } from 'react';
import { Button, Group, Modal, Tabs } from '@mantine/core';
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

const EmojiPicker = (props: EmojiPickerProps) => {
  const [opened, setOpened] = useState(false);

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
        <Tabs defaultValue={data?.categories[0].id}>
          <CategoryTab categories={data?.categories} theme={theme} />
          <CategoryPanel
            categories={data?.categories}
            set={EmojiSet}
            size={EmojiSize}
            skin={EmojiSkin}
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
