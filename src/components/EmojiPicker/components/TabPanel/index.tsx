import React, { useContext } from 'react';
import { CategoriesTitle } from '../../../../constants';
import { CategoryPanelProps } from './props';
import { Emoji } from '../../../Emoji';
import { EmojiContext } from '../../../../providers/EmojiProvider/contexts';
import { SearchIndex } from '../../../../helpers';
import { Grid, Tabs, Text } from '@mantine/core';

const CategoryPanel = (props: CategoryPanelProps) => {
  const { data } = useContext(EmojiContext);

  const { categories, set, size, skin } = props;

  return (
    <>
      {categories?.map((category: any) => (
        <Tabs.Panel value={category.id}>
          <Text
            sx={{
              marginTop: '3px'
            }}>
            {CategoriesTitle[category.id]}
          </Text>
          <Grid
            columns={9}
            gutter={'xs'}
            sx={{
              maxHeight: '400px',
              overflowX: 'hidden',
              overflowY: 'auto',
              marginTop: '5px'
            }}>
            {category?.emojis.map((emojiId: string) => {
              const emoji: Record<string, any> = SearchIndex.get(emojiId, data);

              return (
                <Grid.Col
                  span={1}
                  sx={{
                    '&:hover': {
                      backgroundColor: 'grey',
                      cursor: 'pointer'
                    }
                  }}>
                  <Emoji
                    cols={data?.sheet.cols}
                    emoji={emoji}
                    id={emoji.id}
                    key={emoji.id}
                    rows={data?.sheet.rows}
                    set={set}
                    size={size}
                    skin={skin}
                    spritesheet={true}
                  />
                </Grid.Col>
              );
            })}
          </Grid>
        </Tabs.Panel>
      ))}
    </>
  );
};

export default CategoryPanel;