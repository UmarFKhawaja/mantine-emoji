import React, { useContext, useEffect } from 'react';
import { CategoriesTitle } from '../../../../constants';
import { CategoryPanelProps } from './props';
import { Emoji } from '../../../Emoji';
import { EmojiContext } from '../../../../providers/EmojiProvider/contexts';
import { SearchIndex } from '../../../../helpers';
import { Grid, Paper, Tabs, Text } from '@mantine/core';

const CategoryPanel = (props: CategoryPanelProps) => {
  const { data } = useContext(EmojiContext);

  const {
    categories,
    set,
    size,
    skin,
    searchedEmojis,
    setActiveTab,
    scrollableRef
  } = props;
  /**
   * If the height of the current target is greater than or equal to 400, set the active tab to foods
   * @param {any} event - any - this is the event that is triggered when the user scrolls.
   */
  // const handleScroll = (event: any) => {
  //   if (event.currentTarget.offsetHeight >= 400) {
  //     setActiveTab('foods');
  //   }
  // };
  return (
    <Paper
      ref={scrollableRef}
      sx={{
        overflowX: 'hidden',
        padding: '10px 10px 10px 10px'
      }}>
      {categories?.map((category: any) => (
        <Tabs.Panel value={categories[0].id} key={category.id}>
          <Text id={category.id}>{CategoriesTitle[category.id]}</Text>

          <Grid columns={9} gutter="xs">
            {category?.emojis.map((emojiId: string) => {
              const emoji: Record<string, any> = SearchIndex.get(
                emojiId,
                searchedEmojis || data
              );

              return (
                emoji && (
                  <Grid.Col
                    key={emoji?.id}
                    span={1}
                    sx={{
                      '&:hover': {
                        backgroundColor: '#EBECF0',
                        borderRadius: '50%',
                        cursor: 'pointer'
                      }
                    }}>
                    <Emoji
                      cols={data?.sheet.cols}
                      emoji={emoji}
                      id={emoji?.id}
                      rows={data?.sheet.rows}
                      set={set}
                      size={size}
                      skin={skin}
                      spritesheet={true}
                    />
                  </Grid.Col>
                )
              );
            })}
          </Grid>
        </Tabs.Panel>
      ))}
    </Paper>
  );
};

export default CategoryPanel;
