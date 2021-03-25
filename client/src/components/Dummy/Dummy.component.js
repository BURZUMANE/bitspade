import React from 'react';
import ButtonComponent from '../Button/ButtonComponent';
import {v4 as uuidv4} from 'uuid';
import styled from 'styled-components';
import useFetch from '../../hooks/useFetch';

const List = styled.ul`
font-size: 1.5rem;
display: flex;
justify-content: space-between;
flex-wrap: wrap;
word-wrap: anywhere;
padding: 0;

`;

const ListItem = styled.li`
white-space:pre-wrap;
padding: 5px 10px;
`;

const DummyComponent = () => {
  const {data, fetchNextPage, changeUrl, error, updateData} = useFetch(
      'https://api.instantwebtools.net/v1/passenger?size=10&page=',
      (response) => console.log(response));
  if (error) {
    console.error(error);
  }
  return (
      <>
        {data && <ButtonComponent
            text={'update data'}
            cb={updateData}
        />}
        <div>
          <ButtonComponent
              text={'change URL'}
              cb={() => changeUrl(
                  'https://api.instantwebtools.net/v1/airlines?size=10&page=')}
          />
          <ButtonComponent
              text={'More'}
              cb={fetchNextPage}
          />
          <List>
            {data && data.map(item => {
              const key = uuidv4();
              return <ListItem key={key}>{item.name}</ListItem>;
            })}
          </List>
        </div>
      </>
  );
};
export default DummyComponent;
