import React,{useState} from 'react';
import {Button} from 'antd';
function List () {
    const [count,setCount]=useState(0)
  return (
    <>
      <Button type="primary" >我是list </Button>
      <Button type="primary" onClick={() => setCount(count + 1)}>+ </Button>
      <Button type="primary" onClick={() => setCount(count - 1)}>- </Button>
        <p>{count}</p>
    </>
  );
}

export default List;
