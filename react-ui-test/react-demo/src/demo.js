import React from 'react';

function Demo(props){
   const {data}=props
    return (
        <>
        <h1>我是 demo</h1>
        <ul>
        {data.map((v,index)=> (<li key={v.id}>
            {index+1}、{v.title}
        </li>)
        )}
        </ul>
        </>
    )
}
export default Demo;
