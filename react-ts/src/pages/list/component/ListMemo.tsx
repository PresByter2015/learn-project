import React, { useMemo } from 'react';
export default ({ c = 0 }) => {
    // useMemo 决定是否更新
    const useMemoRes = useMemo(() => {
        console.log('组件useMemo');
        return { c };
    }, [c]);
    return <h1>memo---{useMemoRes.c}</h1>;
};
