import React, { useContext } from 'react';
import { CategoriesTitle } from '../../../../constants';
import { SearchIndex } from '../../../../helpers';
import { CategoryPanelProps } from './props';
import {Emoji} from '../../../../components';
import { Box, Grid, Paper, Text } from '@mantine/core';
import { EmojiContext } from '../../../../providers/EmojiProvider/contexts';

const CategoryPanel = (props: CategoryPanelProps) => {
  const { data } = useContext(EmojiContext);

  const {
    categories,
    set,
    size,
    skin,
    searchedEmojis,
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

  let showEmoji = (searchedEmojis?.emojis && Object.keys(searchedEmojis?.emojis).length > 0) || searchedEmojis;
  let result = showEmoji === null || showEmoji ===true;
  return (
    <>
    <Paper
      ref={scrollableRef}
      sx={{
        overflowX: 'hidden',
        padding: '10px 10px 10px 10px'
      }}>
        <Box>
      {result && categories?.map((category: any) => (
        <>
        {  
          ((searchedEmojis?.emojis && Object?.keys(searchedEmojis?.emojis).toString().split(",").filter(elem=> category?.emojis.includes(elem)).length>0) || !searchedEmojis?.emojis) &&
                <>                
                  <Text id={category.id}>{CategoriesTitle[category.id]}</Text>
                
                  <Grid columns={9} gutter="xs" justify="space-around">
                    {category?.emojis.map((emojiId: string) => {
                      const emoji: Record<string, any> = SearchIndex.get(
                        emojiId,
                        searchedEmojis || data
                      );
                      
                      return (
                        emoji && (
                          <Grid.Col
                            key={emoji?.id}
                            span="content"
                            sx={{
                              '&:hover': {
                                backgroundColor: 'grey',
                                borderRadius: '35%',
                                cursor: 'pointer',
                                opacity:0.7
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
               </>
          }
        </>
      ))}
      </Box>
    </Paper>
    </>
  );
};

export default CategoryPanel;
