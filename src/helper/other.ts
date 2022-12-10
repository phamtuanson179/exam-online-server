
export const filterAddAndRemoveElement = (
    curListElements: string[],
    changedListElements: string[]
): {
    add: string[];
    delete: string[];
} => {
    console.log({ curListElements, changedListElements });
    const res = {
        add: [],
        delete: [],
    };

    return {
        add: changedListElements.filter(
            (element: string) => !curListElements.includes(element)
        ),
        delete: curListElements.filter(
            (element: string) => !changedListElements.includes(element)
        ),
    };
};