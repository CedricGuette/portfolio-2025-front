import { createContext, useState } from 'react';

type WindowPositionType = {
    windowsState: [number[], boolean[]] | null;
    setWindowsState: React.Dispatch<React.SetStateAction<[number[], boolean[]] | null>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const WindowPosition = createContext<WindowPositionType | null>(null);

export const WindowPositionProvider = (props: ContextProviderProps) => {

    const[windowsState, setWindowsState] = useState<[number[], boolean[]] | null>(null)

  return (
    <WindowPosition.Provider value={{ windowsState, setWindowsState }}>
        {props.children}
    </WindowPosition.Provider>
    )
}

export const defineDefaultValueNumber = () => {
    return [0,0,0]
}

export const defineDefaultValueBoolean = () => {
    return [false, false, false]
}
