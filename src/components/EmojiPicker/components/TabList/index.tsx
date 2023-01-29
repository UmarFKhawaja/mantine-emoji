import React from 'react';
import { ActionIcon, SegmentedControl } from '@mantine/core';
// import { Icons, THEME_ICONS } from '../../../../constants';
import navigationImg from '../../category-icons';
import { CategoryTabProps } from './props';
import { style } from './style';

const CategoryTab = (props: CategoryTabProps) => {
  const { categories , activeTab , scrollToFlags } = props;
  let data : any = [];

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

    // const style: any = Icons === 'auto' ? (THEME_ICONS[theme] as any) : Icons;

    return categoryIcons["solid"] || categoryIcons;
  };
  
 categories?.map((category: any, i: number) => {
    data = [...data,
      {
        value:category.id,
        label:(
                    <ActionIcon
                      onClick={() => scrollToFlags(category.id)}
                      variant="transparent"
                      size={20}
                      radius="xs">
                        {renderIcon(category)}
                  </ActionIcon>
        )
      }
    ]
  });

  return (
    <>
      <SegmentedControl fullWidth sx={style} style={{}} value={activeTab} data={data}  />
    </>
  );
};

export default CategoryTab;
