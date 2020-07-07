import React, {
    useLayoutEffect,
    useImperativeHandle,
    useRef,
    forwardRef,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { companyList } from '../../api/company';
import ListItem from './component/ListItem';
import ListMemo from './component/ListMemo';
import ListHook from './component/ListHook';
import ListReducer from './component/ListReducer';
import ListRedux1 from './component/ListRedux1';
import ListRedux2 from './component/ListRedux2';
import { Reducer } from './component/Reducer';
import { ListContext } from './component/ListContext';
type IProps = {
    name: string;
    [key: string]: any;
};
// eslint-disable-next-line
const useFetch = (props: { name?: string | undefined; status?: string | undefined; desc?: string | undefined; startTime?: string | undefined; endTime?: string | undefined; pageNumber?: number | undefined; sidx?: string | undefined; sort?: string | undefined; pageSize?: number | undefined; } | undefined) => {
    const [data, updateData] = useState({});

    // empty array as second argument equivalent to componentDidMount
    // useEffect(() => {
    companyList({ ...props }).then((res) => {
        // console.log(res);
        updateData(res);
    });
    // }, [props]);

    return data;
};
// useImperativeHandle useRef forwardRef 的子组件
const Imperative = forwardRef((props, refa) => {
    const inputRef: HTMLInputElement | any = useRef<HTMLInputElement | null>(null);
    console.log(inputRef);
    const [value, setValue] = useState('');
    const handleChange = (e: any) => {
        const value = e.target.value;
        setValue(value);
    };
    useImperativeHandle(
        refa,
        () => ({
            name: 'ref',
            value: value,
            focus: () => {
                inputRef.current.focus();
            },
        }),
        [value],
    );
    return <input ref={inputRef} onChange={handleChange} type="text" />;
});
const List: React.FC<IProps> = inject('detailStore')(
    observer((props: IProps) => {
        // 初始化 init
        const handleInit = React.useCallback(() => {
            companyList({ ...props }).then((res) => {
                console.log(res.state, res.page);
                // setCount(res.state)
            });
        }, [props]);
        // useEffect
        useEffect(() => {
            console.log('useEffect');
            handleInit();
            return () => {
                console.log('useEffect - return');
            };
        }, [handleInit, props]); // 第二个参数设置为[], 表示不必对任何数据， 所以只在首次渲染时调用
        // useLayoutEffect
        useLayoutEffect(() => {
            console.log('useLayoutEffect');
            return () => {
                console.log('useLayoutEffect - return');
            };
        });
        // useState
        const [count, setCount] = useState(0);
        const [num, setNum] = useState(0);
        const [hide, setHide] = React.useState(false);
        // 所有 Function Component 内函数必须用 React.useCallback 包裹，以保证准确性与性能
        const handleClick = React.useCallback(() => {
            setHide((isHide) => !isHide);
        }, []);
        // useMemo 决定是否更新
        const useMemoRes = useMemo(() => {
            console.log('useMemo');
            return count;
        }, [count]);
        // useCallback
        const callback = useCallback(() => {
            console.log('父 useCallback');
            return count;
        }, [count]);
        // useImperativeHandle useRef forwardRef
        const el: React.MutableRefObject<any> = useRef();
        return React.useMemo(
            () => (
                <React.Fragment>
                    <Reducer>
                        <ListRedux1></ListRedux1>
                        <ListRedux2></ListRedux2>
                    </Reducer>
                    <hr />
                    <ListReducer></ListReducer>
                    <hr />
                    <ListHook></ListHook>
                    <hr />
                    <Imperative ref={el}></Imperative>
                    <button
                        onClick={() => {
                            console.log(el.current);
                            el.current && el.current.focus();
                        }}
                    >
                        获取ref
                    </button>
                    <br />
                    <hr />
                    <ListContext.Provider value={{ name: count + '' }}>
                        <ListItem></ListItem>
                    </ListContext.Provider>
                    <h1>useCallback:{callback()}</h1>
                    <h1>useMemo:{useMemoRes}</h1>
                    {/* <ListMemo c={count}></ListMemo> */}
                    <button onClick={handleInit}>请求参数</button>
                    <button onClick={handleClick}>{hide ? '隐藏' : '显示'} 标题</button>
                    {hide && <h3>List</h3>}
                    <h6>{props.detailStore.name}</h6>
                    <ul>
                        {props.detailStore.arr.map((v: any) => (
                            <li key={v.name}>{v.name}</li>
                        ))}
                    </ul>
                    <Link to="/home">首页</Link>
                    <Link to="/lll">空页面</Link>
                    <p>You clicked count:{count} times</p>
                    <p>You clicked num: {num} times</p>
                    <button onClick={() => setCount(count + 1)}>count++</button>
                    <button onClick={() => setNum(num + 1)}>num++</button>
                </React.Fragment>
            ),
            [
                callback,
                count,
                handleClick,
                handleInit,
                hide,
                num,
                props.detailStore.arr,
                props.detailStore.name,
                useMemoRes,
            ],
        );
    }),
);
List.defaultProps = {
    name: '',
};
export default List;
