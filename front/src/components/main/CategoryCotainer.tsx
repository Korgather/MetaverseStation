import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CategoryView from './CategoryView';

function Category() {
  const router = useRouter();
  const [sort, setSort] = useState('');
  const category = router.query.category as string;
  const selectedKeys = category ? [category as string] : ['category_all'];
  const onFilter = (e: React.MouseEvent<HTMLButtonElement>) => {
    const name = (e.currentTarget as HTMLButtonElement).name;
    name && setSort(name);
    router.push({
      pathname: '/',
      query: {
        category: router.query.category,
        page: 1,
        sort: name === 'sortByDate' ? '' : name === 'sortByPlayer' && 'playerCount,desc',
      },
    });
  };

  useEffect(() => {
    router.query.sort === 'playerCount,desc' ? setSort('sortByPlayer') : setSort('sortByDate');
  }, [router.query.sort]);
  const onSelect = ({ key }: { key: string }) => {
    if (key === 'category_all') {
      router.push({
        pathname: '/',
      });
    }
    if (key === 'METAVERSE_GATHERTOWN') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_GATHERTOWN',
          page: 1,
          sort: '',
        },
      });
    }
    if (key === 'METAVERSE_ZEP') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_ZEP',
          page: 1,
          sort: '',
        },
      });
    }
    if (key === 'METAVERSE_2NDBLOCK') {
      router.push({
        pathname: '/',
        query: {
          category: 'METAVERSE_2NDBLOCK',
          page: 1,
          sort: '',
        },
      });
    }
  };
  const CategoryProps = {
    selectedKeys,
    onSelect,
    sort,
    onFilter,
    category,
  };
  return <CategoryView {...CategoryProps} />;
}

export default Category;
