import { createContext, useState } from 'react';
import { PresentationType } from '../../../datas/presentation';

type AdminPresentationContextType = {
    adminPresentation: Array<PresentationType>;
    setAdminPresentation: React.Dispatch<React.SetStateAction<Array<PresentationType>>>;
}

type ContextProviderProps = {
    children: JSX.Element;
}

export const AdminPresentationContext = createContext<AdminPresentationContextType | null>(null);

export const AdminPresentationContextProvider = (props: ContextProviderProps) => {

    const [adminPresentation, setAdminPresentation] = useState<Array<PresentationType>>([{
        "id": 0,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    },
    {
        "id": 1,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    },
    {
        "id": 2,
        "firstTitle": "",
        "firstText": "",
        "secondTitle": "",
        "secondText": "",
        "thirdTitle": "",
        "thirdText": ""
    }]);

  return (
    <AdminPresentationContext.Provider value={{ adminPresentation, setAdminPresentation }}>
        {props.children}
    </AdminPresentationContext.Provider>
    )
}