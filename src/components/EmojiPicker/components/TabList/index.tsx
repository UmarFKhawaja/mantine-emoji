import React from 'react';
import { ActionIcon, Tabs } from '@mantine/core';
import { Icons, THEME_ICONS } from '../../../../constants';
import navigationImg from '../../category-icons';
import { CategoryTabProps } from './props';

const CategoryTab = (props: CategoryTabProps) => {
  const { categories, theme, scrollToFlags } = props;

  const renderIcon = (category: any) => {
    const { icon } = category;

    if (icon) {
      if (icon.svg) {
        return <span dangerouslySetInnerHTML={{ __html: icon.svg }}></span>;
      }

      if (icon.src) {
        return <img src={icon.src} alt={'cat'} />;
      }
    }
    const categoryIcons: any = navigationImg.categories[category.id];

    const style: any = Icons === 'auto' ? (THEME_ICONS[theme] as any) : Icons;

    return categoryIcons[style] || categoryIcons;
  };

  return (
    <Tabs.List
      position={'center'}
      grow={true}
      style={{
        padding: '10px 10px 0px 10px'
      }}>
      {categories?.map((category: any, i: number) => {
        return (
          <Tabs.Tab
            key={category.id}
            value={categories[0].id as string}
            style={{ padding: '10px', marginTop: '-10px' }}>
            <ActionIcon
              onClick={() => scrollToFlags(category.id)}
              variant="transparent"
              size={20}
              radius="xs">
              {renderIcon(category)}
            </ActionIcon>
          </Tabs.Tab>
        );
      })}
    </Tabs.List>
  );
};

export default CategoryTab;
